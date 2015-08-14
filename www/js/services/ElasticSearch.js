angular.module('starter.services')
    .factory('Es', function ($http, EsEndpoint) {
        var searchThing = function (keyword) {
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

        return {
            searchThing: searchThing
        };
    });