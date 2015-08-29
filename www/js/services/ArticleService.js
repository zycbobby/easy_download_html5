angular.module('starter.services')
    .service('articleService', function ($http, $ionicUser, EasyDownloadEndpoint, debug, $q, Es) {

        this.articles = [];

        var self = this;

        this.Window = function() {
            this.fromIdx = 0;
            this.toIdx = 0;
            this.pageSize = 10;
            this.window = [];
        };

        /**
         * return promise
         */
        this.Window.prototype.nextPage = function(){
            this.fromIdx += this.pageSize;
            this.toIdx += this.pageSize;
            return this._loadCurrentPage();
        };

        /**
         * return promise
         */
        this.Window.prototype.prevPage = function(){
            this.fromIdx -= this.pageSize;
            this.toIdx -= this.pageSize;
            if (this.fromIdx < 0 ) {
                return this.init();
            }
            return this._loadCurrentPage();
        };

        this.Window.prototype._hasEnoughArticles = function(){
            // assert(this.fromIdx <= this.toIdx );
            return this.toIdx <= self.articles.length;
        };
        this.Window.prototype.isFirstPage = function(){
            return this.fromIdx === 0;
        };

        this.Window.prototype._loadCurrentPage = function(){
            var defer = $q.defer();
            var _this = this;
            if (_this._hasEnoughArticles()) {
                _this.window = self.articles.slice(_this.fromIdx, _this.toIdx);
                defer.resolve(_this);
            } else {
                var noLateThan = _this.window.length > 0? _this.window[_this.window.length - 1].createdAt: undefined;
                Es.getRecentThing(noLateThan).then(function(things) {
                    for (var i = 0; i < things.length; i++) {
                        var thing = things[i];
                        self.articles.push(self.convertThingToArticle(thing));
                    }
                    return things;
                }).then(function(things) {
                    _this.window = self.articles.slice(_this.fromIdx, _this.toIdx);
                    defer.resolve(_this);
                }).catch(function(err){
                    defer.reject(err);
                });
            }

            return defer.promise;
        };

        /**
         * load first element
         * @return promise
         */
        this.Window.prototype.init = function(){
            this.fromIdx = 0;
            this.toIdx = this.pageSize;
            return this._loadCurrentPage();
        };

        this.convertThingToArticle = function(thing) {
            var picUrl = (thing.info.images && thing.info.images.length > 0) ? thing.info.images[0].url : '';
            if (picUrl.indexOf('jpg') > -1 || picUrl.indexOf('png')) {
                if (picUrl.indexOf('zdmimg') >= 0) {
                    var thumbnail = 'img/logo_smzdm.png';
                } else if (picUrl.indexOf('hupucdn') >= 0) {
                    var thumbnail = 'img/logo_sh.png';
                } else {
                    var thumbnail = 'img/ic_photo_black_24dp.png';
                }
            }
            return {
                title: thing.title,
                description: thing.title,
                picUrl: picUrl,
                thumbnail: thumbnail,
                url: thing.source,
                createdAt : new Date(thing.createdAt)
            };
        }

    });