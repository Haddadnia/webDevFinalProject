app.controller("profileController", function ($scope, $http, $rootScope, $location, $window) {
    //$scope.signedInUser = $rootScope.currentUser;

    var createMyChairsTable = function () {
        $scope.chairs = [];
        var chairIDs = $rootScope.currentUser.chairs;
        for (i = 0; i < chairIDs.length ; i++) {
            $http.get("/chair/" + chairIDs[i]).success(function (chair) {
                $scope.chairs.push(chair);
            });
        }
    }

    var createFavoriteChairsTable = function () {
        $scope.favoriteChairs = [];
        var favoriteChairIDs = $rootScope.currentUser.favoriteChairs;
        for (i = 0; i < favoriteChairIDs.length ; i++) {
            $http.get("/chair/" + favoriteChairIDs[i]).success(function (chair) {
                $scope.favoriteChairs.push(chair);
            });
        }
    }

    var createFavoriteUsersTable = function () {
        $scope.favoriteUsers = [];
        var favoriteUserIDs = $rootScope.currentUser.favoriteUsers;
        for (i = 0; i < favoriteUserIDs.length ; i++) {
            $http.get("/user/" + favoriteUserIDs[i]).success(function (user) {
                $scope.favoriteUsers.push(user);
            });
        }
    }

    createMyChairsTable();
    createFavoriteChairsTable();
    createFavoriteUsersTable();

    $scope.editProfile = function () {

        $scope.tempUser = {
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            email: $rootScope.currentUser.email,
            password: $rootScope.currentUser.password
        };
    }

    /*
    $scope.editUserCancelled = function () {
        $scope.signedInUser = $scope.activeUserCopy;
        $scope.activeCourseCopy = null;
    }
    */
    $scope.updateUser = function (tempUser) {


        $http.put("/updateUser/" + $rootScope.currentUser._id, tempUser).success(function (user) {
            $rootScope.currentUser = user;
        });
   
    }

///////// REMOVE MY CHAIR
    
    var selectedDeleteIndex = -1;
    var selectedDeleteChair = null;
    $scope.deleteChairPressed = function (index, chair) {
        console.log(index);
        selectedDeleteIndex = index;
        selectedDeleteChair = chair;
    }
    
    $scope.removeChair = function () {
        if (selectedDeleteIndex != -1) {
            $rootScope.currentUser.chairs.splice($scope.selectedDeleteIndex, 1);

            $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                console.log(user);
                $rootScope.currentUser = user;
            });

            $http.delete("/chair/" + selectedDeleteChair._id).success(function (response) {
                console.log(response);
            });
        }
        selectedDeleteIndex = -1;
        selectedDeleteChair = null;
        createMyChairsTable();
    }

    $scope.removeChairCancelled = function () {
        selectedDeleteIndex = -1;
        selectedDeleteChair = null;
    }
////////////////////////////    Favorites stuff

    /////////// REMOVE CHAIR FAVORITE
    
    var selectedDeleteIndexFavoriteChair = -1;
    $scope.deleteChairFavoritePressed = function (index) {
        selectedDeleteIndexFavoriteChair = index;
    }
    
    $scope.removeChairFavorite = function () {
        if (selectedDeleteIndexFavoriteChair != -1) {
            $rootScope.currentUser.favoriteChairs.splice(selectedDeleteIndexFavoriteChair, 1);
                    
            $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
            });
        }
        selectedDeleteIndexFavoriteChair = -1;
        createFavoriteChairsTable();
    }

    $scope.removeChairFavoriteCancelled = function () {
        selectedDeleteIndexFavoriteChair = -1;
    }
    
////////////////REMOVE USER FAVORITE
    
    var selectedDeleteIndexUser = -1;
    $scope.deleteUserPressed = function (index) {
        selectedDeleteIndexUser = index;
    }

    $scope.removeUser = function () {
        if (selectedDeleteIndexUser != -1) {
            $rootScope.currentUser.favoriteUsers.splice(selectedDeleteIndexUser, 1);
        
            $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
            });
        }
        $scope.selectedDeleteIndexUser = -1;
        createFavoriteUsersTable();
    }

    $scope.removeUserCancelled = function () {
        $scope.selectedDeleteIndexUser = -1;
        console.log($scope.selectedDeleteIndexUser);
    }
    ///////////chair selected
    /*
    $scope.chairSelectedMyChair = function (index) {
        $rootScope.currentChair = $scope.signedInUser.chairs[index];
        $location.url('/chair');
    }
    $scope.chairSelectedFavorite = function (index) {
        $rootScope.currentChair = $scope.signedInUser.favoriteChairs[index];
        $location.url('/chair');
    }
    */
    $scope.navigateToChair = function (chair) {
        $rootScope.currentUser.chairToView = chair._id;
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        //console.log($window.sessionStorage.chairToView);
        $location.url('/chair');
    }
    /////////User Selected
    $scope.userSelected = function (user) {
        $rootScope.currentUser.userToView = user._id;
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        $location.url('/userView');
    }
    ////////// EDITING A CHAIR
    
    //$scope.editChairIndex = -1;
    //$scope.editChairPressed = function (index) {
    $scope.editChairPressed = function (chair) {
        //$scope.editChairIndex = index;
        $scope.chairModalMode = "Edit";

        $scope.tempChair = {
            _id: chair._id,
            name: chair.name,
            description: chair.description,
            image: chair.image
        };
        /*
        $scope.activeChairCopy = {
            name: $scope.signedInUser.chairs[index].name,
            description: $scope.signedInUser.chairs[index].description,
            pic: "pic"
        };
        $scope.updatedChair = {
            name: $scope.signedInUser.chairs[index].name,
            description: $scope.signedInUser.chairs[index].description
        }
        */
    }

    $scope.editChairCancelled = function () {
        $scope.tempChair = null;
    }

    $scope.updateChair = function (tempChair) {
        console.log(tempChair);
        /*
        $scope.signedInUser.chairs[$scope.editChairIndex] = updatedChair;
        $scope.signedInUser.chairs[$scope.editChairIndex].picture = "pic";

        $http.put("/updateUser/" + $scope.signedInUser._id, $scope.signedInUser)
        .success(function (response) {
            $rootScope.currentUser = response;
        });
        $scope.activeChairCopy = null;
        $scope.updatedChair = null;
        $scope.editChairIndex = -1;
        */
        
        $http.put("/updateChair/" + tempChair._id, tempChair).success(function (chair) {
            createMyChairsTable();
            $scope.tempChair = null;
        });
    }

    $scope.Add = "Add";
    $scope.Edit = "Edit";
    $scope.admin = "admin";
    $scope.addChairClicked = function () {
        $scope.chairModalMode = "Add";
    };

    $scope.addChair = function (chair) {
        console.log(chair);


        chair._id = "551235552262";
        $rootScope.currentUser.chairs.push(chair._id);

        $http.post("/chair", chair).success(function (chair) {
            console.log(chair._id);
            console.log($rootScope.currentUser);



        });

        $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {

            $rootScope.currentUser = user;
            createMyChairsTable();
            $scope.tempChair = null;
        });


    };

});