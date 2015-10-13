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
        vm.loading = false;

        function signIn() {

            vm.loading = true;

            authService.loginUser({
                email: vm.user.email,
                password: vm.user.password
            })
            .then(function () {
                vm.loading = false;
            }, function catchCallback(error) {
                alert(error);
                vm.loading = false;
            });
        }
    }

})();
