app.controller("profileController", function ($scope, $http, $rootScope, $location) {

    
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
            $http.put("/user/" + 0, $scope.signedInUser)
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


    ////////////////////////////    Favorites stuff

    /// REMOVE CHAIR FAVORITE
    $scope.selectedDeleteIndexFavoriteChair = -1;
    $scope.deleteChairFavoritePressed = function (index) {
        console.log(index);
        $scope.selectedDeleteIndexFavoriteChair = index;
    }

    $scope.removeChairFavorite = function () {
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

    $scope.removeChairFavoriteCancelled = function () {
        $scope.selectedDeleteIndexFavoriteChair = -1;
        console.log($scope.selectedDeleteIndexFavoriteChair);
    }

    ////////////////REMOVE USER FAVORITE

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


    //chair selected
    $scope.chairSelectedMyChair = function (index) {

        $rootScope.currentChair = $scope.signedInUser.chairs[index];
        $location.url('/chair');
    }
    $scope.chairSelectedFavorite = function (index) {

        $rootScope.currentChair = $scope.signedInUser.favoriteChairs[index];
        $location.url('/chair');
    }

    //User Selected
    $scope.userSelected = function (index) {
        $rootScope.currentUserView = $scope.signedInUser.favoriteUsers[index];
        $location.url('/userView');
    }


});