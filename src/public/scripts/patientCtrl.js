(function() {
    function patientController($scope, $location, accountService) {
        $scope.createdPatient = null;

        $scope.getPatientName = function() {
            if (!$scope.createdPatient ||
                !$scope.createdPatient.firstName ||
                !$scope.createdPatient.lastName) {
                return '???';
            }
            return $scope.createdPatient.firstName + ' ' + $scope.createdPatient.lastName;
        }

        $scope.getTempPass = function() {
            return $scope.createdPatient.tempPass;
        }

        $scope.register = function() {
            $scope.dataLoading = true;
            accountService.registerPatient($scope.email, $scope.firstName, $scope.lastName)
                .then(function(response) {
                    $scope.dataLoading = false;
                    $scope.createdPatient = response.data;
                }, function(error) {
                    $scope.dataLoading = false;
                    $scope.error = error.data.message;
                });
        };
    }

    angular.module('ngCapstone').controller('patientCtrl', patientController);
})();
