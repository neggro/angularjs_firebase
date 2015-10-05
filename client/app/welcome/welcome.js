(function () {
    'use strict';

    angular.module('myApp.welcome', [
        'ui.router',
        'firebase'
    ])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('welcome', {
            url: '/welcome',
            templateUrl: 'app/welcome/welcome.html',
            controller: 'WelcomeCtrl',
            authRequired: true
        });
    }])

    .controller('WelcomeCtrl', [
        '$scope',
        '$firebaseObject',
        '$firebaseArray',
        'userService',
        'firebaseService',
        function ($scope, $firebaseObject, $firebaseArray, userService, firebaseService) {

            $scope.username = userService.getUser();

            activate();

            $scope.editPost = function (id) {
                console.log(id);
                var articleRef = new Firebase('https://blistering-heat-2473.firebaseio.com/Articles/' +
                    id);
                $scope.postToUpdate = $firebaseObject(articleRef);
                $('#editModal').modal();
            };

            $scope.update = function () {
                console.log($scope.postToUpdate.$id);
                $scope.postToUpdate.$update({
                    title: $scope.postToUpdate.title,
                    post: $scope.postToUpdate.post,
                    emailId: $scope.postToUpdate.emailId
                }, function (error) {
                    if (error) {
                        console.log('Error:', error);
                    } else {
                        $('#editModal').modal('hide');
                    }
                });
            };

            $scope.confirmDelete = function (id) {
                var articleRef = new Firebase('https://blistering-heat-2473.firebaseio.com/Articles/' +
                    id);
                $scope.postToDelete = $firebaseObject(articleRef);
                $('#deleteModal').modal();
            };

            $scope.deletePost = function () {
                $scope.postToDelete.$remove().then(function () {
                    $('#deleteModal').modal('hide');
                },
                function (error) {
                    console.log('Error:', error);
                });
            };

            function activate() {
                return firebaseService.getPosts($scope.username).then(function (posts) {
                    $scope.articles = posts;
                    console.log($scope.articles);
                    return $scope.articles;
                }, function (error) {
                    console.log('Error:', error);
                });
            }
        }
    ]);

})();
