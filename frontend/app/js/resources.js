angular.module('grouphole')
  .factory('Api', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/api');
    });
  })
  .factory('Auth', function($cookies, Restangular) {
//      $httpProvider.defaults.headers.post['X-CSRFToken'] =
//          $cookies.csrftoken;
    return Restangular.withConfig(function(RestangularConfigurer) {
        console.log($cookies.csrftoken);
        RestangularConfigurer.setDefaultHeaders(
//            {'X-CSRFToken': $cookies.csrftoken}
        );
//        RestangularConfigurer.setBaseUrl('/login');
    }).all('/login');
  });
