angular
    .module('ngCapstone')
    .factory('registerService',['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
        return {
            register: function (email, password, verifyPassword, firstName, lastName) {
                let req = {
                    email: email,
                    password: password,
                    verifyPassword: verifyPassword,
                    firstName: firstName,
                    lastName: lastName
                };
                console.log(req);
                return $http.post('/api/v1/register/physician', req);
            }
        };
}]);
