app.controller("RegistrationCtrl", function ($scope, $http, $rootScope, $location) {
    $scope.register = function (user) {
        if (user.password == user.password2)
        {
            user.role = "admin";
            $http.post('/register', user).success(function (user) {
                $rootScope.currentUser = user;
                $location.url("/profile");
            });
        }
        else {
            alert("Passwords do not match");
        }
    };
});