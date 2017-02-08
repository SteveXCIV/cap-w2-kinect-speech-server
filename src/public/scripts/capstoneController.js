angular
	.module('ngCapstone')
	.controller('capstoneController', function($scope, capstoneFactory) {

		$scope.hello = 'Hello capstone world';
		$scope.sampledata;
		$scope.testdata;

		capstoneFactory.getData().then(function(data) {
			//$scope.sampledata = data.data.Snapshots;
			$scope.testdata = data.data;
		}, function(error) {
			console.log(error);
		});

		

	});