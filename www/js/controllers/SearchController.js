angular.module('starter.controllers').controller('SearchCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $ionicUser, $ionicPush, $ionicPlatform, $ionicLoading, userService, Es) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.show = function() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        $scope.show();

        var user = $ionicUser.get();
        if (!user.user_id) {
            // Set your user_id here, or generate a random one.
            user.user_id = $ionicUser.generateGUID();
        }

        angular.extend(user, {
            name: 'Ionitron'
        });


        $ionicUser.identify(user).then(function () {
            $scope.identified = true;
            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,
                onNotification: function (notification) {
                    // Handle new push notifications here
                    console.log(notification);
                    return true;
                }
            });
        });

        $scope.query = {
            keyword: ''
        };


        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            console.log('Ionic Push: Got token ', data.token, data.platform);
            userService.getUser({
                name : data.token,
                token: data.token,
                platform: data.platform
            }).then(function(resp) {
                $scope.user = resp.data;
                console.log('can search now');
                $timeout(function () {
                    $scope.hide();
                }, 500);
            });
        });

        $scope.articles = [{
            title: 'title #1'
        }, {
            title: 'title #2'
        }];

        $scope.search = function () {
            Es.searchThing($scope.query.keyword).then(function (response) {
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

        $scope.goTo = function(item) {
            console.log(item);
        };
    }

);
