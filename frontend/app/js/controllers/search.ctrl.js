angular.module('grouphole').
    controller('SearchPageCtrl', function ($scope, Restangular) {
        $scope.userInfo = {
            username: 'ettamartinez34',
            fullName: 'Etta Martinez',
            thumbnail: 'https://media.creativemornings.com/uploads/user/avatar/42156/profile_pict_001_circle.png',
            memberSince: 'Feb 2014'
        };
    });
