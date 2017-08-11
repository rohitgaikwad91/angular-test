// public/scripts/userController.js

(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('UserController', UserController);  

    function UserController($http) {

        var vm = this;
        
        vm.users;
        vm.error;

        vm.getUsers = function() {
            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get('api/authenticate').then(function(users) {
                vm.users = users.data;
                console.log(vm.users);
            },function(error) {
                vm.error = error;
            });
        }
    }
    
})();