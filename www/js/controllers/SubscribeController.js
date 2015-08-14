angular.module('starter.controllers').controller('SubscribeCtrl', function ($scope) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.subscriptions = [{
            title : 's1',
            active: true
        },{
            title : 's2',
            active: false
        }];
    }
);
