// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ionic.service.push','ngCordova', 'starter.controllers', 'starter.services', 'starter.directives'])
    .constant('EsEndpoint', {
        url: 'http://localhost:8100/search'
    })
    .constant('EasyDownloadEndpoint', {
        userUrl: 'http://localhost:8100/users',
        subscribeUrl: 'http://localhost:8100/users/_subscribe',
        searchUrl: 'http://localhost:8100/historys/_search',
        historyUrl: 'http://localhost:8100/historys'
    })
    .constant('debug', {
        isDebug: true,
        user: {
            "_id" : "55d292ed3e5db8e411d80355",
            "name" : "Test User",
            "token" : "12345678",
            "platform" : "android",
            "__v" : 0
        }
    })
    .run(function ($ionicPlatform) {
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
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html',
                        controller: 'SearchCtrl'
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
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/subscribe');
    });
