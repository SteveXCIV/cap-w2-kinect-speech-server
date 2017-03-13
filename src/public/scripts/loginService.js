angular
.module('ngCapstone')
.factory('loginService',['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
    
    var service = {};

    service.Login = function (email, password, callback) {

        var response = { success: email === 'test' && password === 'test' };
        if(!response.success) {
            response.message = 'Email or Password is incorrect.';
        }
        callback(response);

        /*$http.post('/api/v1/physician', { email: email, password: password })
        .success(function (response) {
            if(!response.success) {
                response.message = 'Email or Password is incorrect';
            }
            callback(response);
        });*/

    };

    return service;

}]);

