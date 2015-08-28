angular.module('starter.controllers').controller('SearchWindowCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                               $ionicScrollDelegate,
                                                                         $ionicLoading, userService, historyService, articleService, Es) {

        $scope.query = {
            keyword: ''
        };

        var Window = articleService.Window;

        $scope.window  = new Window();

        function loadingWrapper(promise) {
            $ionicLoading.show();
            promise.finally(function(){
                $ionicLoading.hide();
            });
        }

        $scope.isRecent = true;
        $scope.$on('$ionicView.enter', function(e) {
            if ($stateParams.keyword) {
                $scope.query.keyword = $stateParams.keyword;
                $scope.search($stateParams.keyword);
            } else {
                loadingWrapper($scope.window.init().then(function(window){
                    $scope.window = window;
                }));
            }

            Es.listenSearchKeyword(historyService.onSearch);
        });


        $scope.nextPage = function(){
            $ionicScrollDelegate.scrollTop();
            loadingWrapper($scope.window.nextPage().then(function(window) {
                $scope.window = window;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }));
        };

        $scope.onSwipeDown = function(){
            if (this.window.isFirstPage()) {
                loadingWrapper($scope.window.init().then(function(window){
                    $scope.window = window;
                    $scope.$broadcast('scroll.refreshComplete');
                }));

            } else {
                $ionicScrollDelegate.scrollTop();
                loadingWrapper($scope.window.prevPage().then(function(window) {
                    $scope.window = window;
                    $scope.$broadcast('scroll.refreshComplete');
                }));
            }
        };

        $scope.search = function (keyword) {
            $scope.isRecent = false;
            loadingWrapper(Es.searchThing(keyword).then(function (things) {
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
            }));
        };

        $scope.$on('$ionicView.leave', function(){
            Es.removeListener(historyService.onSearch);
        });

        function convertThingToArticle(thing) {
            return {
                title: thing.title,
                description: thing.title,
                picUrl: (thing.info.images && thing.info.images.length > 0) ? thing.info.images[0].url : '',
                url: thing.source,
                createdAt : new Date(thing.createdAt)
            };
        }
    }
);
