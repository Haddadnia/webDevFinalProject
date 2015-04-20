app.controller("RegistrationCtrl", function ($scope, $http, $rootScope, $location) {
    $scope.register = function (user) {
        if (user.password == user.password2)
        {
            user.role = "user";
            $http.post('/register', user).success(function (user) {
                console.log(user);
                $rootScope.currentUser = user;
                $location.url("/profile");
            });
        }
        else {
            alert("Passwords do not match");
        }
        //ELSE NOTIFY USER
    };
});