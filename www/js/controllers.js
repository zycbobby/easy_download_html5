angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $rootScope, $state, $ionicFilterBar) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});


        $scope.showSearchIcon = $state.is('app.recent');

        $scope.showSearch = function () {
            $ionicFilterBar.show({
                asyncSearch: function(keyword){
                    console.log('search' + keyword);
                    $state.go('app.search', {keyword: keyword});
                }
            });
        };

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $scope.showSearchIcon = $state.is('app.recent');
            });
    });