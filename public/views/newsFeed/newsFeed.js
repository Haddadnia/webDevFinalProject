﻿app.controller("newsFeedController", function ($scope, $http, $location, $rootScope) {

    $scope.signedInUser = $rootScope.currentUser;

    $http.get("/allChairs").success(function (chairs) {
        $scope.chairs = chairs;
    });

    //chair selected
    $scope.chairSelected = function (chair) {
        $rootScope.currentUser.chairToView = chair._id;
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        $location.url('/chair');
    }


    /////////////////// ADD CHAIR TO FAVORITES
    //$scope.selectedFavoriteIndex = -1;
    var selectedChair = null;
    $scope.favoriteChairPressed = function (chair) {
        selectedChair = chair;
    }

    $scope.favoriteChair = function () {
        $rootScope.currentUser.favoriteChairs.push(selectedChair._id);
        selectedChair.usersWhoFavorited.push($rootScope.currentUser._id);
        $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        $http.put('/updateChair/' + selectedChair._id, selectedChair).success(function (user) {

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