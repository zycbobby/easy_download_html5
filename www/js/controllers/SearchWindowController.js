angular.module('starter.controllers').controller('SearchWindowCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                               $ionicScrollDelegate,
                                                                         $ionicLoading, userService, historyService, articleService, Es) {
        var Window = articleService.Window;

        $scope.window  = new Window();

        function loadingWrapper(promise) {
            $ionicLoading.show();
            promise.finally(function(){
                $ionicLoading.hide();
            });
        }

        $scope.$on('$ionicView.enter', function(e) {
            loadingWrapper($scope.window.init().then(function(window){
                $scope.window = window;
            }));
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
