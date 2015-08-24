angular.module('starter.controllers').controller('SearchCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                         $ionicLoading, userService, historyService, Es) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        $scope.$on('$ionicView.enter', function(e) {
            $scope.query = {
                keyword: ''
            };
            $scope.articles = [];
            $scope.isRecent = true;
            _initLoad();
            Es.listenSearchKeyword(historyService.onSearch);
        });

        $scope.listCanSwipe = true;
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;

        $scope.maxArticles = 200;


        $scope.search = function (keyword) {
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
            });
        };

        if ($stateParams.keyword) {
            $scope.query.keyword = $stateParams.keyword;
            $scope.search($stateParams.keyword);
        }

        $scope.$on('$ionicView.leave', function(){
            Es.removeListener(historyService.onSearch);
        });

        $scope.loadMore = function() {
            var lastArticle = $scope.articles[$scope.articles.length - 1];
            var articles = [];
            Es.getRecentThing(lastArticle?lastArticle.createdAt: new Date()).then(function(things) {
                for (var i = 0; i < things.length; i++) {
                    var thing = things[i];
                    articles.push(convertThingToArticle(thing));
                }
                [].push.apply($scope.articles, articles);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.onSwipeDown = function(){

            _initLoad().finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };


        function convertThingToArticle(thing) {
            return {
                title: thing.title,
                description: thing.title,
                picUrl: (thing.info.images && thing.info.images.length > 0) ? thing.info.images[0].url : '',
                url: thing.source,
                createdAt : new Date(thing.createdAt)
            };
        }

        function _initLoad() {
            return Es.getRecentThing().then(function(things) {
                for (var i = 0; i < things.length; i++) {
                    var thing = things[i];
                    $scope.articles.push(convertThingToArticle(thing));
                }
                return things;
            });
        }

    }
);
