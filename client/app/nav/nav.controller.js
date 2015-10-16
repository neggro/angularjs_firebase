(function myAppNavController() {
    'use strict';

    angular
        .module('myApp.nav')
        .controller('NavController', NavController);

    NavController.$inject = [
        '$rootScope',
        '$state',
        '$mdToast',
        'authService'
    ];

    /* @ngInject */
    function NavController($rootScope, $state, $mdToast, authService) {

        var vm = this;
        vm.logout = logout;
        // vm.currentState = $state.current.name;
        vm.user = authService.getUser();
        vm.userInfo = userInfo;

        $rootScope.$on('$stateChangeSuccess', function () {
            // vm.currentState = $state.current.name;
            vm.user = authService.getUser();
        });

        function logout () {
            authService.logoutUser();
        }

        function userInfo() {
            displayError('Not implemented!');
        }

        function displayError(error) {

            var toastContent = $mdToast
                .simple()
                .content(error);

            $mdToast.show(toastContent);
        }
    }

})();
