(function myAppAddPostController() {
    'use strict';

    angular
        .module('myApp.addPost')

        .controller('AddPostCtrl', [
            '$state',
            'authService',
            'firebaseService',
            function ($state, authService, firebaseService) {

                var vm = this;
                var user = authService.getUser();
                vm.addPost = addPost;

                function addPost() {
                    firebaseService.addPost({
                        title: vm.article.title,
                        post: vm.article.post,
                        emailId: user
                    }).then(function () {
                        $state.go('welcome');
                    }, function(error) {
                        console.log('Error:', error);
                    });
                }
            }
        ]);

})();
