(function() {
    function loginController($scope, $rootScope, $location, accountService) {
        $scope.login = function() {
            $scope.dataLoading = true;
            console.log("trying to log in");
            accountService.login($scope.email, $scope.password, function(response) {
                console.log(response);
                if (response.data) {
                    $location.path('/physician');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }

    angular.module('ngCapstone').controller('loginCtrl', loginController);
})();
