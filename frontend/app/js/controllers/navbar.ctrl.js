angular.module('grouphole').
    controller(
        'NavbarCtrl',
        function ($scope, $uibModal, $state,
                  Urls, Api, currentUserData) {
            $scope.initialize = function () {
                $scope.loadMeData();
            };

            $scope.loadMeData = function () {
                Api.one('me').get()
                    .then(function (data) {
                        currentUserData.setUserData(data);
                        $scope.user = currentUserData.userData;
                    }, function (error) {
                        currentUserData.setAnonymous();
                        $scope.user = currentUserData.userData;
                    });
            };

            $scope.goToCreateForm = function () {
                $state.go('upload', {}, { reload: true });
            };

            $scope.openLoginModal = function () {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/js/partials/login.modal.html',
                    controller: 'LoginModalCtrl',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    $scope.user = result;
                    $scope.$broadcast('user:successfully-logged-in');
                }, function () {
                });
            };

            $scope.initialize();
        }
    )
    .controller('LoginModalCtrl',
                function ($scope, $http, $cookies, $uibModalInstance,
                          Auth, utils, currentUserData) {
        $scope.userData = {};
        $scope.submitLogin = function () {
            Auth.customPOST(
                $scope.userData,
                undefined,
                undefined,
                {'X-CSRFToken': utils.getCookie('csrftoken')}
            ).then(function (response) {
                currentUserData.setUserData(response);
                $uibModalInstance.close(response);
            }, function (error) {
                // error handling
                console.log(error);
            });
        };
    });
