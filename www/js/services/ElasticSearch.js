angular.module('starter.services')
    .factory('Es', function ($http, EsEndpoint) {
        var searchThing = function (keyword) {
            _listeners.forEach(function (fn) {
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
                headers: {
                    'Authorization': 'Basic enVvOjIyMjE2Nzg1'
                }
            }).then(function(resp) {
                if (resp.status === 200) {
                    return resp.data.hits.hits.map(function(t) {
                        var source = t._source;
                        source._score = t._score;
                        return source;
                    });
                }
                return [];
            });
        };

        var _listeners = [];

        var listenSearchKeyword = function (fn) {
            _listeners.push(fn);
        };

        var removeListener = function (fn) {
            var idx = _listeners.indexOf(fn);
            if (idx < 0) {
                return;
            }
            _listeners.splice(idx, 1);
        };

        var getRecentThing = function ( noLateThan) {
            var _noLateThan = noLateThan || new Date().toISOString();
            return $http.post(EsEndpoint.url, {
                "query": {
                    "range" : {
                        "createdAt" : {
                            "lt": _noLateThan
                        }
                    }
                },
                "sort": {
                    "createdAt": {"order": "desc"}
                }

            }, {
                headers: {
                    'Authorization': 'Basic enVvOjIyMjE2Nzg1'
                }
            }).then(function(resp) {
                if (resp.status === 200) {
                    return resp.data.hits.hits.map(function(t) {
                        return t._source;
                    });
                }
                return [];
            });
        };

        return {
            searchThing: searchThing,
            listenSearchKeyword: listenSearchKeyword,
            getRecentThing: getRecentThing,
            removeListener: removeListener

        };
    });