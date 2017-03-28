(function() {
    angular.module('ngCapstone').controller('sessionCtrl', function($scope, sessionFactory, $stateParams) {

        $scope.sessionId = $stateParams.sessionId;
        $scope.sessionindex = '';
        $scope.precisionPlot = [];
        $scope.handtohandaudioPlot = [];
        $scope.handtospineaudioPlot = [];
        $scope.rangePlot = [];
        $scope.trials = [];
        $scope.trialLog = {};

        sessionFactory.getData($scope.sessionId).then(function(data) {
            //General Session Data
            //$scope.sessiondata = data.data[$scope.sessionindex];
            $scope.sessiondata = data.data;
            $scope.start = new Date($scope.sessiondata.StartTime)
            $scope.end = new Date($scope.sessiondata.EndTime);
            $scope.duration = msConverter($scope.end - $scope.start);
            $scope.totalTrials  = $scope.sessiondata.Trials.length;
            for (var i = 0; i < $scope.totalTrials; i++) {
                $scope.trials.push({index: i});
            }
            //Calibration Data
            $scope.calibration = $scope.sessiondata.CalibrationData;
            $scope.radius = $scope.sessiondata.CalibrationData.Radius;
            $scope.pointingtimer = $scope.sessiondata.CalibrationData.PointingZoneTimerSec;
            $scope.reachright = $scope.sessiondata.CalibrationData.MaxReachRight;
            $scope.reachleft = $scope.sessiondata.CalibrationData.MaxReachLeft;
            $scope.audiothreshold = $scope.sessiondata.CalibrationData.AudioThreshold;

            //Plot Generation per Trial
            $scope.getAllSelected = function(){   
                $scope.selectedTrials = [];
                angular.forEach($scope.trialLog,function(key,value){
                    if(key)
                        $scope.selectedTrials.push(value)
                });
                angular.forEach($scope.selectedTrials,function(trialNumber){
                    console.log(trialNumber);
                    $scope.precisionPlot[trialNumber] = precisionPlotGenerator($scope.sessiondata.Trials[trialNumber]);
                    $scope.handtohandaudioPlot[trialNumber] = handtohandaudioPlotGenerator($scope.sessiondata.Trials[trialNumber]);
                    $scope.handtospineaudioPlot[trialNumber] = handtospineaudioPlotGenerator($scope.sessiondata.Trials[trialNumber]);
                    console.log($scope.handtospineaudioPlot[trialNumber]);
                    $scope.rangePlot[trialNumber] = rangePlotGenerator($scope.sessiondata.Trials[trialNumber]);
                });
            };
            
            
        }, function(error) {
            console.log(error);
        });

        $scope.onClick = function(points, evt) {console.log(points, evt);};
        

        function msConverter(ms) {
            var min = Math.floor(ms / 60000);
            var sec = ((ms % 60000) / 1000).toFixed(0);
            return min + ":" + (sec < 10
                ? '0'
                : '') + sec;
        };

        function averageCalculator(array) {
            var sum = 0;
            for (var a = 0; a < array.length; a++) {
                sum += array[a];
            }
            var average = (sum / array.length);
            return average;
        };

        function timeLabeler(timearray) {
            for(var i = timearray.length; i > 0; i--){
                if (timearray[i] == timearray[i-1]) {timearray[i] = ''};
            }
            timearray[0] = ''; //find a better way to do this
            return timearray;
        };

        function PlotGenerator (trialData) {
            var righthand = [];
            var lefthand = [];
            var spinemid = [];
            var intensity = [];
            var range = [];
            var handtohandaudio = [];
            var handtohandaudiolabels = [];
            var objectives = trialData.Objectives;
            for (var i = 0; i < objectives.length; i++) {
                angular.forEach(objectives[i], function(value, key) {
                    if (key === "kind" && value === "LocateObjective") {
                        var activationtime = new Date(objectives[i].ActivationTime);
                        var locatestart = new Date(objectives[i].StartTime);
                        var locateend = new Date(objectives[i].EndTime);
                        var reactiontime = msConverter(activationtime - locatestart);
                        var locatecompletiontime = msConverter(locateend - locatestart);

                        var bodysnapshots = objectives[i].BodySnapshots;

                        for (j = 0; j < objectives[i].Distances.length; j++) {
                            var currenttime = new Date(objectives[i].Distances[j].Time);
                            if (currenttime >= activationtime && currenttime <= locateend) {
                                precisionlabels.push(msConverter(currenttime - new Date(activationtime)));
                                precision.push(objectives[i].Distances[j].Distance);
                            };
                        };
                        precision = [precision];
                        precisionlabels = timeLabeler(precisionlabels);
                        var precisionseries = ['Hand to Object Distance'];

                        for (var s = 0; s < bodysnapshots.length; s++) {
                            for (var j = 0; j < 15; j++) {
                                angular.forEach(bodysnapshots[s].Joints[j], function(value, key) {
                                    if (key === "JointType" && value === "HandRight") {
                                        righthand.push([
                                        {
                                            x: bodysnapshots[s].Joints[j].X,
                                            y: bodysnapshots[s].Joints[j].Y,
                                            r: ((bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                        }
                                        ]);
                                    };
                                    if (key === "JointType" && value === "HandLeft") {
                                        lefthand.push([
                                        {
                                            x: bodysnapshots[s].Joints[j].X,
                                            y: bodysnapshots[s].Joints[j].Y,
                                            r: ((bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                        }
                                        ]);
                                    };
                                    if (key === "JointType" && value === "SpineMid") {
                                        spinemid.push([
                                        {
                                            x: bodysnapshots[s].Joints[j].X,
                                            y: bodysnapshots[s].Joints[j].Y,
                                            r: ((bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                        }
                                        ]);
                                    };
                                });
                            };
                        };

                    };
                    if (key === "kind" && value === "DescribeObjective") {
                        var describestart = new Date(objectives[i].StartTime);
                        var describeend = new Date(objectives[i].EndTime);
                        var describecompletiontime = msConverter(describeend - describestart);
                        for (var j = 0; j < objectives[i].Distances.length; j++) {
                            range.push(objectives[i].Distances[j].HandToHandDistance);
                            var currenttime = new Date(objectives[i].Distances[j].Time);
                            handtohandaudiolabels.push(msConverter(currenttime - new Date(objectives[i].Distances[0].Time)));
                        };
                        for (var j = 0; j < objectives[i].AudioSnapshots.length; j++) {
                            intensity.push(objectives[i].AudioSnapshots[j].Intensity);
                        };
                        var averageintensity = averageCalculator(intensity);
                        handtohandaudio = [range].concat([intensity]);
                        handtohandaudiolabels = timeLabeler(handtohandaudiolabels);
                        var handtohandaudioseries = ['Hand to Hand Distance', 'Audio Intensity'];

                    };
                });
};
return {data: precision, labels: precisionlabels, series: precisionseries, options: precisionoptions, override: precisionoverride};
};

function rangePlotGenerator (trialData) {
    var righthand = [];
    var lefthand = [];
    var spinemid = [];
    var objectives = trialData.Objectives;
    for (var i = 0; i < objectives.length; i++) {
        angular.forEach(objectives[i], function(value, key) {
            if (key === "kind" && value === "LocateObjective") {
                var bodysnapshots = objectives[i].BodySnapshots;
                for (var s = 0; s < bodysnapshots.length; s++) {
                    for (var j = 0; j < 15; j++) {
                        angular.forEach(bodysnapshots[s].Joints[j], function(value, key) {
                            if (key === "JointType" && value === "HandRight") {
                                righthand.push([
                                {
                                    x: bodysnapshots[s].Joints[j].X,
                                    y: bodysnapshots[s].Joints[j].Y,
                                    r: ((bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                }
                                ]);
                            };
                            if (key === "JointType" && value === "HandLeft") {
                                lefthand.push([
                                {
                                    x: bodysnapshots[s].Joints[j].X,
                                    y: bodysnapshots[s].Joints[j].Y,
                                    r: ((bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                }
                                ]);
                            };
                            if (key === "JointType" && value === "SpineMid") {
                                spinemid.push([
                                {
                                    x: bodysnapshots[s].Joints[j].X,
                                    y: bodysnapshots[s].Joints[j].Y,
                                    r: ((bodysnapshots[s].Joints[j].Z) - 1.2) * 5
                                }
                                ]);
                            };
                        });
                    };
                };
            };
        });
    };
    var rangeoptions = {
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
    var rangeoverride = [
    {
        backgroundColor: "#FF6384"
    }, {
        hoverBackgroundColor: "#FF6384"
    }
    ];
    return {right: righthand, left: lefthand, spinemid: spinemid, options: rangeoptions, override: rangeoverride};
};

function handtohandaudioPlotGenerator (trialData) {
    var intensity = []; var range = [];
    var handtohandaudio = []; var handtohandaudiolabels = [];
    var objectives = trialData.Objectives;
    for (var i = 0; i < objectives.length; i++) {
        angular.forEach(objectives[i], function(value, key) {
            if (key === "kind" && value === "DescribeObjective") {
                        //var describestart = new Date(objectives[i].StartTime);
                        //var describeend = new Date(objectives[i].EndTime);
                        //var describecompletiontime = msConverter(describeend - describestart);
                        for (var j = 0; j < objectives[i].Distances.length; j++) {
                            range.push(objectives[i].Distances[j].HandToHandDistance);
                            var currenttime = new Date(objectives[i].Distances[j].Time);
                            handtohandaudiolabels.push(msConverter(currenttime - new Date(objectives[i].Distances[0].Time)));
                        };
                        for (var j = 0; j < objectives[i].AudioSnapshots.length; j++) {
                            intensity.push(objectives[i].AudioSnapshots[j].Intensity);
                        };
                        //var averageintensity = averageCalculator(intensity);
                        handtohandaudio = [range].concat([intensity]);
                        handtohandaudiolabels = timeLabeler(handtohandaudiolabels);
                    };
                });
    };
    var handtohandaudioseries = ['Hand to Hand Distance', 'Audio Intensity'];
    var handtohandaudiooptions = {
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
            ],
            xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Time (sec)'
                }
            }
            ]
        }
    };
    var handtohandaudiooverride = [
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
                return {data: handtohandaudio, labels: handtohandaudiolabels, series: handtohandaudioseries, options: handtohandaudiooptions, override: handtohandaudiooverride};
            };

            function handtospineaudioPlotGenerator (trialData) {
                var intensity = []; var range = [];
                var handtospineaudio = []; var handtospineaudiolabels = [];
                var objectives = trialData.Objectives;
                for (var i = 0; i < objectives.length; i++) {
                    angular.forEach(objectives[i], function(value, key) {
                        if (key === "kind" && value === "DescribeObjective") {
                        //var describestart = new Date(objectives[i].StartTime);
                        //var describeend = new Date(objectives[i].EndTime);
                        //var describecompletiontime = msConverter(describeend - describestart);
                        for (var j = 0; j < objectives[i].Distances.length; j++) {
                            range.push(objectives[i].Distances[j].HandsToSpineDistance);
                            var currenttime = new Date(objectives[i].Distances[j].Time);
                            handtospineaudiolabels.push(msConverter(currenttime - new Date(objectives[i].Distances[0].Time)));
                        };
                        for (var j = 0; j < objectives[i].AudioSnapshots.length; j++) {
                            intensity.push(objectives[i].AudioSnapshots[j].Intensity);
                        };
                        //var averageintensity = averageCalculator(intensity);
                        handtospineaudio = [range].concat([intensity]);
                        handtospineaudiolabels = timeLabeler(handtospineaudiolabels);
                    };
                });
                };
                var handtospineaudioseries = ['Hand to Hand Distance', 'Audio Intensity'];
                var handtospineaudiooptions = {
                    title: {
                        display: true,
                        text: 'Hand to Spine Distance and Audio Intensity vs. Time'
                    },
                    scales: {
                        yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Hand to Spine Distance'
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
                        ],
                        xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Time (sec)'
                            }
                        }
                        ]
                    }
                };
                var handtospineaudiooverride = [
                {
                    yAxisID: 'y-axis-1',
                    borderColor: "rgb(226, 93, 151)", //pink
                    pointBackgroundColor: "rgb(226, 93, 151)", //pink

                    backgroundColor: "rgba(220,220,220,0)", //light grey

                    pointBorderColor: "#fff", //white
                    pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
                    pointHoverBackgroundColor: "rgb(226, 93, 151)" //pink
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
                return {data: handtospineaudio, labels: handtospineaudiolabels, series: handtospineaudioseries, options: handtospineaudiooptions, override: handtospineaudiooverride};
            };

            function precisionPlotGenerator (trialData) {
                var precision = []; var precisionlabels = [];
                var objectives = trialData.Objectives;
                for (var i = 0; i < objectives.length; i++) {
                    angular.forEach(objectives[i], function(value, key) {
                        if (key === "kind" && value === "LocateObjective") {
                            var activationtime = new Date(objectives[i].ActivationTime);
                            var locateend = new Date(objectives[i].EndTime);
                            for (var j = 0; j < objectives[i].Distances.length; j++) {
                                var currenttime = new Date(objectives[i].Distances[j].Time);
                                if (currenttime >= activationtime && currenttime <= locateend) {
                                    precisionlabels.push(msConverter(currenttime - new Date(activationtime)));
                                    precision.push(objectives[i].Distances[j].Distance);
                                };
                            };
                            precision = [precision];
                            precisionlabels = timeLabeler(precisionlabels);
                        };
                    });
                };
                var precisionseries = ['Hand to Object Distance'];
                var precisionoptions = {
                    title: {
                        display: true,
                        text: 'Hand to Object Distance vs. Time'
                    },
                    scales: {
                        yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Hand to Object Distance'
                            },
                            id: 'yaxis',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                        ],
                        xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Time (sec)'
                            }
                        }
                        ]
                    }
                };
                var precisionoverride = [
                {
                    yAxisID: 'yaxis',
                    borderColor: "rgb(4, 141, 183)", //blue
                    pointBackgroundColor: "rgb(4, 141, 183)", //blue
                    backgroundColor: "rgba(220,220,220,0)", //light grey
                    pointBorderColor: "#fff", //white
                    pointHoverBorderColor: "rgba(220,220,220,0)", //light grey
                    pointHoverBackgroundColor: "rgb(4, 141, 183)" //blue
                }
                ];
                return {data: precision, labels: precisionlabels, series: precisionseries, options: precisionoptions, override: precisionoverride};
            };

        });
})();
