(function myAppCoreConfig() {
    'use strict';

    angular
        .module('myApp.core')
        .config(coreConfig)
        .config(themeConfig);

    coreConfig.$inject = [
        '$urlRouterProvider'
    ];

    /* @ngInject */
    function coreConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
    }

    /* @ngInject */
    function themeConfig($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('grey', {
                'default': '900'
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
    }

})();
