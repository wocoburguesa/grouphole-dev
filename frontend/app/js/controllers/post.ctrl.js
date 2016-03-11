angular.module('grouphole').
    controller(
        'PostPageCtrl',
        function ($scope, $cookieStore,
                  utils, Api, Restangular, postInfo, currentUserData) {
            $scope.userData = currentUserData.userData;
            $scope.initialize = function () {
                $scope.post = postInfo.plain();
                $scope.post.readableDate =
                    moment($scope.post.created)
                    .format('MMM D YYYY');
                $scope.loadAuthorInfo();
                $scope.loadComments();
            };

            $scope.loadAuthorInfo = function () {
                Api.one('accounts', $scope.post.author.split('/')[5]).get()
                    .then(function (data) {
                        $scope.author = data.plain();
                    });
            };

            $scope.loadComments = function () {
                Api.one('comments').get({post: $scope.post.id})
                    .then(function (data) {
                        $scope.commentsCount = data.count;
                        $scope.comments = data.results;
                    });
            };

            $scope.postComment = function () {
                Api.one('comments/').customPOST(
                    {
                        user: $scope.userData.id,
                        post: $scope.post.id,
                        comment: $scope.newComment
                    },
                    undefined,
                    undefined,
                    {'X-CSRFToken': utils.getCookie('csrftoken')}
                ).then(function (response) {
                    console.log(response);
                });
            };

            $scope.initialize();
        });
