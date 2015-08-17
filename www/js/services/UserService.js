angular.module('starter.services')
    .service('userService', function ($http, $ionicUser, EasyDownloadEndpoint, $q) {

        var _userL = window.localStorage['_loginUser'];
        this._user = _userL?JSON.parse(_userL):undefined;

        function notnull(o) {
            if (!o) {
                throw Error('cannot pass not null test');
            }
        }

        this.getUser = function() {
            notnull(this._user);
            return this._user;
        };

        this.setUser = function(user) {
            var defer = $q.defer();
            var self = this;
            $http.put(EasyDownloadEndpoint.userUrl, user).then(function(resp) {
                console.log(resp);
                if (resp.status === 200 || resp.status === 201) {
                    self._user = resp.data;
                    window.localStorage['_loginUser'] = JSON.stringify(self._user);
                    defer.resolve(self._user);
                } else {
                    defer.reject(resp);
                }
            });
            return defer.promise;
        };

        //return {
        //    getUser: getUser,
        //    search: search,
        //    setUser: setUser
        //};
    });