(function() {
    angular.module('ngCapstone').controller('physicianCtrl', function($scope, physicianFactory) {

        $scope.hello = 'Hello capstone world';
        $scope.title = 'Physician Page';
        $scope.sampledata;
        $scope.testdata;

        physicianFactory.getData().then(function(data) {
            $scope.gamedata = data.data;
        }, function(error) {
            console.log(error);
        });

    });
})();
