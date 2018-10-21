/**
 *
 */

'use strict';

angular.module('milestoneApp')
    .factory('loginService', ['$http', function ($http) {
    return {
        authenticate : function(email, password) {
            console.log('in authenticate');
            return $http.post('/login/login', { email: email, password: password });
        },

        register : function (email, password) {
            console.log('in registration');
            return $http.post('/login/registration', { email: email, password: password });
        }
    }
}]);