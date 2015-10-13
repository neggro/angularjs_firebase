(function myAppAddPostController() {
    'use strict';

    angular
        .module('myApp.addPost')
        .controller('AddPostController', AddPostController);

    AddPostController.$inject = [
        '$mdDialog',
        'authService',
        'firebaseService'
    ];

    /* @ngInject */
    function AddPostController($mdDialog, authService, firebaseService) {

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
                    .then(hideDialog, function (error) {
                        if (error) {
                            console.log('Error:', error);
                        }
                    });

            } else {

                firebaseService
                    .addPost({
                        title: vm.article.title,
                        post: vm.article.post,
                        emailId: user
                    }).then(hideDialog, function (error) {
                        console.log('Error:', error);
                    });
            }

        }

        function hideDialog() {
            $mdDialog.hide();
        }
    }

})();
