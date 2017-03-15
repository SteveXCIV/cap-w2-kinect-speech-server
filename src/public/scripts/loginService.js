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
            console.log("successmsg" + response);
            if(response.data) {
                response.message = "Post Data Submitted Successfully!";
            }
            callback(response);
        },function(response) {
            console.log("errormsg" + response);
            response.message = "Errorrrrrr";
            //callback(response);
        });


    };

/*
    service.SetCredentials = function (email, password) {
        var authdata = Base64.encode(email + ':' + password);

        $rootScope.globals = {
            currentUser: {
                email: email,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    };*/

    /*service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
    };*/

    return service;

    }]);

