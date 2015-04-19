app.controller("chairController", function ($scope, $http) {



    console.log("in chair controller");

    //just temporarily getting user1
    $http.get("/chair/0").success(function (response) {
        console.log(response);
        $scope.chair = response;
    });


});