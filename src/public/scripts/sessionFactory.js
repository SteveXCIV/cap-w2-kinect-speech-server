(function() {
    angular.module('ngCapstone').factory('sessionFactory', function($http) {

        function getData(id) {
            return $http.get('http://localhost:3000/api/v1/sessions/' + id );
            //return $http.get('data/data.json');
        }

        return {getData: getData}
    });
})();
