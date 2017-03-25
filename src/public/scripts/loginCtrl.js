(function() {
    function loginController($scope, $rootScope, $location, accountService) {
        $scope.login = function() {
            $scope.dataLoading = true;
            accountService.login($scope.email, $scope.password)
                .then(function(response) {
                    $scope.dataLoading = false;
                    $location.url('/physician');
                }, function(error) {
                    $scope.dataLoading = false;
                    $scope.error = error.data.message;
                });
        };
    }

    angular.module('ngCapstone').controller('loginCtrl', loginController);
})();
