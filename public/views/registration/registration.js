app.controller("RegistrationCtrl", function ($scope, $http, $rootScope) {
    $scope.register = function (user) {
        console.log(user);
        if (user.password == user.password2)
        {
            $http.post('/register', user).success(function (user) {
                console.log(user)
                $rootScope.currentUser = user;
            });
        }
        //ELSE NOTIFY USER
    };
});