(function myAppAddPostConfig() {
    'use strict';

    angular
        .module('myApp.addPost')
        .config(addPostConfig);

    addPostConfig.$inject = [
        '$stateProvider'
    ];

    /* @ngInject */
    function addPostConfig($stateProvider) {

        $stateProvider.state('addPost', {
            url: '/add-post',
            templateUrl: 'app/addPost/addPost.html',
            controller: 'AddPostCtrl',
            controllerAs: 'vm',
            authRequired: true
        });
    }

})();
