(function myAppFirebaseService() {
    'use strict';

    angular
        .module('myApp.firebase')
        .factory('firebaseService', firebaseService);

    firebaseService.$inject = [
        'FIREBASE_URL',
        '$firebaseObject',
        '$firebaseArray'
    ];

    /* @ngInject */
    function firebaseService(FIREBASE_URL, $firebaseObject, $firebaseArray) {

        var service = {
            getPosts: getPosts,
            addPost: addPost,
            updatePost: updatePost,
            deletePost: deletePost
        };

        var ARTICLES_URL = FIREBASE_URL + '/Articles';

        service.articlesRef = service.articlesRef || new Firebase(ARTICLES_URL);
        service.articlesArray = service.articlesArray || $firebaseArray(service.articlesRef);

        return service;

        function getPosts(user) {
            var articlesQuery = service.articlesRef.orderByChild('emailId').equalTo(user);
            return $firebaseArray(articlesQuery).$loaded();
        }

        function addPost(post) {
            return service.articlesArray.$add(post);
        }

        function updatePost(id) {
            // not implemented
        }

        function deletePost(id) {
            // not implemented
        }
    }

})();
