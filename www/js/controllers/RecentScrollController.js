angular.module('starter.controllers').controller('RecentScrollCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                               $ionicScrollDelegate, $ionicFilterBar,ionicToast,
                                                                         $ionicLoading, userService, historyService, articleService, Es) {
        var Window = articleService.Window;

        $scope.window  = new Window();
        $scope.articles = [];

        // $ionicFilterBar.show();

        function loadingWrapper(promise) {
            $ionicLoading.show();
            promise.catch(function(err){
                ionicToast.show('Network problem', 'bottom', false, 1000);
                $ionicLoading.hide();
            }).finally(function(){
                $ionicLoading.hide();
            });
        }

        $scope.$on('$ionicView.enter', function(e) {
            loadingWrapper($scope.window.init().then(function(window){
                $scope.window = window;
                $scope.articles = articleService.articles;
            }));
        });

        $scope.loadMore = function(){
            loadingWrapper($scope.window.nextPage().then(function(window) {
                $scope.window = window;
                $scope.articles = articleService.articles;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }));
        };

        $scope.onSwipeDown = function(){
            loadingWrapper($scope.window.init().then(function(window){
                $scope.window = window;
                $scope.articles = articleService.articles;
                $scope.$broadcast('scroll.refreshComplete');
            }));
        };
    }
);
