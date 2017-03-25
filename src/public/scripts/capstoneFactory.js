(function() {
    angular.module('ngCapstone').factory('capstoneFactory', function($http) {

        function getData() {
            //return $http.get('http://localhost/api/v1/sessions');
            //return $http.get('data/snapshots.json'); //endpoint
            return $http.get('data/data.json'); //endpoint
        }

        return {getData: getData}
    });
})();
