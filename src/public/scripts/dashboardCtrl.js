(function() {
    function dashboardController($scope, $location, accountService) {
        $scope.getPatients = function() {
            return accountService.getUser().patients;
        }
    }

    angular.module('ngCapstone').controller('dashboardCtrl', dashboardController);
})();
