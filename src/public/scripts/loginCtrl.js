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
                    let errMsg = [];
                    if (error.status && error.status === 401) {
                        errMsg = ['Invalid username or password.'];
                    } else if (error.data && error.data.message) {
                        errMsg = error.data.message;
                    } else {
                        errMsg = error.data;
                    }
                    $scope.error = errMsg;
                });
        };
    }

    angular.module('ngCapstone').controller('loginCtrl', loginController);
})();
