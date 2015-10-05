(function myAppNavController() {
    'use strict';

    angular
        .module('myApp.nav')
        .controller('NavController', NavController);

    NavController.$inject = ['$rootScope', '$state', 'userService'];

    /* @ngInject */
    function NavController($rootScope, $state, userService) {
        var vm = this;
        vm.logout = logout;
        vm.currentState = $state.current.name;

        $rootScope.$on('$stateChangeSuccess', function () {
            vm.currentState = $state.current.name;
        });

        function logout () {
            userService.logoutUser();
        }
    }

})();
