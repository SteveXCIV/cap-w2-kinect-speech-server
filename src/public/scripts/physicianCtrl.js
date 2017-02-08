angular
	.module('ngCapstone')
	.controller('physicianCtrl', function($scope, capstoneFactory) {

		$scope.hello = 'Hello capstone world';
		$scope.title = 'Physician Page';
		$scope.sampledata;
		$scope.testdata;

		capstoneFactory.getData().then(function(data) {
			//$scope.sampledata = data.data.Snapshots;
			$scope.testdata = data.data;
		}, function(error) {
			console.log(error);
		});

		

	});