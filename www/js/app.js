// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.push', 'ngCordova', 'starter.controllers',
    'starter.services', 'starter.directives', 'ImgCache', 'jett.ionic.filter.bar', 'ionic-toast'])
    .constant('EsEndpoint', {
        url: 'http://es.misscatandzuozuo.info/mongoindex/thing/_search'
    })
    .constant('EasyDownloadEndpoint', {
        userUrl: 'http://172.26.142.29:9000/api/users',
        subscribeUrl: 'http://172.26.142.29:9000/api/users/_subscribe',
        searchUrl: 'http://172.26.142.29:9000/api/historys/_search',
        historyUrl: 'http://172.26.142.29:9000/api/historys'
    })
    .constant('GithubEndpoint', {
        releaseUrl: 'https://api.github.com/repos/zycbobby/easy_download_html5/releases?access_token=1ef3730630641b51272e2d7b10e4bf2a86648fbc'
    })
    .constant('debug', {
        isDebug: true,
        user: {
            "_id": "55d292ed3e5db8e411d80355",
            "name": "Test User",
            "token": "12345678",
            "platform": "android",
            "__v": 0
        }
    })
    .constant('$ionicLoadingConfig', {
        template: '<ion-spinner></ion-spinner>'
    })
    .run(function ($ionicPlatform, updateService, $ionicPopup, $timeout, ImgCache) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            updateService.hasNewer().then(function (v) {
                if (v.hasNewer) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'New Version',
                        template: 'Current version : ' + globalVersionString + ', new version : ' + v.versionInfo.versionString
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            $timeout(function(){
                                window.open(v.versionInfo.downloadUrl, '_system', 'location=no');
                            }, 500);

                        }
                    });
                }
            });
            ImgCache.$init();
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, ImgCacheProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.search', {
                cache: false,
                url: '/search?keyword',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('app.recent', {
                cache: false,
                url: '/recent',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/recent-card.html',
                        controller: 'RecentScrollCtrl'
                    },

                    'extraOptions' : {
                        templateUrl: 'templates/search-window-bar.html',
                        controller: 'RecentScrollCtrl'
                    }
                }
            })
            .state('app.subscribe', {
                cache: false,
                url: '/subscribe',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/subscribe.html',
                        controller: 'SubscribeCtrl'
                    }
                }
            })
            .state('app.history', {
                cache: false,
                url: '/history',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/history.html',
                        controller: 'HistoryCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/recent');

        // config the image cache

        // more options at once
        ImgCacheProvider.setOptions({
            debug: true,
            usePersistentCache: true
        });

        // ImgCache library is initialized automatically,
        // but set this option if you are using platform like Ionic -
        // in this case we need init imgcache.js manually after device is ready
        ImgCacheProvider.manualInit = true;

    });
