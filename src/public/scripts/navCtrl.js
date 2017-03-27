(function() {
    function navController($scope, $location, accountService) {
        $scope.getUserName = function() {
            let user = accountService.getUser();
            if (!user || !user.firstName || !user.lastName) {
                return '?';
            }
            return user.firstName + ' ' + user.lastName;
        }
    }

    angular.module('ngCapstone').controller('navCtrl', navController);
})();
