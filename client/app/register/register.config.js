(function myAppRegisterConfig() {
    'use strict';

    angular
        .module('myApp.register')
        .config(registerConfig);

    registerConfig.$inject = [
        '$stateProvider'
    ];

    /* @ngInject */
    function registerConfig($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: 'app/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            });
    }

})();
