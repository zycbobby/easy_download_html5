angular.module('starter.services')
    .factory('Es', function ($http, EsEndpoint) {
        var searchThing = function (keyword) {
            _listeners.forEach(function(fn){
                fn(keyword);
            });
            return $http.post(EsEndpoint.url, {
                "query": {
                    "function_score": {
                        "score_mode": "first",
                        "query": {
                            "match": {
                                "title": keyword
                            }
                        },

                        "functions": [
                            {
                                "filter": {
                                    "exists": {
                                        "field": "updatedAt"
                                    }
                                },
                                "gauss": {
                                    "updatedAt": {
                                        "scale": "1d",
                                        "offset": "0.2d",
                                        "decay": 0.5
                                    }
                                }
                            }
                        ]
                    }
                }
            }, {
                headers : {
                    'Authorization' : 'Basic enVvOjIyMjE2Nzg1'
                }
            });
        };

        var _listeners = [];

        var listenSearchKeyword = function(fn) {
            _listeners.push(fn);
        };

        return {
            searchThing: searchThing,
            listenSearchKeyword: listenSearchKeyword
        };
    });