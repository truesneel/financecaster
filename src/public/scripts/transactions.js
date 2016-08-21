
var transactions = angular.module('financecaster.transactions', ['ngResource', 'ui.router', 'financecaster']);

transactions.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.transactions', {
      url: '/Transactions',
      templateUrl: 'views/main/transactions.html',
      controller: 'transactionsController',
    });

});

transactions.factory('Transaction', ['$resource', function($resource) {
  return $resource('/api/transactions/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

transactions.controller('transactionsController', ['$scope', '$http', 'financecaster', 'Transaction', function ($scope, $http, financecaster, Transaction) {

  $scope.transactions = Transaction.query();

}]);
