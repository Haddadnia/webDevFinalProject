app.controller("userViewController", function ($scope, $http, $rootScope, $location, DatabaseService) {

    DatabaseService.getUser($rootScope.currentUser.userToView, function (user) {
        $scope.user = user;
        createMyChairsTable();
        createFavoriteChairsTable();
        createFavoriteUsersTable();
    });
    
    var createMyChairsTable = function () {
        $scope.chairs = [];
        var chairIDs = $scope.user.chairs;
        for (i = 0; i < chairIDs.length ; i++) {
            DatabaseService.getChair(chairIDs[i], function (chair) {
                $scope.chairs.push(chair);
            });
            /*
            $http.get("/chair/" + chairIDs[i]).success(function (chair) {
                $scope.chairs.push(chair);
            });
            */
        }
    }

    var createFavoriteChairsTable = function () {
        $scope.favoriteChairs = [];
        var favoriteChairIDs = $scope.user.favoriteChairs;
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
        var favoriteUserIDs = $scope.user.favoriteUsers;
        for (i = 0; i < favoriteUserIDs.length ; i++) {
            DatabaseService.getUser(favoriteUserIDs[i], function (chair) {
                $scope.favoriteUsers.push(chair);
            });
            /*
            $http.get("/chair/" + favoriteChairIDs[i]).success(function (chair) {
                $scope.favoriteChairs.push(chair);
            });
            */
        }
    }
    
    /*
    $http.get("/user/" + $rootScope.currentUser.userToView).success(function (user) {
        $scope.user = user;
        createMyChairsTable();
        createFavoriteChairsTable();
    });
    */
    //chair selected
    /*
    $scope.chairSelectedMyChair = function (index) {

        console.log("chair selected");

        $rootScope.currentChair = $scope.user.chairs[index];
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
        $location.url('/chair');
    }

    //User Selected
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

    $scope.favoriteUser = function () {
        $rootScope.currentUser.favoriteUsers.push($scope.user._id);
        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        */
    }
});