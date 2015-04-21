var app = angular.module('Passport', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/feed', {
            templateUrl: 'views/newsFeed/newsFeed.html',
            resolve: {
                getLoggedInUser: getLoggedInUser
            },
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
            resolve: {
                getLoggedInUser: getLoggedInUser
            },
            controller: 'chairController'
        })
        .when('/userView', {
            templateUrl: 'views/userView/userView.html',
            resolve: {
                getLoggedInUser: getLoggedInUser
            },
            controller: 'userViewController'
        })
        .otherwise({
            redirectTo: '/feed'
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

var getLoggedInUser = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
        }
    });
    deferred.resolve();
    return deferred.promise;
};

app.controller("NavCtrl", function ($rootScope, $scope, $http, $location) {
    $scope.logout = function () {
        $http.post("/logout").success(function () {
            $rootScope.currentUser = null;
            $location.url("/feed");
        });
    }
});