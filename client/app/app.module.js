(function myAppModule() {
    'use strict';

    angular
        .module('myApp', [
            'myApp.core',
            'myApp.login',
            'myApp.register',
            'myApp.welcome',
            'myApp.addPost',
            'myApp.nav',
            'myApp.firebase',
            'myApp.auth'
        ]);

})();
