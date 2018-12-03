/**
 *This controller is used to show login page
 */

'use strict';

angular.module('milestoneApp', [])
    .controller('loginController', ['$scope', '$http', 'loginService', function ($scope, $http, loginService) {

    $scope.loginUser = function () {
        window.alert("login email: " + $scope.loginForm.email);
        loginService.authenticate($scope.loginForm.email, $scope.loginForm.password)
    };

    $scope.registerUser = function () {
        window.alert("signup email: " + $scope.formData.email);
        loginService.register($scope.registrationForm.email, $scope.registrationForm.password)
    };
}]);
