angular.module('starter.controllers').controller('SearchWindowCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                               $ionicScrollDelegate, $ionicFilterBar,ionicToast,
                                                                         $ionicLoading, userService, historyService, articleService, Es) {
        var Window = articleService.Window;

        $scope.window  = new Window();

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
            }));
        });


        $scope.nextPage = function(){
            $ionicScrollDelegate.scrollTop();
            loadingWrapper($scope.window.nextPage().then(function(window) {
                $scope.window = window;
                $scope.$broadcast('scroll.infiniteScrollComplete');

                ionicToast.show('Next page', 'bottom', false, 1000);
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
                    ionicToast.show('Prev page', 'top', false, 1000);
                }));
            }
        };
    }
);
