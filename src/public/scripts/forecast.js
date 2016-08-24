
var forecast = angular.module('financecaster.forecast', ['ui.router', 'financecaster']);

forecast.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.forecast', {
      url: '/Forecast',
      templateUrl: 'views/main/forecast.html',
      controller: 'forecastController',
      resolve: {
        'myAccounts': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          accounts = Accounts.query(function () {
            defer.resolve(accounts);
          });

          return defer.promise;
        },
        'account': function ($q, $stateParams, Accounts) {
          return {};
        },
      }
    })
    .state('main.viewforecast', {
      url: '/Forecast/:id',
      templateUrl: 'views/main/forecast.view.html',
      controller: 'forecastViewController',
      resolve: {
        'myAccounts': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          accounts = Accounts.query(function () {
            defer.resolve(accounts);
          });

          return defer.promise;
        },
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        },
      }
    });

});

accounts.factory('Forecasts', ['$resource', function($resource) {
  return $resource('/api/accounts/:id/forecast', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

forecast.controller('forecastController', ['$scope', 'myAccounts', 'account', function ($scope, accounts, account) {
  $scope.accounts = accounts;
  $scope.account = account;
}]);

forecast.controller('forecastViewController', ['$scope', 'myAccounts', 'account', 'Forecasts', function ($scope, accounts, account, Forecasts) {
  $scope.accounts = accounts;
  $scope.account = account;

  $scope.forecast = Forecasts.query({id: account.id});

}]);
