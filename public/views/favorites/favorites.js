var app = angular.module("favorites", [])


app.controller("favoritesController", function ($scope, $http) {


    $http.get("/user").success(function (response) {
        $scope.users = response;
        console.log(response);
        $scope.signedInUser = $scope.users[0];
    });



    /*
    //just temporarily getting user1
    $http.get("/user/0").success(function (response) {
        $scope.signedInUser = response;

        $scope.favoriteChairs = response.favoriteChairs;
        $scope.favoriteUsers = response.favoriteUsers;

        console.log(response);
        console.log($scope.favoriteChairs);

    });
    */

    /// delete chair from favorites
    $scope.selectedDeleteIndex = -1;
    $scope.deleteChairPressed = function (index) {
        console.log(index);
        $scope.selectedDeleteIndex = index;
    }

    $scope.removeChair = function () {
        //update user

        $scope.signedInUser.favoriteChairs.splice($scope.selectedDeleteIndex,1);
        


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

   ////USER STUFF TO COME

    $scope.removeUser = function () {
        var index = $('#deleteIndexUser').attr('index')
        $http.delete("/user/" + index)
        .success(function (response) {
            $scope.favoriteUsers = response;
        });
    }




});