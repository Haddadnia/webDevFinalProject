app.controller("LoginCtrl", function ($scope, $http, $rootScope, $location) {
    $scope.login = function (user) {
        $http.post('/login', user).success(function (user) {
            $rootScope.currentUser = user;
            $location.url("/profile");
        });
    };
});