(function() {
    angular.module('ngCapstone').controller('sessionCtrl', function($scope, sessionFactory) {

        $scope.sessionindex = 2;
        $scope.righthand = [];
        $scope.lefthand = [];
        $scope.spinemid = [];
        $scope.intensity = [];
        $scope.range = [];
        $scope.handtohandaudio = [];
        $scope.handtohandaudiolabels = [];
        $scope.precision = [];
        $scope.precisionlabels = [];

        sessionFactory.getData().then(function(data) {
            $scope.sessiondata = data.data[$scope.sessionindex];
            $scope.start = new Date($scope.sessiondata.StartTime)
            $scope.end = new Date($scope.sessiondata.EndTime);
            $scope.duration = msConverter($scope.end - $scope.start);

            $scope.calibration = $scope.sessiondata.CalibrationData;
            $scope.radius = $scope.sessiondata.CalibrationData.Radius;
            $scope.pointingtimer = $scope.sessiondata.CalibrationData.PointingZoneTimerSec;
            $scope.reachright = $scope.sessiondata.CalibrationData.MaxReachRight;
            $scope.reachleft = $scope.sessiondata.CalibrationData.MaxReachLeft;
            $scope.audiothreshold = $scope.sessiondata.CalibrationData.AudioThreshold;

            $scope.objectives = $scope.sessiondata.Trials[0].Objectives;
            for (var i = 0; i < $scope.objectives.length; i++) {
                angular.forEach($scope.objectives[i], function(value, key) {
                    if (key === "kind" && value === "LocateObjective") {
                        $scope.activationtime = new Date($scope.objectives[i].ActivationTime);
                        $scope.locatestart = new Date($scope.objectives[i].StartTime);
                        $scope.locateend = new Date($scope.objectives[i].EndTime);
                        $scope.reactiontime = msConverter($scope.activationtime - $scope.locatestart);
                        $scope.locatecompletiontime = msConverter($scope.locateend - $scope.locatestart);

                        //$scope.accuracy.push([{}]); //accuracy of hand(s) position while in activation time window vs time

                        $scope.bodysnapshots = $scope.objectives[i].BodySnapshots;

                        for (j = 0; j < $scope.objectives[i].Distances.length; j++) {
                            $scope.currenttime = new Date($scope.objectives[i].Distances[j].Time);
                            if ($scope.currenttime > $scope.activationtime && $scope.currenttime < $scope.locateend) {
                                $scope.precisionlabels.push(msConverter($scope.currenttime - new Date($scope.objectives[i].Distances[0].Time)));
                                $scope.precision.push($scope.objectives[i].Distances[j].Distance);
                            };
                        };
                        $scope.precision = [$scope.precision];
                        $scope.precisionseries = ['Hand to Object Distance'];

                        //console.log($scope.objectives[0].Distances);
                        //console.log($scope.precision);
                        //console.log($scope.precisionlabels);

                        for (var s = 0; s < $scope.bodysnapshots.length; s++) {
                            for (var j = 0; j < 15; j++) {
                                angular.forEach($scope.bodysnapshots[s].Joints[j], function(value, key) {
                                    if (key === "JointType" && value === "HandRight") {
                                        //$scope.righthand.push({Time: $scope.bodysnapshots[s].Time, X: $scope.bodysnapshots[s].Joints[j].X, Y: $scope.bodysnapshots[s].Joints[j].Y});
                                        //$scope.righthand.push({x: $scope.bodysnapshots[s].Joints[j].X, y: $scope.bodysnapshots[s].Joints[j].Y});
                                        $scope.righthand.push([
                                            {
                                                x: $scope.bodysnapshots[s].Joints[j].X,
                                                y: $scope.bodysnapshots[s].Joints[j].Y,
                                                r: (($scope.bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                            }
                                        ]);
                                    };
                                    if (key === "JointType" && value === "HandLeft") {
                                        $scope.lefthand.push([
                                            {
                                                x: $scope.bodysnapshots[s].Joints[j].X,
                                                y: $scope.bodysnapshots[s].Joints[j].Y,
                                                r: (($scope.bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                            }
                                        ]);
                                    };
                                    if (key === "JointType" && value === "SpineMid") {
                                        $scope.spinemid.push([
                                            {
                                                x: $scope.bodysnapshots[s].Joints[j].X,
                                                y: $scope.bodysnapshots[s].Joints[j].Y,
                                                r: (($scope.bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                            }
                                        ]);
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
                            $scope.handtohandaudiolabels.push(msConverter($scope.currenttime - new Date($scope.objectives[i].Distances[0].Time)));
                        };
                        for (var j = 0; j < $scope.objectives[i].AudioSnapshots.length; j++) {
                            $scope.intensity.push($scope.objectives[i].AudioSnapshots[j].Intensity);
                        };
                        $scope.averageintensity = Average($scope.intensity);
                        $scope.handtohandaudio = [$scope.range].concat([$scope.intensity]);
                        $scope.handtohandaudioseries = ['Hand to Hand Distance', 'Audio Intensity'];
                        //completion time and average audio intensity

                        //console.log($scope.handtohandaudio);
                        //console.log($scope.handtohandaudiolabels);

                    };
                });
            };
        }, function(error) {
            console.log(error);
        });

        $scope.precisionoverride = [
            {
                yAxisID: 'y-axis-1',
                borderColor: "rgb(4, 141, 183)", //blue
                pointBackgroundColor: "rgb(4, 141, 183)", //blue

                backgroundColor: "rgba(220,220,220,0)", //light grey

                pointBorderColor: "#fff", //white
                pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
                pointHoverBackgroundColor: "rgb(4, 141, 183)" //blue
                //scaleShowGridLines: false,
                //pointDot: false,
                //bezierCurve: false
            }
        ];
        $scope.precisionoptions = {
            title: {
                display: true,
                text: 'Hand to Object Distance vs. Time'
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Hand to Hand Distance'
                        },
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };

        $scope.handtohandaudiooverride = [
            {
                yAxisID: 'y-axis-1',
                borderColor: "rgb(4, 141, 183)", //blue
                pointBackgroundColor: "rgb(4, 141, 183)", //blue

                backgroundColor: "rgba(220,220,220,0)", //light grey

                pointBorderColor: "#fff", //white
                pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
                pointHoverBackgroundColor: "rgb(4, 141, 183)" //blue
                //scaleShowGridLines: false,
                //pointDot: false,
                //bezierCurve: false
            }, {
                yAxisID: 'y-axis-2',
                borderColor: "rgb(213, 223, 61)", //light green
                pointBackgroundColor: "rgb(213, 223, 61)", //light green

                backgroundColor: "rgba(220,220,220,0)", //light grey

                pointBorderColor: "#fff", //white
                pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
                pointHoverBackgroundColor: "rgb(213, 223, 61)" //light green
            }

        ];
        $scope.handtohandaudiooptions = {
            title: {
                display: true,
                text: 'Hand to Hand Distance and Audio Intensity vs. Time'
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Hand to Hand Distance'
                        },
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }, {
                        scaleLabel: {
                            display: true,
                            labelString: 'Average Audio Intensity'
                        },
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };

        $scope.rangeoverride = [
            {
                backgroundColor: "#FF6384"
            }, {
                hoverBackgroundColor: "#FF6384"
            }
        ];
        $scope.rangeoptions = {
            title: {
                display: true,
                text: 'Range of Motion'
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Vertical Position'
                        },
                        id: 'y-axis',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Lateral Position'
                        },
                        id: 'x-axis',
                        type: 'linear',
                        display: true,
                        position: 'bottom'
                    }
                ]
            }
        };

        function msConverter(ms) {
            var min = Math.floor(ms / 60000);
            var sec = ((ms % 60000) / 1000).toFixed(0);
            return min + ":" + (sec < 10
                ? '0'
                : '') + sec;
        }

        function Average(array) {
            var sum = 0;
            for (var a = 0; a < array.length; a++) {
                sum += array[a];
            }
            var average = (sum / array.length);
            return average;
        }

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

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
})();
