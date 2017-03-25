(function() {
    angular.module('ngCapstone').factory('physicianFactory', function($http) {

        function getData() {
            return $http.get('http://localhost:3000/api/v1/sessions');
            //return $http.get('data/data.json');
        }

        return {getData: getData}
    });
})();
