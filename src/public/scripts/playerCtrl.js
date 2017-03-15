angular
.module('ngCapstone')
.controller('playerCtrl', ['$scope', 'capstoneFactory', function($scope, capstoneFactory) {
	$scope.title = "Player Details";

	$scope.labels = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6', 'Week7'];
	$scope.series = ['Completion Time', 'Audio Intensity'];

	$scope.data = [
	[30, 26, 25, 28, 25, 24, 22],
	[28, 38, 40, 39, 42, 41, 43]
	];

	$scope.options = {
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Average Completion Time and Average Audio Intensity'
				},
				id: 'y-axis',
				type: 'linear',
				display: true,
				position: 'left'
			}]
		}
	};

}]);