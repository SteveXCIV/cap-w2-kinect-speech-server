angular
.module('ngCapstone')
.controller('sessionCtrl', function($scope, sessionFactory) {

	$scope.title = 'Session Breakdown';
	$scope.sessiondata;
	$scope.bodysnapshots;
	$scope.righthand = [];
	$scope.lefthand = [];
	$scope.spinemid = [];

	$scope.labels = ["2.42", "3.29", "4.48", "5.46", "6.39", "7.99", "8.46", "9.29", "10.48", "11.46", "12.39", "13.99", "14.46"];
	$scope.series = ['Capture Time', 'Audio Intensity'];
	
	$scope.data = [
	[30, 26, 25, 28, 23, 24, 22, 23, 24, 22, 24, 20, 23],
	[28, 38, 40, 49, 46, 47, 43, 45, 43, 42, 45, 46, 43]
	];

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.datasetOverride = [
	{ 
		yAxisID: 'y-axis-1', 
		borderColor: "#FF6384", 
		backgroundColor:"rgba(220,220,220,0)",
		pointBackgroundColor: "rgba(220,220,220,0)",
		pointHoverBackgroundColor: "rgba(220,220,220,0)",
		pointBorderColor: "#fff",
		pointHoverBorderColor: "rgba(220,220,220,0)"
		//scaleShowGridLines: false,
		//pointDot: false,
		//bezierCurve: false
	},
	{ 
		yAxisID: 'y-axis-2', 
		hoverBorderColor: "rgba(255,99,132,1)", 
		backgroundColor:"rgba(220,220,220,0)", 
		hoverBackgroundColor: "#FF6384"
	}

	];


	$scope.datasetOverride1 = [
	{
		backgroundColor:"#FF6384"
	},
	{
		hoverBackgroundColor: "#FF6384"
	}
	];

	$scope.options = {
		title: {
			display: true,
			text: 'Average Object Capture Time and Audio Intensity vs. Time'
		},
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
			},
			{
				scaleLabel: {
					display: true,
					labelString: 'Average Audio Intensity'
				},
				id: 'y-axis-2',
				type: 'linear',
				display: true,
				position: 'right'
			}]
		}
	};

	$scope.options2 = {
		title: {
			display: true,
			text: 'Range of Motion'
		},
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Vertical Position'
				},
				id: 'y-axis',
				type: 'linear',
				display: true,
				position: 'left'
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Lateral Position'
				},
				id: 'x-axis',
				type: 'linear',
				display: true,
				position: 'bottom'
			}]
		}
	};


	sessionFactory.getData().then(function(data) {
		$scope.bodysnapshots = data.data.BodySnapshots;
		$scope.audiosnapshots = data.data.AudioSnapshots;
		//console.log('body length ' + $scope.bodysnapshots.length);
		//console.log('audio length ' + $scope.audiosnapshots.length);
		for (s = 0; s < $scope.bodysnapshots.length; s++) { 
			for (j = 0; j < 24; j++) { 
				angular.forEach($scope.bodysnapshots[s].Joints[j], function(value, key) {
					if (key === "JointType" && value === "HandRight") {
						//$scope.righthand.push({Time: $scope.bodysnapshots[s].Time, X: $scope.bodysnapshots[s].Joints[j].X, Y: $scope.bodysnapshots[s].Joints[j].Y});
						$scope.righthand.push([{x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y, r: (($scope.bodysnapshots[s].Joints[j].Z)-1.2)*10}]);
						//$scope.righthand.push({x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y});
					};
					if (key === "JointType" && value === "HandLeft") {
						//$scope.lefthand.push({Time: $scope.bodysnapshots[s].Time, X: $scope.bodysnapshots[s].Joints[j].X, Y: $scope.bodysnapshots[s].Joints[j].Y});
						$scope.lefthand.push([{x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y, r: (($scope.bodysnapshots[s].Joints[j].Z)-1.2)*10}]);
						//$scope.lefthand.push({x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y});
					};
					if (key === "JointType" && value === "SpineMid") {
						$scope.spinemid.push([{x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y, r: (($scope.bodysnapshots[s].Joints[j].Z)-1.2)*10}]);
					};
				});
			};
		};

	}, function(error) {
		console.log(error);
	});


	$scope.width = 600;
	$scope.height = 400;
	$scope.yAxis = "Vertical Position";
	$scope.xAxis = "Lateral Position"


	var newdata = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [65,59,90,81,56,55,40]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [28,48,40,19,96,27,100]
		}
		]
	}

	$scope.myChart = newdata;


});



/*
var RightHandSnapshot = {};
		var foundjoint = false;
		for (i = 0; i < $scope.bodysnapshots.length; i++) { 
			for (j = 0; j < 24; j++) { 
				angular.forEach($scope.bodysnapshots[i].Joints[j], function(value, key) {
					if (key === "JointType" && value === "ThumbRight") {
						foundjoint = true; 
					};
					if (foundjoint) {
						console.log("found the joint")
						console.log(key + ': ' + value);
						if (key === "X") {RightHandSnapshot.X = value;}
						if (key === "Y") {RightHandSnapshot.Y = value;}
						//if (key === "Z") {$scope.righthand.push({RightHandSnapshot:{Z: value}});}
						$scope.righthand.push({RightHandSnapshot: RightHandSnapshot});
					};
					foundjoint = false;
				});
			};
		};*/