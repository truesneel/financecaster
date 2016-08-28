
var settings = angular.module('financecaster.settings', ['ui.router', 'financecaster']);

settings.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.settings', {
      url: '/Settings',
      templateUrl: 'views/main/settings.html',
      controller: 'settingsController',
    });

});

settings.factory('Tokens', ['$resource', function($resource) {
  return $resource('/api/auth/tokens/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

settings.controller('settingsController', ['$scope', '$state', '$timeout', 'financecaster', 'Tokens', function ($scope, $state, $timeout, financecaster, Tokens) {

  $scope.loading = false;
  $scope.tokens = [];
  $scope.config = financecaster.config;

  $scope.load_tokens = function () {
    $scope.loading = true;
    $scope.forecast = [];

    Tokens.query(function (result) {
      $scope.tokens = result;

      $scope.loading = false;
    });
  };

  $scope.delete_token = function (record) {
    record.$delete(function (result) {
      $scope.load_tokens();
    });
  };

  $timeout($scope.load_tokens, 500);

  $scope.logout = function () {

    financecaster.logout().then(function () {
      $state.go('welcome');
    }, function () {
      $state.go('welcome');
    });

  };

}]);
