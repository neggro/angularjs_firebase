(function myAppRegister() {
    'use strict';

    angular.module('myApp.register', [
        'ui.router'
    ])

    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'app/register/register.html',
                controller: 'RegisterCtrl'
            });
        }
    ])

    .controller('RegisterCtrl', [
        '$scope',
        '$state',
        function ($scope, $state) {

            var firebaseObj = new Firebase('https://blistering-heat-2473.firebaseio.com');

            var login = {};
            $scope.login = login;
            $scope.mesg = 'Hello';

            $scope.signUp = function () {
                if (!$scope.regForm.$invalid) {
                    var email = $scope.user.email;
                    var password = $scope.user.password;
                    if (email && password) {
                        login.loading = true;

                        firebaseObj.createUser({
                            email: email,
                            password: password
                        }, function (error, userData) {
                            if (error) {
                                switch (error.code) {
                                case 'EMAIL_TAKEN':
                                    console.log('The new user account cannot be created because the email is already in use.');
                                    break;
                                case 'INVALID_EMAIL':
                                    console.log('The specified email is not a valid email.');
                                    break;
                                default:
                                    console.log('Error creating user:', error);
                                    break;
                                }
                                $scope.regError = true;
                                $scope.regErrorMessage = error.message;
                            } else {
                                console.log('Successfully created user account with uid:', userData.uid);
                                $state.go('home');
                            }
                        });
                    }
                }
            };
        }
    ]);

})();
