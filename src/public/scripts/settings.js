
var settings = angular.module('financecaster.settings', ['ui.router', 'financecaster']);

settings.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.settings', {
      url: '/Settings',
      templateUrl: 'views/main/settings.html',
      controller: 'settingsController',
    });

});

accounts.controller('settingsController', ['$scope', '$state', 'financecaster', function ($scope, $state, financecaster) {

  $scope.logout = function () {

    financecaster.logout().then(function () {
      $state.go('welcome');
    });

  };

}]);
