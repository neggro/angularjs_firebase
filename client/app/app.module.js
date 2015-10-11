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

    .config(function($mdThemingProvider, $mdIconProvider) {

        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128)
            .icon('menu', './assets/svg/menu.svg', 24)
            .icon('share', './assets/svg/share.svg', 24)
            .icon('google_plus', './assets/svg/google_plus.svg', 512)
            .icon('hangouts', './assets/svg/hangouts.svg', 512)
            .icon('twitter', './assets/svg/twitter.svg', 512)
            .icon('phone', './assets/svg/phone.svg', 512);

        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('grey', {
                'default': '900', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('pink', {
                'default': '200' // use shade 200 for default, and keep all other shades the same
            });
    });

})();
