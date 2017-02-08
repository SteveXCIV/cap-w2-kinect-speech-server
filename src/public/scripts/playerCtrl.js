angular
	.module('ngCapstone')
  .controller('playerCtrl', ['$scope', 'capstoneFactory', function($scope, capstoneFactory) {
    $scope.title = "Player Details";

  }]);