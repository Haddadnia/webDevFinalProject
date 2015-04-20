app.controller("userViewController", function ($scope, $http, $rootScope, $location) {

    console.log("in user viewww");
    $scope.user = $rootScope.currentUserView;
    console.log($scope.user);


    //chair selected
    $scope.chairSelectedMyChair = function (index) {

        console.log("chair selected");

        $rootScope.currentChair = $scope.user.chairs[index];
        $location.url('/chair');
    }
    $scope.chairSelectedFavorite = function (index) {

        console.log("chair selected fav");

        $rootScope.currentChair = $scope.user.favoriteChairs[index];
        $location.url('/chair');
    }

    //User Selected
    $scope.userSelected = function (index) {
        $rootScope.currentUserView = $scope.user.favoriteUsers[index];
        $scope.user = $rootScope.currentUserView;
        //TODO make it go to a different user view
        //$location.url('/userView');
    }
});