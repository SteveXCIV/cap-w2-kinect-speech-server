(function() {
    let checkLogin = [
        '$http',
        '$location',
        '$rootScope',
        function ($http, $location, $rootScope) {
            return $http.get('/api/v1/loggedIn/physician')
                .then(response => {
                    let account = response.data;
                    $rootScope.loggedInUser = account;
                    return account;
                },
                err => {
                    $location.url('/');
                });
    }];

    let deferredLogout = [
        '$http',
        '$location',
        '$rootScope',
        function ($http, $location, $rootScope) {
            $rootScope.loggedInUser = null;
            return $http.post('/api/v1/logout')
                .then(response => {
                    $location.url('/');
                    return;
                }, err => {
                    console.log('Error logging out, redirecting.', err);
                    $location.url('/');
                    return;
                });
        }];

    angular.module('ngCapstone', ['ui.bootstrap', 'ui.router', 'chart.js', 'ngCookies', 'ngAvatar']).config([
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
            }).state('registerPatient', {
                url: '/patient/new',
                templateUrl: 'registerPatient.html',
                controller: 'registerPatientCtrl',
                resolve: checkLogin
            }).state('physician', {
                url: '/physician',
                templateUrl: 'physician.html',
                controller: 'physicianCtrl',
                resolve: checkLogin,
                data: {
                    requireLogin: true,
                }
            }).state('player', {
                url: '/player',
                templateUrl: 'player.html',
                controller: 'playerCtrl',
                resolve: checkLogin,
                data: {
                    requireLogin: true
                }
            }).state('session', {
                url: '/session',
                templateUrl: 'session.html',
                controller: 'sessionCtrl',
                resolve: checkLogin
            }).state('logout', {
                url: '/logout',
                templateUrl: 'logout.html',
                resolve: deferredLogout
            })
        }
    ]);
})();
