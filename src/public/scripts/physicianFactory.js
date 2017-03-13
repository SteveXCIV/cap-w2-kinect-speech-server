angular
	.module('ngCapstone')
	.factory('physicianFactory', function($http) {

		function getData() {
			//return $http.get('http://localhost/api/v1/sessions');
			return $http.get('data/BodyAudio.json');
		}

		return {
			getData: getData
		}
	});