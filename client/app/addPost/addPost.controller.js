(function myAppAddPostController() {
    'use strict';

    angular
        .module('myApp.addPost')

        .controller('AddPostCtrl', [
            '$state',
            'userService',
            'firebaseService',
            function ($state, userService, firebaseService) {

                var vm = this;
                var user = userService.getUser();
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
