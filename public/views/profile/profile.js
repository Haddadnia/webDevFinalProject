app.controller("profileController", function ($scope, $http, $rootScope, $location, DatabaseService) {
    //$scope.signedInUser = $rootScope.currentUser;
    
    var createMyChairsTable = function () {
        $scope.myChairs = [];
        var myChairIDs = $rootScope.currentUser.chairs;
        for (i = 0; i < myChairIDs.length ; i++) {
            DatabaseService.getChair(myChairIDs[i], function (chair) {
                $scope.myChairs.push(chair);
            });
            /*
            $http.get("/chair/" + favoriteChairIDs[i]).success(function (chair) {
                $scope.favoriteChairs.push(chair);
            });
            */
        }
    }

    var createFavoriteChairsTable = function () {
        $scope.favoriteChairs = [];
        var favoriteChairIDs = $rootScope.currentUser.favoriteChairs;
        for (i = 0; i < favoriteChairIDs.length ; i++) {
            DatabaseService.getChair(favoriteChairIDs[i], function (chair) {
                $scope.favoriteChairs.push(chair);
            });
            /*
            $http.get("/chair/" + favoriteChairIDs[i]).success(function (chair) {
                $scope.favoriteChairs.push(chair);
            });
            */
        }
    }

    var createFavoriteUsersTable = function () {
        $scope.favoriteUsers = [];
        var favoriteUserIDs = $rootScope.currentUser.favoriteUsers;
        for (i = 0; i < favoriteUserIDs.length ; i++) {
            DatabaseService.getUser(favoriteUserIDs[i], function (chair) {
                $scope.favoriteUsers.push(chair);
            });
            /*
            $http.get("/user/" + favoriteUserIDs[i]).success(function (user) {
                $scope.favoriteUsers.push(user);
            });
            */
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
        $rootScope.currentUser.firstName = tempUser.firstName;
        $rootScope.currentUser.lastName = tempUser.lastName;
        $rootScope.currentUser.email = tempUser.email;
        $rootScope.currentUser.password = tempUser.password;

        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put("/updateUser/" + $rootScope.currentUser._id, tempUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        */
   
    }

///////// REMOVE MY CHAIR
    
    var selectedDeleteChair = null;
    $scope.deleteChairPressed = function (chair) {
        selectedDeleteChair = chair;
    }
    
    $scope.removeChair = function () {
        if (selectedDeleteChair != null) {
            var index = $rootScope.currentUser.chairs.indexOf(selectedDeleteChair._id);
            $rootScope.currentUser.chairs.splice(index, 1);
            DatabaseService.updateUser($rootScope.currentUser, function (user) {
                $rootScope.currentUser = user;
                createMyChairsTable();
            });
            DatabaseService.deleteChair(selectedDeleteChair._id, function (response) {
                
            });
            /*
            $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
            });
            */
            /*
            $http.delete("/chair/" + selectedDeleteChair._id).success(function (response) {
                console.log(response);
            });
            */
        }
        selectedDeleteChair = null;
    }

    $scope.removeChairCancelled = function () {
        selectedDeleteChair = null;
    }
////////////////////////////    Favorites stuff

    /////////// REMOVE CHAIR FAVORITE
    
    var selectedDeleteFavoriteChair = null;
    $scope.deleteChairFavoritePressed = function (favChair) {
        selectedDeleteFavoriteChair = favChair;
    }
    
    $scope.removeChairFavorite = function () {
        if (selectedDeleteFavoriteChair != null) {
            var index = $rootScope.currentUser.favoriteChairs.indexOf(selectedDeleteFavoriteChair._id);
            $rootScope.currentUser.favoriteChairs.splice(index, 1);
            DatabaseService.updateUser($rootScope.currentUser, function (user) {
                $rootScope.currentUser = user;
                createFavoriteChairsTable();
            });
            /*
            $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
            });
            */
        }
        selectedDeleteFavoriteChair = null;
    }

    $scope.removeChairFavoriteCancelled = function () {
        selectedDeleteFavoriteChair = null
    }
    
////////////////REMOVE USER FAVORITE
    
    var selectedDeleteUser = null;
    $scope.deleteUserPressed = function (user) {
        selectedDeleteUser = user;
    }

    $scope.removeUser = function () {
        if (selectedDeleteUser != null) {
            var index = $rootScope.currentUser.favoriteUsers.indexOf(selectedDeleteUser._id);
            $rootScope.currentUser.favoriteUsers.splice(index, 1);
            DatabaseService.updateUser($rootScope.currentUser, function (user) {
                $rootScope.currentUser = user;
                createFavoriteUsersTable();
            });
            /*
            $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
            });
            */
        }
        selectedDeleteUser = null;
    }

    $scope.removeUserCancelled = function () {
        selectedDeleteUser = null;
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

        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        */
        //console.log($window.sessionStorage.chairToView);
        $location.url('/chair');
    }
    /////////User Selected
    $scope.userSelected = function (user) {
        $rootScope.currentUser.userToView = user._id;
        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        */
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
        DatabaseService.updateChair(tempChair,function (chair) {
            createMyChairsTable();
            createFavoriteChairsTable();
            $scope.tempChair = null;
        });
        /*
        $http.put("/updateChair/" + tempChair._id, tempChair).success(function (chair) {
            createMyChairsTable();
            $scope.tempChair = null;
        });
        */
    }

    $scope.Add = "Add";
    $scope.Edit = "Edit";
    $scope.admin = "admin";
    $scope.addChairClicked = function () {
        $scope.chairModalMode = "Add";
    };

    $scope.addChair = function (chair) {
        DatabaseService.addChair(chair, function (chair) {
            $rootScope.currentUser.chairs.push(chair._id);
            //$rootScope.currentUser.chairs.push(chair._id);
            /*
            $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
                createMyChairsTable();
                $scope.tempChair = null;
            });
            */
            DatabaseService.updateUser($rootScope.currentUser, function (user) {
                $rootScope.currentUser = user;
                createMyChairsTable();
                $scope.tempChair = null;
            });
        });
        /*
        $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
            createMyChairsTable();
            $scope.tempChair = null;
        });
        */
        /*
        $http.post("/chair", chair).success(function (chair) {
            $rootScope.currentUser.chairs.push(chair._id);
            $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
                $rootScope.currentUser = user;
                createMyChairsTable();
                $scope.tempChair = null;
            });
        });
        */
    };


});