(function() {
    'use strict';

    angular
        .module('myApp.auth')
        .factory('authService', authService);

    authService.$inject = [
        '$state',
        '$window',
        '$q',
        'firebaseService'
    ];

    /* @ngInject */
    function authService($state, $window, $q, firebaseService) {

        var user = '';
        var firebaseRef = firebaseService.firebaseRef;
        var service = {
            getUser: getUser,
            setUser: setUser,
            signUp: signUp,
            loginUser: loginUser,
            logoutUser: logoutUser
        };

        return service;

        function getUser() {
            if (user === '') {
                user = $window.localStorage.getItem('userEmail');
            }
            return user;
        }

        function setUser(value) {
            $window.localStorage.setItem('userEmail', value);
            user = value;
        }

        function signUp(userInfo) {

            var deferred = $q.defer();

            firebaseRef.createUser(userInfo, function createCallback(error) {
                loginRegisterHelperCallback(error, userInfo, deferred);
            });

            return deferred.promise;
        }

        function loginUser(userInfo) {

            var deferred = $q.defer();

            firebaseRef.authWithPassword(userInfo, function authCallback(error) {
                loginRegisterHelperCallback(error, userInfo, deferred);
            });

            return deferred.promise;
        }

        function logoutUser() {
            firebaseRef.unauth();
            user = '';
            $window.localStorage.removeItem('userEmail');
            $state.go('login');
        }

        // I use userInfo here because the firebase response is different between auth and
        // create methods, after create the only data provided by firebase is the uid
        function loginRegisterHelperCallback(error, userInfo, deferred) {
            if (error) {
                deferred.reject(error);
            } else {
                setUser(userInfo.email);
                $state.go('welcome');
                deferred.resolve();
            }
        }
    }

})();
