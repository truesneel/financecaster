
var accounts = angular.module('financecaster.accounts', ['ngResource', 'ui.router', 'financecaster']);

accounts.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.accounts', {
      url: '/Accounts',
      templateUrl: 'views/main/accounts.html',
      controller: 'accountsController',
    })
    .state('main.addaccounts', {
      url: '/Accounts/Add',
      templateUrl: 'views/main/accounts.add.html',
      controller: 'accountsAddController',
    })
    .state('main.editaccount', {
      url: '/Accounts/:id',
      templateUrl: 'views/main/accounts.edit.html',
      controller: 'accountsEditController',
      resolve: {
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        }
      }
    });

});

accounts.factory('Accounts', ['$resource', function($resource) {
  return $resource('/api/accounts/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

accounts.controller('accountsController', ['$scope', '$http', 'financecaster', 'Accounts', function ($scope, $http, financecaster, Accounts) {

  $scope.accounts = Accounts.query();

}]);

accounts.controller('accountsAddController', ['$scope', '$http', 'financecaster', 'Accounts', function ($scope, $http, financecaster, Accounts) {

  $scope.response;
  $scope.account = new Accounts();

  $scope.save = function (form) {
    $scope.account.$save().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      $scope.response = response
      console.dir(response);
    }, function (err) {
      $scope.response = err.data;
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            console.log(form[field.path]);
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
      console.dir(err);
    });
  }
}]);

accounts.controller('accountsEditController', ['$scope', '$state', '$http', 'financecaster', 'account', function ($scope, $state, $http, financecaster, account) {

  $scope.response;
  $scope.account = account;

  $scope.delete = function (form ) {
    if (confirm('Are you sure you want to delete this account?')) {
      $scope.account.$delete().then(function (response) {
        $state.go('main.accounts');
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
    $scope.account.$update().then(function (response) {

      $scope.response = {'message': 'Account Saved Successfully'};
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
