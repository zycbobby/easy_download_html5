/**
 * This service is manupulate the history data
 *
 * It should be synchronized with local storage some how
 */
angular.module('starter.services')
    .service('historyService', function ($http, $ionicUser, EasyDownloadEndpoint, userService, $q) {

        this.histories = _loadHistory();

        var self = this;

        function notnull(o) {
            if (!o) {
                throw Error('cannot pass not null test');
            }
        }

        this.onSearch = function(keyword) {
            self.histories.push(keyword);
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