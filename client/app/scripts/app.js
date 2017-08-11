'use strict';

angular.module('confusionApp', ['ui.router', 'ui.grid', 'ui.grid.edit', 
    'ngStorage', 'satellizer'])
/*.constant("myconfig", {'bknd_url': 'http://localhost:8000'})*/
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        
            .state('app.login', {
                url: 'login',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })

            // route for the dishdetail page
            .state('app.preview', {
                url: 'preview',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/preview.html',
                        controller  : 'PreviewController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }

                }
            })

            // route for the dishdetail page
            .state('app.report', {
                url: 'report',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/report.html',
                        controller  : 'ReportController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }

                }
            });
    
        $urlRouterProvider.otherwise('/');
    }).run(function($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
});


/*$authProvider.httpInterceptor = function() { return true; },
$authProvider.withCredentials = false;
$authProvider.tokenRoot = null;
$authProvider.baseUrl = '/';
$authProvider.loginUrl = 'http://localhost:8000/api/authenticate';
$authProvider.signupUrl = '/auth/signup';
$authProvider.unlinkUrl = '/auth/unlink/';
$authProvider.tokenName = 'token';
$authProvider.tokenPrefix = 'satellizer';
$authProvider.tokenHeader = 'Authorization';
$authProvider.tokenType = 'Bearer';
$authProvider.storageType = 'localStorage';*/
