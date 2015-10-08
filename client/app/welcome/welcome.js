(function () {
    'use strict';

    angular.module('myApp.welcome', [
        'ui.router'
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
        'authService',
        'firebaseService',
        function ($scope, authService, firebaseService) {

            var vm = this;

            $scope.username = authService.getUser();

            activate();

            $scope.editPost = function (id) {
                $scope.postToUpdate = firebaseService.getArticleObjectById(id);
                $('#editModal').modal();
            };

            $scope.update = function () {
                $scope.postToUpdate.$save()
                    .then(function () {
                        $('#editModal').modal('hide');
                    },function (error) {
                        if (error) {
                            console.log('Error:', error);
                        }
                    });
            };

            $scope.confirmDelete = function (id) {
                $scope.postToDelete = firebaseService.getArticleObjectById(id);
                $('#deleteModal').modal();
            };

            $scope.deletePost = function () {
                $scope.postToDelete.$remove()
                    .then(function () {
                        $('#deleteModal').modal('hide');
                    },
                    function (error) {
                        console.log('Error:', error);
                    });
            };

            function activate() {
                return firebaseService.getPosts($scope.username)
                    .then(function (posts) {
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
