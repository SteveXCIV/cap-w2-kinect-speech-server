angular
	.module('ngCapstone', [
		'ui.bootstrap',
		'ui.router'
		])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('physician', {
				url: '/physician',
				templateUrl: 'physician.html',
				controller: 'physicianCtrl'
			})
			.state('player', {
				url: '/player',
				templateUrl: 'player.html',
				controller: 'playerCtrl'
			})
			.state('session', {
				url: '/session',
				templateUrl: 'session.html',
				controller: 'sessionCtrl'
			})
			.state('logout', {
				url: '/logout',
				templateUrl: 'logout.html'
			})
		}
	]);