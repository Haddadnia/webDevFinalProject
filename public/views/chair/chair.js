app.controller("chairController", function ($scope, $http, $rootScope, $location) {
    $scope.currentUser = $rootScope.currentUser;
    $scope.chair = $rootScope.currentChair;
    $scope.comments = [];
    $scope.users = [];
    $scope.numArray = [];
    var commentIDs = $scope.chair.comments;

    for (i = 0; i < commentIDs.length; i++)
    {
        $http.get("/comment/" + commentIDs[i]).success(function (comment) {
            console.log(comment);
            $scope.comments.push(comment);
            $http.get("/user/" + comment.user).success(function (user) {
                console.log(user);
                $scope.users.push(user);
            });
            $scope.numArray.push(i);
            $scope.numArray.push(i+1);
        });
    }

    $scope.userSelected = function (index) {
        $rootScope.currentUserView = $scope.users[index];
        $location.url('/userView');
    }

    $scope.submitComment = function (text) {
        var comment = {
            text: text,
            user: $scope.currentUser._id
        };
        $http.post("/comment", comment).success(function (comment) {
            console.log(comment._id)
            var chair = $scope.chair;
            chair.comments.push(comment._id);
            $http.put('/updateChair/' + chair._id, chair).success(function (chair) {
                $rootScope.currentChair = chair;
            });
        });
    }
});