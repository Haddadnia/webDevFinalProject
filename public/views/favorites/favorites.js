var app = angular.module("favorites", [])


app.controller("favoritesController", function ($scope, $http) {


    $http.get("/user").success(function (response) {
        $scope.users = response;

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

    /// REMOVE CHAIR
    $scope.selectedDeleteIndexFavoriteChair = -1;
    $scope.deleteChairPressed = function (index) {
        console.log(index);
        $scope.selectedDeleteIndexFavoriteChair = index;
    }

    $scope.removeChair = function () {
        //update user

        $scope.signedInUser.favoriteChairs.splice($scope.selectedDeleteIndexFavoriteChair, 1);
        //TODO acgually update correct signed in user
        if ($scope.selectedDeleteIndexFavoriteChair != -1) {
            $http.put("/user/" + 0, $scope.signedInUser).success(function (response) {
                console.log(response);
                $scope.users = response;
            });
        }
        $scope.selectedDeleteIndexFavoriteChair = -1;
    }

    $scope.removeChairCancelled = function () {
        $scope.selectedDeleteIndexFavoriteChair = -1;
        console.log($scope.selectedDeleteIndexFavoriteChair);
    }

   ////////////////REMOVE USER 

    $scope.selectedDeleteIndexUser = -1;
    $scope.deleteUserPressed = function (index) {
        $scope.selectedDeleteIndexUser = index;
    }

    $scope.removeUser = function () {
        //update user
        $scope.signedInUser.favoriteUsers.splice($scope.selectedDeleteIndexUser, 1);
        //TODO acgually update correct signed in user
        if ($scope.selectedDeleteIndexUser != -1) {
            $http.put("/user/" + 0, $scope.signedInUser).success(function (response) {
                console.log(response);
                $scope.users = response;
            });
        }
        $scope.selectedDeleteIndexUser = -1;
    }

    $scope.removeUserCancelled = function () {
        $scope.selectedDeleteIndexUser = -1;
        console.log($scope.selectedDeleteIndexUser);
    }

});