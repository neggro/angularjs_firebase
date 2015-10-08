(function myAppWelcomeController() {
    'use strict';

    angular
        .module('myApp.welcome')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = [
        'authService',
        'firebaseService'
    ];

    /* @ngInject */
    function WelcomeController(authService, firebaseService) {

        var vm = this;
        vm.username = authService.getUser();
        vm.articles = [];
        vm.editPost = editPost;
        vm.update = update;
        vm.confirmDelete = confirmDelete;
        vm.deletePost = deletePost;

        activate();

        function activate() {
            return firebaseService.getPosts(vm.username)
                .then(function (posts) {
                    vm.articles = posts;
                    console.log(vm.articles);
                    return vm.articles;
                }, function (error) {
                    console.log('Error:', error);
                });
        }

        function editPost (id) {
            vm.postToUpdate = firebaseService.getArticleObjectById(id);
            $('#editModal').modal();
        }

        function update() {
            vm.postToUpdate.$save()
                .then(function () {
                    $('#editModal').modal('hide');
                },function (error) {
                    if (error) {
                        console.log('Error:', error);
                    }
                });
        }

        function confirmDelete(id) {
            vm.postToDelete = firebaseService.getArticleObjectById(id);
            $('#deleteModal').modal();
        }

        function deletePost() {
            vm.postToDelete.$remove()
                .then(function () {
                    $('#deleteModal').modal('hide');
                },
                function (error) {
                    console.log('Error:', error);
                });
        }
    }

})();
