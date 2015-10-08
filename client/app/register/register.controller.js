(function myAppRegister() {
    'use strict';

    angular
        .module('myApp.register')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = [
        '$state',
        'authService'
    ];

    /* @ngInject */
    function RegisterController($state, authService) {

        var vm = this;
        vm.signUp = signUp;

        function signUp() {

            var email = vm.user.email;
            var password = vm.user.password;

            if (email && password) {

                authService.signUp({
                    email: email,
                    password: password
                })
                .catch(function catchCallback(error) {

                    if (error) {

                        switch (error.code) {
                        case 'EMAIL_TAKEN':
                            console.log('The new user account cannot be created because ' +
                                'the email is already in use.');
                            break;
                        case 'INVALID_EMAIL':
                            console.log('The specified email is not a valid email.');
                            break;
                        default:
                            console.log('Error creating user:', error);
                            break;
                        }
                        vm.regError = true;
                        vm.regErrorMessage = error.message;
                    }
                });
            }
        }
    }

})();
