app.controller("newsFeedController", function ($scope, $http, $location, $rootScope) {



    $http.get("/user").success(function (response) {

        $scope.users = response;
        $scope.signedInUser = $scope.users[0];
        $scope.chairs = [];

        for (i=0; i< $scope.users.length; i++) {
            for (j = 0; j < $scope.users[i].chairs.length; j++) {
                $scope.chairs.push($scope.users[i].chairs[j]);
            }
        }

    });

    //chair selected
    $scope.chairSelected = function (index) {
        $rootScope.currentChair = $scope.chairs[index];
        $location.url('/chair');
    }


    /////////////////// ADD CHAIR TO FAVORITES
    $scope.selectedFavoriteIndex = -1;
    $scope.favoriteChairPressed = function (index) {
        $scope.selectedFavoriteIndex = index;
        console.log(index);
    }

    $scope.favoriteChair = function () {
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
    }

    $scope.favoriteChairCancelled = function () {
        $scope.selectedFavoriteIndex = -1;
    }


});