app.controller("profileController", function ($scope, $http, $rootScope, $location) {
    
    $scope.signedInUser = $rootScope.currentUser;

    /*
    $http.get("/user/" + $rootScope.currentUser._id).success(function (response) {
        $scope.signedInUser = response;
    });
    */

    console.log($rootScope.currentUser);
    console.log($scope.signedInUser.favoriteChairs);
    

    updateTables = function () {
        $scope.signedInUser = $rootScope.currentUser;
        $scope.chairs = [];
        $scope.favoriteUsers = [];
        $scope.favoriteChairs = [];
        //get my chairs, fav chairs, and fav users
        if ($scope.signedInUser.chairs) {
            for (i = 0; i < $scope.signedInUser.chairs.length ; i++) {
                $http.get("/chair/" + $scope.signedInUser.chairs[i]).success(function (response) {
                    $scope.chairs.push(response);
                });
            }

        }
        if ($scope.signedInUser.favoriteChairs) {
            for (i = 0; i < $scope.signedInUser.favoriteChairs.length; i++) {
                $http.get("/chair/" + $scope.signedInUser.favoriteChairs[i]).success(function (response) {
                    $scope.favoriteChairs.push(response);
                });
            }
        }

        if ($scope.signedInUser.favoriteUsers) {
            for (i = 0; i < $scope.signedInUser.favoriteUsers.length; i++) {
                $http.get("/user/" + $scope.signedInUser.favoriteUsers[i]).success(function (response) {
                    $scope.favoriteUsers.push(response);
                });
            }
        }
    }

    updateTables();

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
        $http.put("/updateUser/" + signedInUser._id, $scope.signedInUser)
            .success(function (response) {
                $rootScope.currentUser = response;
            });
            $scope.selectedIndex = null;
            $scope.activeCourseCopy = null;

            updateTables();
    }

///////// REMOVE MY CHAIR
    $scope.selectedDeleteIndex = -1;
    $scope.deleteChairPressed = function (index) {
        console.log(index);
        $scope.selectedDeleteIndex = index;
    }

    $scope.removeChair = function () {

        $scope.signedInUser.chairs.splice($scope.selectedDeleteIndex, 1);
        if ($scope.selectedDeleteIndex != -1) {
            $http.put("/updateUser/" + $scope.signedInUser._id, $scope.signedInUser).success(function (response) {
                console.log(response);
                $routeScope.currentUser = response;
            });
        }
        $scope.selectedDeleteIndex = -1;
        updateTables();
    }

    $scope.removeChairCancelled = function () {
        $scope.selectedDeleteIndex = -1;
        console.log($scope.selectedDeleteIndex);
    }


////////////////////////////    Favorites stuff

/////////// REMOVE CHAIR FAVORITE
    $scope.selectedDeleteIndexFavoriteChair = -1;
    $scope.deleteChairFavoritePressed = function (index) {
        console.log(index);
        $scope.selectedDeleteIndexFavoriteChair = index;
    }

    $scope.removeChairFavorite = function () {

        $scope.signedInUser.favoriteChairs.splice($scope.selectedDeleteIndexFavoriteChair, 1);
        //TODO acgually update correct signed in user

        console.log($scope.signedInUser.favoriteChairs);
        if ($scope.selectedDeleteIndexFavoriteChair != -1) {
            $http.put("/updateUser/" + $scope.signedInUser._id, $scope.signedInUser).success(function (response) {

                $rootScope.currentUser = response;
                console.log($rootScope.currentUser);
            });
        }
        $scope.selectedDeleteIndexFavoriteChair = -1;
        updateTables();
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
        $scope.signedInUser.favoriteUsers.splice($scope.selectedDeleteIndexUser, 1);
        if ($scope.selectedDeleteIndexUser != -1) {
            $http.put("/updateUser/" + $scope.signedInUser._id, $scope.signedInUser).success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;
            });
        }
        $scope.selectedDeleteIndexUser = -1;
        updateTables();
    }

    $scope.removeUserCancelled = function () {
        $scope.selectedDeleteIndexUser = -1;
        console.log($scope.selectedDeleteIndexUser);
    }


///////////chair selected
    $scope.chairSelectedMyChair = function (index) {
        $rootScope.currentChair = $scope.signedInUser.chairs[index];
        $location.url('/chair');
    }
    $scope.chairSelectedFavorite = function (index) {
        $rootScope.currentChair = $scope.signedInUser.favoriteChairs[index];
        $location.url('/chair');
    }

/////////User Selected
    $scope.userSelected = function (index) {
        $rootScope.currentUserView = $scope.signedInUser.favoriteUsers[index];
        $location.url('/userView');
    }

////////// EDITING A CHAIR
    $scope.editChairIndex = -1;
    $scope.editChairPressed = function (index) {

        $scope.editChairIndex = index;

        $scope.activeChairCopy = {
            name: $scope.signedInUser.chairs[index].name,
            description: $scope.signedInUser.chairs[index].description,
            pic: "pic"
        };
        $scope.updatedChair = {
            name: $scope.signedInUser.chairs[index].name,
            description: $scope.signedInUser.chairs[index].description
        }
    }


    $scope.editChairCancelled = function () {
        $scope.activeChairCopy = null;
        $scope.updatedChair = null;
        $scope.editChairIndex = -1;
    }

    $scope.updateChair = function (updatedChair) {
        $scope.signedInUser.chairs[$scope.editChairIndex] = updatedChair;
        $scope.signedInUser.chairs[$scope.editChairIndex].picture = "pic";

        $http.put("/updateUser/" + $scope.signedInUser._id, $scope.signedInUser)
        .success(function (response) {
            $rootScope.currentUser = response;
        });
        $scope.activeChairCopy = null;
        $scope.updatedChair = null;
        $scope.editChairIndex = -1;
    }

});