angular.module('starter.directives')
    .directive('input', function($timeout){
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&'
            },
            link: function(scope, element, attr){
                element.bind('keydown', function(e){
                    if(e.which == 13){
                        if(scope.returnClose){
                            element[0].blur();
                        }
                        if(scope.onReturn){
                            $timeout(function(){
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    });
