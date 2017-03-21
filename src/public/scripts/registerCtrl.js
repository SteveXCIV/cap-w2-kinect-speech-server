angular
    .module('ngCapstone')
    .controller('registerCtrl',['$scope', '$rootScope', '$location', 'registerService',
	function ($scope, $rootScope, $location, registerService) {
        $scope.register = function () {
        	$scope.dataLoading = true;
            console.log($scope);
            registerService.register($scope.email, $scope.password, $scope.verifyPassword, $scope.firstName, $scope.lastName)
                .then(function(response) {
                    $scope.dataLoading = false;
                    console.log("success");
                    console.log(response);
                },
                function(error) {
                    $scope.dataLoading = false;
                    console.log(error);
                    $scope.error = error.data.message;
                });
        };
}]);
