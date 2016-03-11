angular.module('grouphole')
    .service('currentUserData', function (Api) {
        var self = this;
        this.setUserData = function (data) {
            self.userData = data;
            self.userData.anonymous = false;
        };
        this.setAnonymous = function () {
            self.userData = {
                anonymous: true
            };
        };
        this.requestMeData = function () {
            return Api.one('me').get();
        };
    })
    .factory('utils', function () {
        return {
            getCookie: function (name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        };
    });
