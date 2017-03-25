(function() {
    function registerController($scope, $location, accountService) {
        $scope.register = function() {
            $scope.dataLoading = true;
            accountService.register($scope.email, $scope.password, $scope.verifyPassword, $scope.firstName, $scope.lastName)
                .then(function(response) {
                    $scope.dataLoading = false;
                    $location.url('/physician');
                }, function(error) {
                    $scope.dataLoading = false;
                    $scope.error = error.data.message;
                });
        };
    }

    angular.module('ngCapstone').controller('registerCtrl', registerController);
})();
