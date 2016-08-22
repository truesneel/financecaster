
var transactions = angular.module('financecaster.transactions', ['ngResource', 'ui.router', 'financecaster']);

transactions.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.transactions', {
      url: '/Transactions',
      templateUrl: 'views/main/transactions.html',
      controller: 'transactionsController',
    })
    .state('main.addtransactions', {
      url: '/Transactions/Add',
      templateUrl: 'views/main/transactions.add.html',
      controller: 'transactionsAddController',
      resolve: {
        'myAccounts': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          accounts = Accounts.query(function () {
            defer.resolve(accounts);
          });

          return defer.promise;
        },
      }
    })
    .state('main.edittransactions', {
      url: '/Transactions/:id',
      templateUrl: 'views/main/transactions.edit.html',
      controller: 'transactionsEditController',
      resolve: {
        'transaction': function ($q, $stateParams, Transactions) {
          var account,
            defer = $q.defer();

          account = Transactions.get({ id: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        },
        'myAccounts': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          accounts = Accounts.query(function () {
            defer.resolve(accounts);
          });

          return defer.promise;
        },
      }
    });

});

transactions.factory('Transactions', ['$resource', function($resource) {
  return $resource('/api/transactions/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

transactions.controller('transactionsController', ['$scope', '$http', 'financecaster', 'Transactions', function ($scope, $http, financecaster, Transactions) {

  $scope.transactions = Transactions.query();

}]);

transactions.controller('transactionsAddController', ['$scope', '$http', 'financecaster', 'Transactions', 'myAccounts', function ($scope, $http, financecaster, Transactions, accounts) {

  $scope.response;
  $scope.transaction = new Transactions();
  $scope.accounts = accounts;

  $scope.save = function (form) {
    $scope.transaction.$save().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      $scope.response = response
    }, function (err) {
      $scope.response = err.data;
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  }
}]);

transactions.controller('transactionsEditController', ['$scope', '$state', '$http', 'financecaster', 'transaction', 'myAccounts', function ($scope, $state, $http, financecaster, transaction, accounts) {

  $scope.response;
  $scope.transaction = transaction;
  $scope.accounts = accounts;

  $scope.delete = function (form ) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      $scope.transaction.$delete().then(function (response) {
        $state.go('main.transactions');
      }, function (err) {
      $scope.response = err.data;
        if (err.data.fields) {
          err.data.fields.forEach(function (field) {
            if (form[field.path]) {
              form[field.path].$setValidity('uniqueness', false);
            }
          });
        }
      })
    }
  };

  $scope.save = function (form) {
    $scope.transaction.$update().then(function (response) {

      $scope.response = {'message': 'Transaction Saved Successfully'};
    }, function (err) {
      $scope.response = err.data;
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  }
}]);

