angular
.module('ngCapstone')
.controller('sessionCtrl', function($scope, sessionFactory) {
	
	$scope.sessionindex = 3;
	$scope.title = 'Session ' + $scope.sessionindex + ' Breakdown';
	$scope.righthand = [];
	$scope.lefthand = [];
	$scope.spinemid = [];
	$scope.intensity = [];
	$scope.range = [];
	$scope.rangeintensity = [];
	$scope.timelabels = [];
	$scope.precision = [];

	sessionFactory.getData().then(function(data) {
		$scope.sessiondata = data.data[$scope.sessionindex];
		$scope.start = new Date($scope.sessiondata.StartTime)
		$scope.end = new Date($scope.sessiondata.EndTime);
		$scope.duration = msConverter($scope.end - $scope.start);
		
		$scope.objectives = $scope.sessiondata.Trials[0].Objectives;
		console.log($scope.objectives.length);
		for (var i = 0; i < $scope.objectives.length; i++) {
			angular.forEach($scope.objectives[i], function(value, key) {
				if (key === "kind" && value === "LocateObjective") {
					$scope.activationtime = new Date($scope.objectives[i].ActivationTime);
					$scope.locatestart = new Date($scope.objectives[i].StartTime);
					$scope.locateend = new Date($scope.objectives[i].EndTime);
					$scope.reactiontime = msConverter($scope.activationtime - $scope.locatestart);
					$scope.locatecompletiontime = msConverter($scope.locateend - $scope.locatestart);
					//$scope.accuracy.push([{}]); //accuracy of hand(s) position while in activation time window vs time
					//for (j = 0; j < $scope.objectives[i].BodySnapshots.length; j++) {
						//$scope.precision.push([{x: $scope.BodySnapshots[j].Joints[3].X, y: $scope.BodySnapshots[j].Joints[3].Y, r: (($scope.BodySnapshots[j].Joints[3].Z)-1.2)*5}]);
					//};
					$scope.bodysnapshots = $scope.objectives[i].BodySnapshots;
					for (var s = 0; s < $scope.bodysnapshots.length; s++) { 
						for (var j = 0; j < 15; j++) { 
							angular.forEach($scope.bodysnapshots[s].Joints[j], function(value, key) {
								if (key === "JointType" && value === "HandRight") {
									//$scope.righthand.push({Time: $scope.bodysnapshots[s].Time, X: $scope.bodysnapshots[s].Joints[j].X, Y: $scope.bodysnapshots[s].Joints[j].Y});
									//$scope.righthand.push({x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y});
									$scope.righthand.push([{x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y, r: (($scope.bodysnapshots[s].Joints[j].Z)-1.2)*5}]);
								};
								if (key === "JointType" && value === "HandLeft") {
									$scope.lefthand.push([{x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y, r: (($scope.bodysnapshots[s].Joints[j].Z)-1.2)*5}]);
								};
								if (key === "JointType" && value === "SpineMid") {
									$scope.spinemid.push([{x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y, r: (($scope.bodysnapshots[s].Joints[j].Z)-1.2)*5}]);
								};
							});
						};
					};

				};
				if (key === "kind" && value === "DescribeObjective") {
					$scope.describestart = new Date($scope.objectives[i].StartTime);
					$scope.describeend = new Date($scope.objectives[i].EndTime);
					$scope.describecompletiontime = msConverter($scope.locateend - $scope.locatestart);
					//range of motion (hand to hand distance) and volume intensity over the duration of the task
					for (var j = 0; j < $scope.objectives[i].Distances.length; j++) {
						$scope.range.push($scope.objectives[i].Distances[j].HandToHandDistance);
						$scope.currenttime = new Date($scope.objectives[i].Distances[j].Time);
						$scope.timelabels.push(msConverter($scope.currenttime - new Date($scope.objectives[i].Distances[0].Time)));
					};
					for (var j = 0; j < $scope.objectives[i].AudioSnapshots.length; j++) {
						$scope.intensity.push($scope.objectives[i].AudioSnapshots[j].Intensity);
					};
					$scope.averageintensity = Average($scope.intensity);
					$scope.rangeintensity = [$scope.range].concat([$scope.intensity]);
					$scope.rangeintensityseries = ['Hand to Hand Distance', 'Audio Intensity'];
					//completion time and average audio intensity

				};
			});
		};
	}, function(error) {
		console.log(error);
	});


	function msConverter(ms) {
		var min = Math.floor(ms / 60000);
		var sec = ((ms % 60000) / 1000).toFixed(0);
		return min + ":" + (sec < 10 ? '0' : '') + sec;
	}

	function Average(array) {
		var sum = 0;
		for(var a = 0; a < array.length; a++){sum += array[a];}
			var average = (sum / array.length); return average;
	}


	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.rangeintensityoverride = [
	{ 
		yAxisID: 'y-axis-1', 
		borderColor: "rgb(4, 141, 183)", //blue
		pointBackgroundColor: "rgb(4, 141, 183)", //blue
		
		backgroundColor:"rgba(220,220,220,0)", //light grey
		
		pointBorderColor: "#fff", //white
		pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
		pointHoverBackgroundColor: "rgb(4, 141, 183)" //blue
		//scaleShowGridLines: false,
		//pointDot: false,
		//bezierCurve: false
	},
	{ 
		yAxisID: 'y-axis-2',
		borderColor: "rgb(213, 223, 61)", //light green
		pointBackgroundColor: "rgb(213, 223, 61)", //light green

		backgroundColor:"rgba(220,220,220,0)", //light grey

		pointBorderColor: "#fff", //white
		pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
		pointHoverBackgroundColor: "rgb(213, 223, 61)" //light green
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

	$scope.rangeintensityoptions = {
		title: {
			display: true,
			text: 'Hand to Hand Distance and Audio Intensity vs. Time'
		},
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Hand to Hand Distance'
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