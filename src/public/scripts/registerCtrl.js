(function() {
    angular.module('ngCapstone').controller('registerCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'accountService',
        function($scope, $rootScope, $location, accountService) {
            $scope.register = function() {
                $scope.dataLoading = true;
                console.log($scope);
                registerService.register($scope.email, $scope.password, $scope.verifyPassword, $scope.firstName, $scope.lastName).then(function(response) {
                    $scope.dataLoading = false;
                    $location.url('/physician');
                }, function(error) {
                    $scope.dataLoading = false;
                    console.log(error);
                    $scope.error = error.data.message;
                });
            };
        }
    ]);
})();
