angular.module('starter.controllers').controller('SubscribeCtrl', function ($scope, historyService) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.subscriptions = [{
            parsedTerm : 's1',
            active: true
        },{
            title : 's2',
            parsedTerm: false
        }];


        $scope.loadHistory = function(){
            historyService.loadHistory().then(function(histories) {
                $scope.subscriptions = histories;
            });
        };

        $scope.loadHistory();
    }
);
