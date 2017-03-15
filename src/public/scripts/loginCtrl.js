angular
.module('ngCapstone')
.controller('loginCtrl',['$scope', '$rootScope', '$location', 'loginService',
	function ($scope, $rootScope, $location, loginService) {

        //loginService.ClearCredentials();

        $scope.login = function () {
        	$scope.dataLoading = true;
        	loginService.Login($scope.email, $scope.password, function(response) {
        		console.log(response);
                if(response.data) {
                    //loginService.SetCredentials($scope.email, $scope.password);
        			$location.path('/physician');
        		} else {
        			$scope.error = response.message;
        			$scope.dataLoading = false;
        		}
        	});
        };
    }]);