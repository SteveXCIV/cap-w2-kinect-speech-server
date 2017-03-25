(function() {
    function accountService($http, $rootScope) {
        function login(email, password, cb) {
            $http.post('/api/v1/login/physician', {
                email: email,
                password: password
            }).then(cb, err => {
                console.log('Login error:', err);
            });
        }

        function register(email, password, verifyPassword, firstName, lastName) {
            let req = {
                email: email,
                password: password,
                verifyPassword: verifyPassword,
                firstName: firstName,
                lastName: lastName
            };
            return $http.post('/api/v1/register/physician', req);
        }

        return {login: login, register: register};
    }

    angular.module('ngCapstone').factory('accountService', accountService);
})();
