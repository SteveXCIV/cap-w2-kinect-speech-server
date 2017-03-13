angular
.module('ngCapstone')
.controller('physicianCtrl', function($scope, physicianFactory) {

  $scope.hello = 'Hello capstone world';
  $scope.title = 'Physician Page';
  $scope.sampledata;
  $scope.testdata;

  physicianFactory.getData().then(function(data) {
			//$scope.sampledata = data.data.Snapshots;
			$scope.gamedata = data.data;
		}, function(error) {
			console.log(error);
		});

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];
  $scope.data = [
  [65, 59, 80, 81, 56, 55, 40],
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, {xAxisID: 'x-axis'}];
  $scope.options = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Average Capture Time'
        },
        id: 'y-axis-1',
        type: 'linear',
        display: true,
        position: 'left'
      }]
    }
  };

});