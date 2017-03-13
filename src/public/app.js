angular
.module('ngCapstone', [
	'ui.bootstrap',
	'ui.router',
	'chart.js',
	'ngCookies',
	])
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/login');
	$stateProvider
	.state('login', {
		url: "/login",
		templateUrl: 'login.html',
		controller: "loginCtrl",
		data: {
			requireLogin: false
		}
	})
	.state('physician', {
		url: '/physician',
		templateUrl: 'physician.html',
		controller: 'physicianCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('player', {
		url: '/player',
		templateUrl: 'player.html',
		controller: 'playerCtrl',
		data: {
			requireLogin: true
		}
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
/*
angular
.module('ngCapstone', [
	'ui.bootstrap',
	'ui.router',
	'chart.js'
	])
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	$stateProvider
	
	.state('dashboard', {
		url: "/dashboard",
		template: 'dashboard.html',
	})
	.state('dashboard.login', {
		url: "/login",
		template: 'login,html',
		controller: "loginCtrl"
	})
	.state('dashboard.physician', {
		url: "/physician",
		templateUrl: "physician.html",
		controller: "physicianCtrl"
	})
	.state('dashboard.session', {
		url: "/session",
		templateUrl: "session.html",
		controller: "sessionCtrl"
	})
	.state('dashboard.player', {
		url: "/player",
		templateUrl: "player.html",
		controller: "playerCtrl"
	})
	.state('dashboard.logout', {
		url: "/logout",
		templateUrl: "logout.html"
	});
	$urlRouterProvider.otherwise('/dashboard/physician');
}
]);*/