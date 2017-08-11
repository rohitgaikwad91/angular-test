'use strict';

angular.module('confusionApp')

        .controller('PreviewController', ['$scope', '$q', '$interval', function($scope, $q, $interval){
            $scope.gridOptions1 = {
                enableCellEditOnFocus: true,
                columnDefs: [
                    { name: 'age', enableCellEditOnFocus:false, displayName:'Age', width: 200  },
                    { name: 'name', displayName: 'Name', width: 200}
                ],
                data : [
                        {name: "Moroni", age: 50},
                        {name: "Tiancum", age: 43},
                        {name: "Jacob", age: 27},
                        {name: "Nephi", age: 29},
                        {name: "Enos", age: 34}
                    ]
            };

            $scope.gridOptions2 = {
                enableCellEditOnFocus: true,
                columnDefs: [
                    { name: 'age', enableCellEditOnFocus:false, displayName:'Age', width: 200  },
                    { name: 'name', displayName: 'Name', width: 200}
                ],
                data : [
                        {name: "Moroni", age: 50},
                        {name: "Tiancum", age: 43},
                        {name: "Jacob", age: 27},
                        {name: "Nephi", age: 29},
                        {name: "Enos", age: 34}
                    ]
            };

            $scope.saveRow = function( rowEntity ) {
                // create a fake promise - normally you'd use the promise returned by $http or $resource
                var promise = $q.defer();
                $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );

                // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
                $interval( function() {
                    /*if (rowEntity.gender === 'male' ){
                        promise.reject();
                    } else {*/
                        promise.resolve();
                    /*}*/
                }, 3000, 1);
            };

            $scope.msg = {};

            $scope.gridOptions2.onRegisterApi = function(gridApi){
                //set gridApi on scope
                $scope.gridApi = gridApi;
                gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                    $scope.msg.lastCellEdited = ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
                });
            };
        }])

        .controller('LoginController', ['$scope', 'AuthenticationService', '$state', '$auth', 
            function($scope, AuthenticationService, $state, $auth){

            console.log('$auth');
            console.log($auth);
            function initController() {
                // reset login status
                AuthenticationService.Logout();
            };

            $scope.login = function() {
                $scope.loading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (result) {
                    if (result === true) {
                        console.log('result');
                        console.log(result);
                        $state.go('app.preview');
                        /*$location.path('/');*/
                    } else {
                        $scope.error = 'Username or password is incorrect';
                        $scope.loading = false;
                    }
                });
            };

            initController();
        }])

        .controller('ReportController', ['$scope', 'AuthenticationService', '$state', '$auth', 
            function($scope, AuthenticationService, $state, $auth){

            console.log('$auth');
            console.log($auth);
            function initController() {
                visualize({
                    oauth:{
                    name:"jasperadmin",
                    password:"jasperadmin",
                    organization:"organization_1"
                }
                },function(v){
                    var $select = buildControl("Export to: ", v.report.exportFormats),
                    $button = $("button"),
                    report = v.report({
                        resource:"/public/Samples/Reports/Test_Ad_Hoc_View_Report",
                        container:"#container",
                        success: function(){
                            button.removeAttribute("disabled");
                        },
                        /*params:{"parProductId":["34"]},*/
                        error:function(err){
                            alert(err.message);
                        }
                    });


                    $button.click(function () {
 
                        console.log($select.val());
                 
                        report.export({
                            //export options here        
                            outputFormat: $select.val(),
                            //exports all pages if not specified
                            //pages: "1-2"
                        }, function (link) {
                            console.log('link');
                            console.log(link);
                           var url = link.href ? link.href : link;
                           window.location.href = url;
                        }, function (error) {
                            console.log(error);
                        });
                    });
                 
                    function buildControl(name, options) {
                 
                        function buildOptions(options) {
                            var template = "<option>{value}</option>";
                            return options.reduce(function (memo, option) {
                                return memo + template.replace("{value}", option);
                            }, "")
                        }
                 
                        var template = "<label>{label}</label><select>{options}</select><br>",
                            content = template.replace("{label}", name)
                                .replace("{options}", buildOptions(options));
                 
                        var $control = $(content);
                        $control.insertBefore($("#button"));
                        //return select
                        return $($control[1]);
                    }


                });
            };


            initController();
        }])
;