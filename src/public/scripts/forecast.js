
var forecast = angular.module('financecaster.forecast', ['ui.router', 'financecaster']);

forecast.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.forecast', {
      url: '/Forecast',
      templateUrl: 'views/main/forecast.html',
    });

});
