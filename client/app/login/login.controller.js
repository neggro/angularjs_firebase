(function myAppLoginController () {
    'use strict';

    angular.module('myApp.login')

    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        'authService'
    ];

    /* @ngInject */
    function LoginCtrl (authService) {

        var vm = this;
        vm.user = {};
        vm.signIn = signIn;

        function signIn() {

            authService.loginUser({
                email: vm.user.email,
                password: vm.user.password
            })
            .catch(function catchCallback(error) {
                alert(error);
            });

        }
    }

})();
