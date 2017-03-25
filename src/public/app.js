(function() {
    angular.module('ngCapstone', ['ui.bootstrap', 'ui.router', 'chart.js', 'ngCookies']).config([
        '$urlRouterProvider',
        '$stateProvider',
        function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider.state('login', {
                url: "/login",
                templateUrl: 'login.html',
                controller: "loginCtrl",
                data: {
                    requireLogin: false
                }
            }).state('register', {
                url: '/register',
                templateUrl: 'register.html',
                controller: 'registerCtrl',
                data: {
                    requireLogin: false
                }
            }).state('physician', {
                url: '/physician',
                templateUrl: 'physician.html',
                controller: 'physicianCtrl',
                data: {
                    requireLogin: true
                }
            }).state('player', {
                url: '/player',
                templateUrl: 'player.html',
                controller: 'playerCtrl',
                data: {
                    requireLogin: true
                }
            }).state('session', {
                url: '/session',
                templateUrl: 'session.html',
                controller: 'sessionCtrl'
            }).state('logout', {
                url: '/logout',
                templateUrl: 'logout.html'
            })
        }
    ]);
})();
