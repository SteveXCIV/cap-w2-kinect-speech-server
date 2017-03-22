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
    .state('register', {
        url: '/register',
        templateUrl: 'register.html',
        controller: 'registerCtrl',
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
}]);
/*
.run(function ($rootScope) {

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		var requireLogin = toState.data.requireLogin;

		if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
			event.preventDefault();
			loginModal()
			.then(function () {
				return $state.go(toState.name, toParams);
			})
			.catch(function () {
				return $state.go('welcome');
			});
		}
	});

});*/

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
