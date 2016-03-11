angular.module('grouphole').
    controller('HomePageCtrl', function ($scope, $state, Api, currentUserData) {
        'use strict';
        $scope.$on('user:successfully-logged-in', function (e, data) {
            $scope.user = currentUserData.userData;
            $scope.loadSchemes();
        });

        $scope.initialize = function () {
            $scope.loadSchemes();
        };

        $scope.loadSchemes = function () {
            Api.one('posts').get().
                then(function (data) {
                    $scope.posts = data.results;
                    console.log(data);
                });
        };

        $scope.goToPost = function (post) {
            $state.go('post', { postId: post.id }, { reload: true });
        };

        $scope.upvote = function (post) {
            Api.one('posts', post.id).customPOST(
                {up: true},
                'upvote/',
                undefined,
                {'X-CSRFToken': document.cookie.split('=')[1]}
            ).then(function (response) {
                console.log(response);
            });
        };

        $scope.initialize();
    });

