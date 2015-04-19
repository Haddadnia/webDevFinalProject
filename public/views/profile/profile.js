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
        console.log(response);
        $scope.signedInUser = response;
    });

    $scope.activeUserCopy = null;

    $scope.editProfile = function () {

        $scope.activeUserCopy = {
            firstName: $scope.signedInUser.firstName,
            lastName: $scope.signedInUser.lastName,
            email: $scope.signedInUser.email,
            password: $scope.signedInUser.password,
            favoriteChairs: $scope.signedInUser.favoriteChairs,
            favoriteUsers: $scope.signedInUser.favoriteUsers,
            chairs: $scope.signedInUser.chairs
        };
        $scope.updatedUser = {
            firstName: $scope.signedInUser.firstName,
            lastName: $scope.signedInUser.lastName,
            email: $scope.signedInUser.email,
            password: $scope.signedInUser.password
        }

    }

    $scope.editUserCancelled = function () {
        $scope.signedInUser = $scope.activeUserCopy;
        $scope.activeCourseCopy = null;
    }

    $scope.updateUser = function (updatedUser) {

        console.log(updatedUser);
        //console.log(newCourse);
        $scope.signedInUser = {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password: updatedUser.password,
            favoriteChairs: $scope.activeUserCopy.favoriteChairs,
            favoriteUsers: $scope.activeUserCopy.favoriteUsers,
            chairs: $scope.activeUserCopy.chairs
        }
        //!!!!!
        ////////////////////////////////////////////
        //TODO update on the user not just user 0
            $http.put("/user/" + 0, updatedUser)
            .success(function (response) {
                $scope.users = response;
            });
            $scope.selectedIndex = null;
            $scope.activeCourseCopy = null;
    }

    /// REMOVE CHAIR
    $scope.selectedDeleteIndex = -1;
    $scope.deleteChairPressed = function (index) {
        console.log(index);
        $scope.selectedDeleteIndex = index;
    }

    $scope.removeChair = function () {
        //update user

        $scope.signedInUser.chairs.splice($scope.selectedDeleteIndex, 1);
        //TODO acgually update correct signed in user
        if ($scope.selectedDeleteIndex != -1) {
            $http.put("/user/" + 0, $scope.signedInUser).success(function (response) {
                console.log(response);
                $scope.users = response;
            });
        }
        $scope.selectedDeleteIndex = -1;
    }

    $scope.removeChairCancelled = function () {
        $scope.selectedDeleteIndex = -1;
        console.log($scope.selectedDeleteIndex);
    }


});