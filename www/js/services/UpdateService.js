angular.module('starter.services')
    .service('updateService', function ($http, GithubEndpoint, $q) {

        /**
         *
         * @returns { "version" : "*" }
         *
         */
        this.getLatestVersion = function(){
            var self = this;
            return $http.get(GithubEndpoint.releaseUrl).then(function(resp) {
                if (resp.status === 200 ) {
                    var data = resp.data;
                    var versionString = data[0]['tag_name'];
                    var ver = self.getVersionFromString(versionString);
                    ver.downloadUrl =  data[0]['assets'][0]['browser_download_url'];
                    return ver;
                }
            });
        };

        /**
         * parase v0.0.3
         * @param versionString
         */
        this.getVersionFromString = function(versionString){
            var split = versionString.substring(1).split(".");
            var mayor = parseInt(split[0], 10);
            var middle = parseInt(split[1], 10);
            var minor = parseInt(split[2], 10);
            return {
                "versionString" : versionString,
                "mayor": mayor,
                "middle": middle,
                "minor": minor,
                "computedVersion" : mayor*100000 + middle*1000 + minor
            }
        };


        this.hasNewer = function(){
            var self = this;
            return this.getLatestVersion().then(function(latestVersion) {
                return {
                    "hasNewer" :latestVersion && latestVersion.computedVersion > self.currentVersion.computedVersion,
                    "versionInfo" : latestVersion
                }
            });
        };

        this.currentVersion = this.getVersionFromString(globalVersionString);
    });