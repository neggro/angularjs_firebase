(function myAppNavController() {
    'use strict';

    angular
        .module('myApp.nav')
        .controller('NavController', NavController);

    NavController.$inject = [
        '$rootScope',
        '$state',
        'authService'
    ];

    /* @ngInject */
    function NavController($rootScope, $state, authService) {

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
            alert('Not implemented!');
        }
    }

})();
