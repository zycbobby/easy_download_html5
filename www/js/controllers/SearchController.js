angular.module('starter.controllers').controller('SearchCtrl', function ($scope, $ionicModal, $timeout, Es) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.query = {
            keyword: ''
        };

        $scope.$on('$ionicView.enter', function (e) {

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
