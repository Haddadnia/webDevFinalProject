app.controller("searchCtrl", function ($scope, $http, $location, $rootScope, DatabaseService) {

    DatabaseService.searchUsers($rootScope.currentUser.searchText, function (users) {
        $scope.users = users;
    });

    
    DatabaseService.searchChairs($rootScope.currentUser.searchText, function (chairs) {
        $scope.chairs = chairs;
    });

    $scope.navigateToChair = function (chair) {
        $rootScope.currentUser.chairToView = chair._id;

        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });

        $location.url('/chair');
    }

    $scope.navigateToUser = function (user) {
        $rootScope.currentUser.chairToView = user._id;

        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });

        $location.url('/userView');
    }
});