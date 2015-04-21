﻿app.controller("newsFeedController", function ($scope, $http, $location, $rootScope, DatabaseService) {

    //$scope.signedInUser = $rootScope.currentUser;
    DatabaseService.getAllChairs(function (chairs) {
        $scope.chairs = chairs;
    });
    /*
    $http.get("/allChairs").success(function (chairs) {
        $scope.chairs = chairs;
    });
    */
    //chair selected
    $scope.chairSelected = function (chair) {
        $rootScope.currentUser.chairToView = chair._id;
        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        */
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

        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        */
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