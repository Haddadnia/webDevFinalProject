app.controller("chairController", function ($scope, $http, $rootScope, $location) {

    $http.get("/syncRequest").success(function (response) {
        
    });

    var createCommentTable = function () {
        var commentIDs = $scope.chair.comments;
        $scope.comments = [];
        $scope.users = [];
        $scope.numArray = [];
        for (i = 0; i < commentIDs.length; i++) {
            console.log(i);
            $scope.numArray.push(i);
        }
        for (i = 0; i < commentIDs.length; i++) {
            $http.get("/comment/" + commentIDs[i]).success(function (comment) {
                $scope.comments.push(comment);
                $http.get("/user/" + comment.user).success(function (user) {
                    $scope.users.push(user);
                });
            });
        }
    }

    $http.get("/chair/" + $rootScope.currentUser.chairToView).success(function (chair) {
        $scope.chair = chair;
        createCommentTable();
    });
    
    
    
    
    $scope.userSelected = function (user) {
        $rootScope.currentUser.userToView = user._id;
        $http.put("/updateUser/" + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
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
            $scope.chair.comments.push(comment._id);
            $http.put('/updateChair/' + $scope.chair._id, $scope.chair).success(function (chair) {
                createCommentTable();
            });
        });
    }

    $scope.admin = "admin";
    var selectedDeleteIndex = -1;
    var selectedDeleteComment = null;
    $scope.deleteCommentPressed = function (index, comment) {
        console.log(index);
        selectedDeleteIndex = index;
        selectedDeleteComment = comment;
    }

    $scope.removeComment = function () {
        if (selectedDeleteIndex != -1) {
            $scope.chair.comments.splice($scope.selectedDeleteIndex, 1);

            $http.put("/updateChair/" + $scope.chair._id, $scope.chair).success(function (chair) {
                
            });

            $http.delete("/comment/" + selectedDeleteComment._id).success(function (response) {
                
            });
        }
        selectedDeleteIndex = -1;
        selectedDeleteComment = null;
        createCommentTable();
    }

    $scope.removeCommentCancelled = function () {
        selectedDeleteIndex = -1;
        selectedDeleteComment = null;
    }
});