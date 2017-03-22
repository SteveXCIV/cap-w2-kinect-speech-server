angular
.module('ngCapstone')
.controller('loginCtrl',['$scope', '$rootScope', '$location', 'loginService',
	function ($scope, $rootScope, $location, loginService) {
        $scope.login = function () {
        	$scope.dataLoading = true;
            console.log("trying to log in");
        	loginService.Login($scope.email, $scope.password, function(response) {
        		console.log(response);
                if(response.data) {
        			$location.path('/physician');
        		} else {
        			$scope.error = response.message;
        			$scope.dataLoading = false;
        		}
        	});
        };
    }]);