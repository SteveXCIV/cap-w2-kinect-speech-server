angular
	.module('ngCapstone')
	.factory('sessionFactory', function($http) {

		function getData() {
			//return $http.get('http://localhost/api/v1/sessions');
			return $http.get('data/session.json');
		}

		return {
			getData: getData
		}
	});