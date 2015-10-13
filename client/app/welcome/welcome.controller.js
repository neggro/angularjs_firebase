(function myAppWelcomeController() {
    'use strict';

    angular
        .module('myApp.welcome')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = [
        'authService',
        'firebaseService',
        '$mdDialog'
    ];

    /* @ngInject */
    function WelcomeController(authService, firebaseService, $mdDialog) {

        var vm = this;
        vm.username = authService.getUser();
        vm.articles = [];
        // vm.editPost = editPost;
        // vm.update = update;
        vm.confirmDelete = confirmDelete;
        vm.postDialog = postDialog;
        vm.loading = true;

        activate();

        function activate() {
            return firebaseService.getPosts(vm.username)
                .then(function (posts) {
                    vm.articles = posts;
                    // console.log(vm.articles);
                    vm.loading = false;
                    return vm.articles;
                }, function (error) {
                    console.log('Error:', error);
                });
        }

        function postDialog(event, id) {

            var postToUpdate = id ? firebaseService.getArticleObjectById(id) : null;

            $mdDialog.show({
                controller: 'AddPostController',
                controllerAs: 'vm',
                templateUrl: 'app/addPost/addPost.html',
                targetEvent: event,
                clickOutsideToClose: true,
                locals: {
                    postToUpdate: postToUpdate
                },
                bindToController: true
            });
        }

        /*function update() {
            vm.postToUpdate.$save()
                .then(function () {
                    //
                },function (error) {
                    if (error) {
                        console.log('Error:', error);
                    }
                });
        }*/

        function confirmDelete(id, event) {

            var CONFIRM_DELETE_POST = $mdDialog
                .confirm()
                .title('Delete post confirmation')
                .content('Are you sure you want to delete this post?')
                .ariaLabel('Delete post confirmation')
                .targetEvent(event)
                .ok('Accept')
                .cancel('Cancel');

            $mdDialog.show(CONFIRM_DELETE_POST)
                .then(function acceptCallback() {
                    firebaseService.getArticleObjectById(id)
                        .$remove()
                        .catch(function catchCallback(error) {
                            console.log('Error:', error);
                        });
                });
        }
    }

})();
