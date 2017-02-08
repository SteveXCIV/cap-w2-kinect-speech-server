angular
	.module('ngCapstone')
	.controller('sessionCtrl', function($scope, sessionFactory) {

		$scope.title = 'Session Breakdown';
		$scope.sessiondata;
		$scope.snapshots;
		$scope.righthand;

		sessionFactory.getData().then(function(data) {
			$scope.sessiondata = data.data[0].Session[0];
			$scope.snapshots = data.data[0].Session[0].Snapshots;
			//for( var input = 0, n = array.length;  input < n;  ++input ) {
	    	//	var output = array[input];
	    	//	$scope.righthand[input] = { name: output.name, id: output.id };
			//}
		}, function(error) {
			console.log(error);
		});


		$scope.width = 600;
		$scope.height = 400;
		$scope.yAxis = "Vertical Position";
		$scope.xAxis = "Lateral Position"

	});