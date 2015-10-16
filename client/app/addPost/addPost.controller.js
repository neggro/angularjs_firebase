(function myAppAddPostController() {
    'use strict';

    angular
        .module('myApp.addPost')
        .controller('AddPostController', AddPostController);

    AddPostController.$inject = [
        '$mdDialog',
        '$mdToast',
        'authService',
        'firebaseService'
    ];

    /* @ngInject */
    function AddPostController($mdDialog, $mdToast, authService, firebaseService) {

        var vm = this;
        var user = authService.getUser();
        vm.article = vm.postToUpdate;
        vm.managePost = managePost;
        vm.hideDialog = hideDialog;

        // create or update a post
        function managePost() {

            // update
            if (vm.postToUpdate) {

                vm.postToUpdate
                    .$save()
                    .then(hideDialog, displayError);

            } else {

                firebaseService
                    .addPost({
                        title: vm.article.title,
                        post: vm.article.post,
                        emailId: user
                    }).then(hideDialog, displayError);
            }

        }

        function hideDialog() {
            $mdDialog.hide();
        }

        function displayError(error) {

            var toastContent = $mdToast
                .simple()
                .content(error);

            $mdToast.show(toastContent);
        }
    }

})();
