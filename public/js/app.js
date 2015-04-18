var app = angular.module('Passport', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/registration.html'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});