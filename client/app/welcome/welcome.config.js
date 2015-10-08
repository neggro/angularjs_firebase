(function myAppWelcomeConfig() {
    'use strict';

    angular
        .module('myApp.welcome')
        .config(welcomeConfig);

    welcomeConfig.$inject = [
        '$stateProvider'
    ];

    /* @ngInject */
    function welcomeConfig($stateProvider) {
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'app/welcome/welcome.html',
                controller: 'WelcomeController',
                controllerAs: 'vm',
                authRequired: true
            });
    }

})();
