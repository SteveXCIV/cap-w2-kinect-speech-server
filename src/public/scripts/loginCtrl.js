angular
.module('ngCapstone')
.controller('loginCtrl',['$scope', '$rootScope', '$location', 'loginService',
	function ($scope, $rootScope, $location, loginService) {

        $scope.login = function () {
        	$scope.dataLoading = true;
        	loginService.Login($scope.email, $scope.password, function(response) {
        		if(response.success) {
        			$location.path('/physician');
        		} else {
        			$scope.error = response.message;
        			$scope.dataLoading = false;
        		}
        	});
        };
    }]);