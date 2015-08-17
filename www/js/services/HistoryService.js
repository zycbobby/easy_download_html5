angular.module('starter.services')
    .service('historyService', function ($http, $ionicUser, EasyDownloadEndpoint, userService, $q) {

        function notnull(o) {
            if (!o) {
                throw Error('cannot pass not null test');
            }
        }

        this.search = function(keyword) {
            var defer = $q.defer();
            var self = this;
            var user = userService.getUser();
            $http.post(EasyDownloadEndpoint.searchUrl, {
                user : user,
                keyword: keyword
            }).then(function(resp){
                if (resp.status !== 201) { defer.reject();}
                defer.resolve();
            });
            return defer.promise;
        };

        this.loadHistory = function() {
            var defer = $q.defer();
            var self = this;
            var user = userService.getUser();
            $http.get(EasyDownloadEndpoint.historyUrl + '?userId=' + user._id).then(function(resp){
                if (resp.status !== 200) {defer.reject(resp);}
                defer.resolve(resp.data.map(function(history) {
                    return history.query;
                }));
            });
            return defer.promise;
        }
    });