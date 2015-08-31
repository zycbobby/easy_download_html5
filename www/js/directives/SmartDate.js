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
                var deRegister = scope.$watch('time', function(oldVal, newVal){
                    if (newVal instanceof Date) {
                        scope.month = newVal.getMonth() + 1;
                        scope.day = newVal.getDate();
                        scope.hour = newVal.getHours();
                        if (scope.hour < 10) {
                            scope.hour = '0' + scope.hour;
                        }
                        scope.minute = newVal.getMinutes();
                        if (scope.minute < 10) {
                            scope.minute = '0' + scope.minute;
                        }
                        deRegister();
                    }
                });
            }
        }
    });
