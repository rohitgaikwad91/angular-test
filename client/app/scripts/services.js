'use strict';

angular.module('confusionApp')
        .factory('AuthenticationService', ['$http', '$localStorage', function($http, $localStorage) {
            var service = {};

            service.Login = function (username, password, callback) {
                var auth_url = 'http://localhost:8000/api/authenticate';
                $http.post(auth_url, { email: 'kyhrishi@gmail.com', password: 'reset@123' })
                    .then(function (response) {
                        console.log('response');
                        console.log(response);
                        // login successful if there's a token in the response
                        if (response.data.token) {
                            // store username and token in local storage to keep user logged in between page refreshes
                            $localStorage.currentUser = { username: username, token: response.data.token };
                            if(typeof $localStorage != undefined){
                                console.log('$localStorage');
                                console.log($localStorage);
                            }
                            // add jwt token to auth header for all requests made by the $http service
                        //$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                            // execute callback with true to indicate successful login
                            callback(true);
                        } else {
                            console.log('in hereeeeeeeeeee');
                            // execute callback with false to indicate failed login
                            callback(false);
                        }
                    });
            };


            service.Logout = function() {
                // remove user from local storage and clear http auth header
                delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = '';
            };

            return service;
        }])
;