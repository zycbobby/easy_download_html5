angular.module('starter.controllers').controller('SearchCtrl', function ($scope, $http, $ionicModal, $timeout, Es) {

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
            title : 'title #1'
        },{
            title : 'title #2'
        }];

        $scope.search = function () {
            Es.searchThing($scope.query.keyword).then(function(response) {
                var articles = [];
                var hits = response.data.hits.hits;
                for (var i = 0; i < 5 && i < hits.length; i++) {
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


        //// Form data for the login modal
        //$scope.loginData = {};
        //
        //// Create the login modal that we will use later
        //$ionicModal.fromTemplateUrl('templates/login.html', {
        //    scope: $scope
        //}).then(function (modal) {
        //    $scope.modal = modal;
        //});
        //
        //// Triggered in the login modal to close it
        //$scope.closeLogin = function () {
        //    $scope.modal.hide();
        //};
        //
        //// Open the login modal
        //$scope.login = function () {
        //    $scope.modal.show();
        //};
        //
        //// Perform the login action when the user submits the login form
        //$scope.doLogin = function () {
        //    console.log('Doing login', $scope.loginData);
        //
        //    // Simulate a login delay. Remove this and replace with your login
        //    // code if using a login system
        //    $timeout(function () {
        //        $scope.closeLogin();
        //    }, 1000);
    }
);
