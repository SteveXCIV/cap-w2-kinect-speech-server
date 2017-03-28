(function() {
    function patientViewController($scope, $stateParams, accountService) {
        let patientId = $stateParams.patientId;

        $scope.error = null;
        $scope.patient = null;

        function init() {
            accountService.getPatient(patientId)
            .then(response => {
                $scope.patient = response.data;
            }, error => {
                $scope.error = error.data.message;
            });
        }
        init();
    }

    angular.module('ngCapstone').controller('patientViewCtrl', patientViewController);
})();
