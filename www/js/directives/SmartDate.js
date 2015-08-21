angular.module('starter.directives')
    .directive('smartDate', function($timeout){
        return {
            restrict: 'E',
            scope: {
                'time': '='
            },
            replace: true,
            templateUrl: 'templates/smart-date.html',
            link: function(scope, element, attr){

                scope.month = scope.time.getMonth() + 1;
                scope.day = scope.time.getDate();
                scope.hour = scope.time.getHours();
                if (scope.hour < 10) {
                    scope.hour = '0' + scope.hour;
                }
                scope.minute = scope.time.getMinutes();
                if (scope.minute < 10) {
                    scope.minute = '0' + scope.minute;
                }
            }
        }
    });
