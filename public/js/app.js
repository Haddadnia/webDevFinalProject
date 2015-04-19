var app = angular.module('Passport', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/newsFeed', {
            templateUrl: 'views/newsFeed/newsFeed.html',
            controller: 'newsFeedController'
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/registration/registration.html',
            controller: 'RegistrationCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile/profile.html',
            resolve: {
                logincheck: checkLoggedin
            },
            controller: 'profileController'
        })
        .when('/chair', {
            templateUrl: 'views/chair/chair.html',
            controller: 'chairController'
        })
        .otherwise({
            redirectTo: '/newsFeed'
        });
});

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }            
            // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};


app.controller("NavCtrl", function ($rootScope, $scope, $http, $location) {
    $scope.logout = function () {
        $http.post("/logout").success(function () {
            $rootScope.currentUser = null;
            $location.url("/newsFeed");
        });
    }
});