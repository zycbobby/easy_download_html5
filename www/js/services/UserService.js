angular.module('starter.services')
    .service('userService', function ($http, $ionicUser, EasyDownloadEndpoint, debug, $q) {

        this._user = _loadUserFromLocalStorage();

        function notnull(o) {
            if (!o) {
                throw Error('cannot pass not null test');
            }
        }

        this.getUser = function() {
            if (debug.isDebug) {
                return debug.user;
            }
            notnull(this._user);
            return this._user;
        };

        this.registerUser = function(user) {
            var defer = $q.defer();
            var self = this;
            $http.put(EasyDownloadEndpoint.userUrl, user).then(function(resp) {
                console.log(resp);
                if (resp.status === 200 || resp.status === 201) {
                    self._user = resp.data;
                    self._user.subscribtions = self._user.subscribtions || [];
                    _saveUserToLocalStorage(self._user);
                    defer.resolve(self._user);
                } else {
                    defer.reject(resp);
                }
            });
            return defer.promise;
        };

        function _saveUserToLocalStorage(user) {
            var _userL = window.localStorage['_loginUser'];
            return !_userL?undefined:JSON.parse(_userL);
        }

        function _loadUserFromLocalStorage() {
            window.localStorage['_loginUser'] = JSON.stringify(user);
        }

        /**
         * wrong... create subscribtion is just update the user, should not be another api
         * @param query
         * @returns {*}
         */
        this.createSubscribtion = function(query) {
            var defer = $q.defer();
            var self = this;
            var user = this.getUser();
            $http.post(EasyDownloadEndpoint.subscribeUrl, {
                user : user,
                query: query
            }).then(function(resp){
                if( resp.status === 200 ) {
                    self.user = resp.data;
                    defer.resolve(self._user);
                } else{
                    defer.reject(resp);
                }
            });
            return defer.promise;
        };

        this.removeSubscribtion = function(query) {
            //var defer = $q.defer();
            //var self = this;
            //var user = userService.getUser();
            //$http.post(EasyDownloadEndpoint.searchUrl, {
            //    user : user,
            //    keyword: keyword
            //}).then(function(resp){
            //    if (resp.status !== 201) { defer.reject();}
            //    defer.resolve();
            //});
            //return defer.promise;
        };

        // TODO
        this.loadSubscribtions = function() {
            //var defer = $q.defer();
            //var self = this;
            //var user = userService.getUser();
            //$http.get(EasyDownloadEndpoint.historyUrl + '?userId=' + user._id).then(function(resp){
            //    if (resp.status !== 200) {defer.reject(resp);}
            //    defer.resolve(resp.data.map(function(history) {
            //        return history.query;
            //    }));
            //});
            //return defer.promise;
        }
    });