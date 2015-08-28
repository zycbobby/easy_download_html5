angular.module('starter.controllers').controller('SearchCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                         $ionicLoading, userService, historyService, Es) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:

        $scope.query = {
            keyword: ''
        };

        $scope.articles = [];
        $scope.isRecent = true;

        $scope.$on('$ionicView.enter', function(e) {
            if ($stateParams.keyword) {
                $scope.query.keyword = $stateParams.keyword;
                $scope.search($stateParams.keyword);
            }
            Es.listenSearchKeyword(historyService.onSearch);
        });

        $scope.maxArticles = 20;

        $scope.search = function (keyword) {
            $ionicLoading.show();
            Es.searchThing(keyword).then(function (things) {
                var articles = [];
                for (var i = 0; i < things.length; i++) {
                    var thing = things[i];
                    var score = thing._score;
                    if (score > 4) {
                        articles.push(convertThingToArticle(thing));
                    }
                }
                $scope.isRecent = false;
                $scope.articles = articles;
                $ionicLoading.hide();
            });
        };

        $scope.$on('$ionicView.leave', function(){
            Es.removeListener(historyService.onSearch);
        });

        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function(searchString, position) {
                var subjectString = this.toString();
                if (position === undefined || position > subjectString.length) {
                    position = subjectString.length;
                }
                position -= searchString.length;
                var lastIndex = subjectString.indexOf(searchString, position);
                return lastIndex !== -1 && lastIndex === position;
            };
        }

        function convertThingToArticle(thing) {
            var picUrl = (thing.info.images && thing.info.images.length > 0) ? thing.info.images[0].url : '';
            if (picUrl.endsWith('jpg')) {
                if (picUrl.contains('zdmimg')) {
                    var thumbnail = picUrl.replace('e600', 'd200');
                } else if (picUrl.contains('hupucdn')) {
                    var thumbnail = picUrl.replace('w/700', 'w/100');
                } else if (picUrl.contains('hupucdn')) {
                    var thumbnail = picUrl;
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
    }
);
