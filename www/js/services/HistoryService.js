/**
 * This service is manupulate the history data
 *
 * It should be synchronized with local storage some how
 */
angular.module('starter.services')
    .service('historyService', function ($http, $ionicUser, EasyDownloadEndpoint, userService, $q) {

        this.histories = _loadHistory();
        this.maxHistory = 20;

        var self = this;

        function notnull(o) {
            if (!o) {
                throw Error('cannot pass not null test');
            }
        }

        this.onSearch = function(keyword) {
            var idx = self.histories.indexOf(keyword);
            if (idx >= 0) {
                self.histories.splice(idx, 1);
            }
            self.histories.unshift(keyword);
            while (self.histories.length > self.maxHistory) {
                self.histories.pop();
            }
            _saveHistory(self.histories);
        };

        this.getHistories = function(){
            return this.histories;
        };

        function _loadHistory() {
            var _h = localStorage['histories'];
            return _h?JSON.parse(_h):[];
        }

        function _saveHistory(histories) {
            localStorage['histories'] = JSON.stringify(histories);
        }
    });