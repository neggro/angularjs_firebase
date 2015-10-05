(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'myApp.login',
        'myApp.register',
        'myApp.welcome',
        'myApp.addPost',
        'myApp.nav',
        'myApp.firebase'
    ])
    .constant('FIREBASE_URL', 'https://blistering-heat-2473.firebaseio.com')

    .run(function ($rootScope, $state, userService) {
        $rootScope.$on('$stateChangeStart', function (e, toState) {
            if (toState.authRequired && !userService.getUser()) {
                // this is key to does not allow to load the new state
                e.preventDefault();
                $state.go('login');
            }
        });
    })

    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider, userService) {
            $urlRouterProvider.otherwise('/login');
        }
    ]);

})();
