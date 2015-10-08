(function myAppLoginConfig() {
    'use strict';

    angular
        .module('myApp.login')
        .config(loginConfig);

    loginConfig.$inject = [
        '$stateProvider'
    ];

    /* @ngInject */
    function loginConfig($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            });
    }

})();
