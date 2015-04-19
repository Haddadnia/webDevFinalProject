app.controller("LoginCtrl", function ($scope, $http, $rootScope, $location) {
    $scope.login = function (user) {
        console.log(user);
        $http.post('/login', user).success(function (response) {
            console.log(response);
            $rootScope.currentUser = user;
            $location.url("/profile");
        });
    };
});