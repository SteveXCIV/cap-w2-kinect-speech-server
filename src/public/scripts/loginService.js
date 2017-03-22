angular
.module('ngCapstone')
.factory('loginService',['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {

    var service = {};

    service.Login = function (email, password, callback) {

        /*var response = { success: email === 'test' && password === 'test' };
        if(!response.success) {
            response.message = 'Email or Password is incorrect.';
        }
        callback(response);*/

        /*$http.post('/api/v1/login/physician', { email: email, password: password })
        .then(function (response) {
            console.log(response);
            if(!response.data) {
                response.message = 'Email or Password is incorrect';
            }
            callback(response);
        },function(error) {
            console.log(error);
        });*/

        $http.post('/api/v1/login/physician', { email: email, password: password }).then(function (response) {
            console.log(response);
            if(response.data) {
                response.message = "Post Data Submitted Successfully!";
            }
            callback(response);
        },function(response) {
            console.log(response);
            response.message = "Errorrrrrr";
            //callback(response);
        });


    };

    return service;

    }]);

