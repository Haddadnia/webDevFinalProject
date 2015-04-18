var app = angular.module("favorites", [])


app.controller("favoritesController", function ($scope, $http) {

    $http.get("/chair").success(function (response) {
        console.log("test");
        $scope.chairs = response;
    });
    $http.get("/user").success(function (response) {
        $scope.users = response;
    });

    //just temporarily getting user1
    $http.get("/user/0").success(function (response) {
        $scope.signedInUser = response;
        $scope.favoriteChairs = response.favoriteChairs;
        $scope.favoriteUsers = response.favoriteUsers;
    });

    $('#deleteConfirmModalChair').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
        var index = button.data('index');
        modal.find('#deleteIndexChair').attr('index', index);
    });

    $scope.removeChair = function () {
        var index = $('#deleteIndexChair').attr('index')
        $http.delete("/chair/" + index)
        .success(function (response) {
            $scope.favoriteChairs = response;
        });
    }

    $('#deleteConfirmModalUser').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
        var index = button.data('index');
        modal.find('#deleteIndexUser').attr('index', index);
    });

    $scope.removeUser = function () {
        var index = $('#deleteIndexUser').attr('index')
        $http.delete("/user/" + index)
        .success(function (response) {
            $scope.favoriteUsers = response;
        });
    }




});