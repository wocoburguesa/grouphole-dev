angular.module('grouphole').
    constant('Urls', {
        baseUrl: function () {
            return 'http://localhost:8000';
        },
        login: function () {
            return  'http://localhost:8000/login';
        }
    });
