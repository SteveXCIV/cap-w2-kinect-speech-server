(function() {
    function accountService($http, $rootScope) {
        function getUser() {
            return $rootScope.loggedInUser;
        }

        function login(email, password) {
            let req = {
                email: email,
                password: password
            };
            return $http.post('/api/v1/login/physician', req);
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

        function registerPatient(email, firstName, lastName) {
            let req = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            return $http.post('/api/v1/register/patient', req);
        }

        function getPatient(patientId) {
            return $http.get('/api/v1/patient/' + patientId);
        }

        return {
            getPatient: getPatient,
            getUser: getUser,
            login: login,
            register: register,
            registerPatient: registerPatient
        };
    }

    angular.module('ngCapstone').factory('accountService', accountService);
})();
