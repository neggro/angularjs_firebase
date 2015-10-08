(function myAppModule() {
    'use strict';

    angular.module('myApp', [
        'myApp.login',
        'myApp.register',
        'myApp.welcome',
        'myApp.addPost',
        'myApp.nav',
        'myApp.firebase',
        'myApp.auth'
    ])

    .constant('FIREBASE_URL', 'https://blistering-heat-2473.firebaseio.com')

    .run(function ($rootScope, $state, authService) {

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
    })

    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider, authService) {
            $urlRouterProvider.otherwise('/login');
        }
    ]);

})();
