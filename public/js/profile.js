var app = angular.module("profile", [])


app.controller("profileController", function ($scope, $http) {

    $http.get("/chair").success(function (response) {

        console.log("test");
        $scope.chairs = response;
    });
    $http.get("/user").success(function (response) {
        $scope.users = response;
    });
    //just temporarily getting user1
    $http.get("/user/0").success(function (response) {
        $scope.signedInUser = response;
    });


    $scope.editProfile = function () {
        $scope.updatedUser = {
            firstName: signedInUser.firstName,
            lastName: signedInUser.lastName,
            email: signedInUser.email,
            password: signedInUser.password
        }
    }


});