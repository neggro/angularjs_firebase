(function myAppLoginController () {
    'use strict';

    angular.module('myApp.login')

    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        'authService',
        '$mdToast'
    ];

    /* @ngInject */
    function LoginCtrl (authService, $mdToast) {

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
            .then(function successCallback() {
                vm.loading = false;
            }, displayError);
        }

        function displayError(error) {

            var toastContent = $mdToast
                .simple()
                .content(error);

            vm.loading = false;

            $mdToast.show(toastContent);
        }
    }

})();
