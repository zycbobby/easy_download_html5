angular.module('starter.controllers').controller('SearchCtrl', function ($scope, $rootScope, $stateParams,$ionicModal, $timeout,
                                                                         $ionicUser, $ionicPush, $ionicPlatform,
                                                                         $ionicLoading, userService, historyService, Es) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };

        //if (!$rootScope.user) {
        //    $ionicUser.identify({
        //        user_id: $ionicUser.generateGUID()
        //    }).then(function () {
        //        // Register with the Ionic Push service.  All parameters are optional.
        //        $ionicPush.register({
        //            canShowAlert: true, //Can pushes show an alert on your screen?
        //            canSetBadge: true, //Can pushes update app icon badges?
        //            canPlaySound: true, //Can notifications play a sound?
        //            canRunActionsOnWake: true, //Can run actions outside the app,
        //            onNotification: function (notification) {
        //                // Handle new push notifications here
        //                console.log(notification);
        //                return true;
        //            }
        //        });
        //    });
        //
        //    $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
        //        console.log('Ionic Push: Got token ', data.token, data.platform);
        //        var _user = {
        //            name: data.token,
        //            token: data.token,
        //            platform: data.platform
        //        };
        //
        //        userService.registerUser(_user).then(function (user) {
        //            $rootScope.user = user;
        //        });
        //    });
        //}


        $scope.query = {
            keyword: ''
        };

        $scope.articles = [];

        Es.listenSearchKeyword(historyService.onSearch);

        $scope.search = function (keyword) {
            Es.searchThing(keyword).then(function (response) {
                var articles = [];
                var hits = response.data.hits.hits;
                for (var i = 0; i < hits.length; i++) {
                    var thing = hits[i]._source;
                    var score = hits[i]._score;
                    if (score > 4) {
                        articles.push({
                            title: thing.title,
                            description: thing.title,
                            picUrl: (thing.info.images && thing.info.images.length > 0) ? thing.info.images[0].url : '',
                            url: thing.source
                        });
                    }
                }
                $scope.articles = articles;
            });
        };

        if ($stateParams.keyword) {
            $scope.search($stateParams.keyword);
        }
    }
);
