'use strict';

angular.module('myApp.test', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/test', {
        templateUrl: 'test/test.html',
        controller: 'TestCtrl'
    });
}])

.controller('TestCtrl', ['$scope', function($scope) {

    var login = {};

    $scope.test = function() {
        login.loading = true;
    };

    $scope.login = login;

}]);
