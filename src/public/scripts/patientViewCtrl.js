(function() {
    function patientViewController($scope, $stateParams, accountService) {
        let patientId = $stateParams.patientId;

        $scope.error = null;
        $scope.patient = null;

        function init() {
            accountService.getPatient(patientId)
            .then(response => {
                console.log('response data', response);
                $scope.patient = response.data;
            }, error => {
                console.log('response error', error);
                $scope.error = error.data.message;
            });
            console.log('patient', $scope.patient);
            console.log('error', $scope.error);
        }
        init();
    }

    angular.module('ngCapstone').controller('patientViewCtrl', patientViewController);
})();
