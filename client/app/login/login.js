(function myAppHome () {
    'use strict';

    angular.module('myApp.login', [
        'ui.router'
    ])

    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'HomeCtrl'
                });
        }
    ])

    .controller('HomeCtrl', [
        '$scope',
        'userService',
        function ($scope, userService) {

            var firebaseRef = new Firebase('https://blistering-heat-2473.firebaseio.com');

            $scope.user = {};

            $scope.SignIn = function (e) {
                var username = $scope.user.email;
                var password = $scope.user.password;

                e.preventDefault();

                firebaseRef.authWithPassword({
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function (error, authData) {
                    if (error) {
                        console.log('Authentication failure, error: ' + error);
                    } else {
                        // console.log('Authentication successful: ' + authData);
                        // userService.setUser($scope.user.email);
                        // $location.go('welcome');
                    }
                });
            };
        }
    ])

    .service('userService', [
        '$state',
        function ($state) {

            var user = '';
            var firebaseRef = new Firebase('https://blistering-heat-2473.firebaseio.com');

            // gustavo@test.com | 123145678
            firebaseRef.onAuth(function (authData) {
                if (authData) {
                    console.log('Authenticated with:', authData);
                    setUser(authData.password.email);
                    $state.go('welcome');
                } else {
                    console.log('Client unauthenticated.');
                }
            });

            return {
                getUser: getUser,
                setUser: setUser,
                logoutUser: function() {
                    firebaseRef.unauth();
                    user = '';
                    localStorage.removeItem('userEmail');
                    $state.go('login');
                }
            };

            function getUser() {
                if (user === '') {
                    user = localStorage.getItem('userEmail');
                }
                return user;
            }

            function setUser(value) {
                localStorage.setItem('userEmail', value);
                user = value;
            }
        }
    ]);

})();
