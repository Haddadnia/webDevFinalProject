var app = angular.module("newsFeed", [])


app.controller("newsFeedController", function ($scope, $http) {


    $http.get("/user").success(function (response) {

        console.log(response);

        $scope.users = response;
        $scope.signedInUser = $scope.users[0];

        $scope.chairs = [];



        console.log($scope.users.length);
        for (i=0; i< $scope.users.length; i++) {
            
            console.log($scope.users[i]);
            console.log($scope.users[i].chairs.length);
            for (j = 0; j < $scope.users[i].chairs.length; j++) {
                
                console.log($scope.users[i].chairs[j]);
                $scope.chairs.push($scope.users[i].chairs[j]);
                console.log($scope.chairs);
            }
        }
        console.log($scope.chairs);
    });




});