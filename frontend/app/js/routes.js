angular.module('grouphole')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                controller: 'HomePageCtrl',
                templateUrl: "app/js/partials/home.html"
            })
            .state('profile', {
                url: "/profile",
                controller: 'ProfilePageCtrl',
                templateUrl: "app/js/partials/profile.html"
            })
            .state('search', {
                url: "/search",
                controller: 'SearchPageCtrl',
                templateUrl: "app/js/partials/search.html"
            })
            .state('post', {
                url: "/posts/:postId",
                controller: 'PostPageCtrl',
                templateUrl: "app/js/partials/post.html",
                resolve: {
                    postInfo: function (Api, $stateParams) {
                        return Api.one('posts', $stateParams.postId).get();
                    }
                }
            })
            .state('upload', {
                url: "/upload",
                controller: 'UploadPageCtrl',
                templateUrl: "app/js/partials/upload.html",
                resolve: {
                    userData: function (currentUserData) {
                        return currentUserData.requestMeData();
                    }
                }
            });
    });
