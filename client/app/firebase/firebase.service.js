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
            firebaseRef: new Firebase(FIREBASE_URL),
            getPosts: getPosts,
            addPost: addPost,
            getArticleObjectById: getArticleObjectById
        };

        var articlesRef = articlesRef || service.firebaseRef.child('Articles');
        var articlesArray = articlesArray || $firebaseArray(articlesRef);

        return service;

        function getPosts(user) {
            var articlesQuery = articlesRef.orderByChild('emailId').equalTo(user);
            return $firebaseArray(articlesQuery).$loaded();
        }

        function addPost(post) {
            return articlesArray.$add(post);
        }

        function getArticleObjectById(articleId) {
            return $firebaseObject(articlesRef.child(articleId));
        }
    }

})();
