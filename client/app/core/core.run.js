(function myAppCoreRun() {
    'use strict';

    angular
        .module('myApp.core')
        .run(appRun);

    /* @ngInject */
    function appRun($rootScope, $state, authService) {

        $rootScope.$on('$stateChangeStart', function (e, toState) {

            var user = authService.getUser();
            var isNotAllowed = toState.authRequired && !user;
            var isAlreadyLoggedIn = !toState.authRequired && user &&
                (toState.name === 'register' || toState.name === 'login');

            if (isNotAllowed) {
                // this is KEY to prevent to load the new state
                e.preventDefault();
                $state.go('login');

            } else if (isAlreadyLoggedIn) {

                // this is KEY to prevent to load the new state
                e.preventDefault();
                $state.go('welcome');
            }
        });
    }

})();
