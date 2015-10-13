(function myAppModule() {
    'use strict';

    angular.module('myApp', [
        'myApp.login',
        'myApp.register',
        'myApp.welcome',
        'myApp.addPost',
        'myApp.nav',
        'myApp.firebase',
        'myApp.auth',
        'ngMaterial'
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
    ])

    .config(function($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('grey', {
                'default': '900',
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys,
            // it will inherit from the default shades
            .accentPalette('deep-purple', {
                // use shade 200 for default, and keep all other shades the same
                default: '500'
            })
            .warnPalette('red', {
                default: '300'
            });
    });

})();
