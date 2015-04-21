app.controller("chairController", function ($scope, $http, $rootScope, $location, DatabaseService) {

    DatabaseService.getChair($rootScope.currentUser.chairToView, function (chair) {
        $scope.chair = chair;
        createCommentTable();
    });

    var createCommentTable = function () {
        var commentIDs = $scope.chair.comments;
        $scope.comments = [];
        for (i = 0; i < commentIDs.length; i++) {
            DatabaseService.getComment(commentIDs[i], function (comment) {
                $scope.comments.push(comment);
            });
            /*
            $http.get("/comment/" + commentIDs[i]).success(function (comment) {
                $scope.comments.push(comment);
                $http.get("/user/" + comment.user).success(function (user) {
                    $scope.users.push(user);
                });
            });
            */
        }
    }

    /*
    var createFavoriteUserPanel = function () {
        var userIDs = $scope.chair.usersWhoFavorited;
        $scope.favoriteUsers = [];
        for (i = 0; i < userIDs.length; i++) {
            $http.get("/user/" + userIDs[i]).success(function (user) {
                $scope.favoriteUsers.push(user);
            });
        }
    }

    $http.get("/chair/" + $rootScope.currentUser.chairToView).success(function (chair) {
        $scope.chair = chair;
        createCommentTable();
    });
    */
    
    
    
    $scope.userSelected = function (comment) {
        $rootScope.currentUser.userToView = comment.userID;
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

    $scope.submitComment = function (text) {
        var comment = {
            text: text,
            username: $rootScope.currentUser.username,
            userID: $rootScope.currentUser._id
        };

        DatabaseService.addComment(comment, function (comment) {
            $scope.chair.comments.push(comment._id);
            DatabaseService.updateChair($scope.chair, function (chair) {
                createCommentTable();
            });
        });
        /*
        $http.post("/comment", comment).success(function (comment) {
            console.log(comment._id)
            var chair = $scope.chair;
            $scope.chair.comments.push(comment._id);
            $http.put('/updateChair/' + $scope.chair._id, $scope.chair).success(function (chair) {
                createCommentTable();
            });
        });
        */
    }

    $scope.admin = "admin";
    var selectedDeleteComment = null;
    $scope.deleteCommentPressed = function (comment) {
        selectedDeleteComment = comment;
    }

    $scope.removeComment = function () {
        if (selectedDeleteComment != null) {
            var index = $scope.chair.comments.indexOf(selectedDeleteComment._id);
            $scope.chair.comments.splice(index, 1);
            DatabaseService.updateChair($scope.chair, function (chair) {

            });
            DatabaseService.deleteComment(selectedDeleteComment._id, function (response) {

            });
            /*
            $http.put("/updateChair/" + $scope.chair._id, $scope.chair).success(function (chair) {
                
            });

            $http.delete("/comment/" + selectedDeleteComment._id).success(function (response) {
                
            });
            */
        }
        selectedDeleteComment = null;
        createCommentTable();
    }

    $scope.removeCommentCancelled = function () {
        selectedDeleteComment = null;
    }

    $scope.favoriteChair = function () {
        $rootScope.currentUser.favoriteChairs.push($scope.chair._id);
        DatabaseService.updateUser($rootScope.currentUser, function (user) {
            $rootScope.currentUser = user;
        });
        /*
        $http.put('/updateUser/' + $rootScope.currentUser._id, $rootScope.currentUser).success(function (user) {
            $rootScope.currentUser = user;
        });
        $http.put('/updateChair/' + $scope.chair._id, $scope.chair).success(function (user) {
            createFavoriteUserPanel();
        });
        */
    }
});