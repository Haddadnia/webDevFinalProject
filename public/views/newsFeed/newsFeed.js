﻿app.controller("newsFeedController", function ($scope, $http, $location, $rootScope) {

    $scope.signedInUser = $rootScope.currentUser;

    $http.get("/allChairs").success(function (chairs) {
        $scope.chairs = chairs;
    });

    //chair selected
    $scope.chairSelected = function (index) {
        $rootScope.currentChair = $scope.chairs[index];
        $location.url('/chair');
    }


    /////////////////// ADD CHAIR TO FAVORITES
    //$scope.selectedFavoriteIndex = -1;
    $scope.favoriteChairPressed = function (id) {
        $scope.selectedID = id;
        console.log(id);
    }

    $scope.favoriteChair = function () {
        $scope.signedInUser.favoriteChairs.push($scope.selectedID);

        $http.put('/updateUser/' + $scope.signedInUser._id, $scope.signedInUser).success(function (user) {
            $scope.currentUser = user;
        });
        /*
        //update user

        $scope.signedInUser.favoriteChairs.push($scope.chairs[$scope.selectedFavoriteIndex]);
        //TODO acgually update correct signed in user
        if ($scope.selectedFavoriteIndex != -1) {
            $http.put("/user/" + 0, $scope.signedInUser).success(function (response) {
                console.log(response);
                console.log("response^^^");
                $scope.users = response;
            });
        }
        $scope.selectedFavoriteIndex = -1;
        */
    }

    /*
    $scope.favoriteChairCancelled = function () {
        $scope.selectedFavoriteIndex = -1;
    }
    */

});