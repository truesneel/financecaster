
var welcome = angular.module('financecaster.welcome', ['ui.router', 'financecaster']);

welcome.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('welcome', {
      url: '/Welcome',
      templateUrl: 'views/welcome.html',
      controller: 'welcomeController',
    });

});

welcome.controller('welcomeController', ['$scope', '$state', '$http', 'financecaster', function ($scope, $state, $http, financecaster) {
  financecaster.set_root($scope);
  $scope.messages = $scope.messages || [];
  $scope.username = '';
  $scope.password = '';

  $scope.login = function () {

    financecaster.login($scope.username, $scope.password).then(function () {
      $state.go('main.forecast');
    }, function (err) {
      financecaster.message('Login Failed', 'error');
    });

  };

}]);
