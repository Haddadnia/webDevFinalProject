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
            password: $scope.signedInUser.password
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
            password: updatedUser.password
        }

        //!!!!!
        ////////////////////////////////////////////
        //TODO update on the user not just user 0

        
            $http.put("/user/" + 0, updatedUser)
            .success(function (response) {
                $scope.users = response;
            });
            $scope.selectedIndex = null;
            
            
        

    }


});