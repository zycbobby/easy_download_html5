angular.module('starter.services')
    .factory('userService', function ($http, EasyDownloadEndpoint) {
        var getUser = function(user) {
            return $http.put(EasyDownloadEndpoint.userUrl, user);
        };

        return {
            getUser: getUser
        };
    });