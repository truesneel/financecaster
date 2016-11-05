
var accounts = angular.module('financecaster.accounts', ['ngResource', 'ui.router', 'financecaster']);

accounts.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.accounts', {
      url: '/Accounts',
      templateUrl: 'views/main/accounts.html',
      controller: 'accountsController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        }
      }
    })
    .state('main.addaccounts', {
      url: '/Accounts/Add',
      templateUrl: 'views/main/accounts.add.html',
      controller: 'accountsAddController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        }
      }
    })
    .state('main.editaccount', {
      url: '/Accounts/:id',
      templateUrl: 'views/main/accounts.edit.html',
      controller: 'accountsEditController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.id}, function () {
            account.balance_date = new Date(account.balance_date);
            defer.resolve(account);
          });

          return defer.promise;
        },
        'transactions': function ($q, $stateParams, AccountsTransactions) {
          var account,
            defer = $q.defer();

          account = AccountsTransactions.query({ accountId: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        }
      }
    })
    .state('main.editaccountTransactions', {
      url: '/Accounts/:id/Transactions',
      templateUrl: 'views/main/accounts.edit.transactions.html',
      controller: 'accountTransactionsController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        },
        'transactions': function ($q, $stateParams, AccountsTransactions) {
          var account,
            defer = $q.defer();

          account = AccountsTransactions.query({ accountId: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        }
      }
    })
    .state('main.accountAddTransaction', {
      url: '/Accounts/:id/Transactions/Add',
      templateUrl: 'views/main/accounts.edit.transactions.add.html',
      controller: 'accountTransactionsAddController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
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
        }
      }
    })
    .state('main.accountEditTransaction', {
      url: '/Accounts/:accountId/Transactions/:id',
      templateUrl: 'views/main/accounts.edit.transactions.edit.html',
      controller: 'accountTransactionsEditController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
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

          account = Accounts.get({ id: $stateParams.accountId}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        },
        'transaction': function ($q, $stateParams, AccountsTransactions) {
          var account,
            defer = $q.defer();

          account = AccountsTransactions.get({ accountId: $stateParams.accountId, id: $stateParams.id}, function () {
            account.start = new Date(account.start);
            defer.resolve(account);
          });

          return defer.promise;
        }
      }
    })
    .state('main.editaccountPermissions', {
      url: '/Accounts/:id/Permissions',
      templateUrl: 'views/main/accounts.edit.permissions.html',
      controller: 'accountPermissionsController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        },
        'permissions': function ($q, $stateParams, AccountsPermissions) {
          var permissions,
            defer = $q.defer();

          permissions = AccountsPermissions.query({ accountId: $stateParams.id}, function () {
            defer.resolve(permissions);
          });

          return defer.promise;
        }
      }
    })
    .state('main.accountAddPermission', {
      url: '/Accounts/:id/Permissions/Add',
      templateUrl: 'views/main/accounts.edit.permissions.add.html',
      controller: 'accountPermissionsAddController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.id}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        }
      }
    })
    .state('main.accountEditPermission', {
      url: '/Accounts/:accountId/Permissions/:id',
      templateUrl: 'views/main/accounts.edit.permissions.edit.html',
      controller: 'accountPermissionsEditController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
        'account': function ($q, $stateParams, Accounts) {
          var account,
            defer = $q.defer();

          account = Accounts.get({ id: $stateParams.accountId}, function () {
            defer.resolve(account);
          });

          return defer.promise;
        },
        'permission': function ($q, $stateParams, AccountsPermissions) {
          var account,
            defer = $q.defer();

          permission = AccountsPermissions.get({ accountId: $stateParams.accountId, id: $stateParams.id}, function () {
            defer.resolve(permission);
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

accounts.factory('AccountsTransactions', ['$resource', function($resource) {
  return $resource('/api/accounts/:accountId/transactions/:id', { id: '@id' , 'accountId': '@accountId'}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

accounts.factory('AccountsPermissions', ['$resource', function($resource) {
  return $resource('/api/accounts/:accountId/permissions/:id', { id: '@id' , 'accountId': '@accountId'}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

accounts.controller('accountsController', ['$scope', '$http', 'financecaster', 'Accounts', function ($scope, $http, financecaster, Accounts) {

  $scope.accounts = Accounts.query();

}]);

accounts.controller('accountsAddController', ['$scope', '$http', 'financecaster', 'Accounts', function ($scope, $http, financecaster, Accounts) {

  $scope.response = {};
  $scope.account = new Accounts({'forecast': 365});
  $scope.account.balance_date = new Date();
  $scope.forecast_range = [
    {'name': '30 Days', 'value': 30},
    {'name': '60 Days', 'value': 60},
    {'name': '90 Days', 'value': 90},
    {'name': '180 Days', 'value': 180},
    {'name': '1 Year', 'value': 365}
  ];

  $scope.save = function (form) {
    $scope.account.$save().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      financecaster.message('Account Added');
      $state.go('main.accounts');
    }, function (err) {
        financecaster.message(err.data, 'error');
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  };

}]);

accounts.controller('accountsEditController', ['$scope', '$state', '$http', 'financecaster', 'account', 'transactions', function ($scope, $state, $http, financecaster, account, transactions) {

  $scope.state = $state.current;
  $scope.response = {};
  $scope.account = account;
  $scope.transactions = transactions;
  $scope.forecast_range = [
    {'name': '30 Days', 'value': 30},
    {'name': '60 Days', 'value': 60},
    {'name': '90 Days', 'value': 90},
    {'name': '180 Days', 'value': 180},
    {'name': '1 Year', 'value': 365}
  ];

  $scope.update_date = function (field) {
    $scope.account.balance_date = new Date();
    $scope.account.balance_date.setHours(0);
    $scope.account.balance_date.setMinutes(0);
    $scope.account.balance_date.setSeconds(0);
    $scope.account.balance_date.setMilliseconds(0);
    field.$setDirty();
  };

  $scope.delete = function (form ) {
    if (confirm('Are you sure you want to delete this account?')) {
      $scope.account.$delete().then(function (response) {
        financecaster.message('Account Deleted Successfully');
        $state.go('main.accounts');
      }, function (err) {
        financecaster.message(err.data, 'error');
        if (err.data.fields) {
          err.data.fields.forEach(function (field) {
            if (form[field.path]) {
              form[field.path].$setValidity('uniqueness', false);
            }
          });
        }
      });
    }
  };

  $scope.save = function (form) {
    $scope.account.$update().then(function (response) {

      financecaster.message('Account Saved Successfully');
      $state.go('main.accounts');

    }, function (err) {
      financecaster.message(err.data, 'error');
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  };

}]);

accounts.controller('accountTransactionsController', ['$scope', '$state', '$stateParams', '$http', 'financecaster', 'account', 'transactions', function ($scope, $state, $stateParams, $http, financecaster, account, transactions) {

  $scope.state = $stateParams;
  $scope.account = account;
  $scope.response = {};
  $scope.transactions = transactions;

}]);

accounts.controller('accountTransactionsAddController', ['$scope', '$state', '$stateParams', '$http', 'financecaster', 'account', 'AccountsTransactions', 'myAccounts', function ($scope, $state, $stateParams, $http, financecaster, account, Transactions, accounts) {

  $scope.accounts = accounts;
  $scope.transaction = new Transactions({'accountId': account.id, 'one_time': true});

  $scope.state = $stateParams;
  $scope.account = account;
  $scope.response = {};



  $scope.save = function (form) {
    $scope.transaction.$save().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      financecaster.message('Transaction Added');
      $state.go('main.editaccountTransactions', account);
      $scope.transaction = new Transactions({'accountId': account.id, 'one_time': true});
    }, function (err) {
      financecaster.message(err.data, 'error');
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  };

}]);

accounts.controller('accountTransactionsEditController', ['$scope', '$state', '$stateParams', '$http', 'financecaster', 'transaction', 'account', 'myAccounts', function ($scope, $state, $stateParams, $http, financecaster, transaction, account, accounts) {

  $scope.accounts = accounts;
  $scope.account = account;
  $scope.transaction = transaction;

  $scope.response = {};


  $scope.delete = function (form ) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      $scope.transaction.$delete().then(function (response) {
        financecaster.message('Transaction Deleted');
        $state.go('main.editaccountTransactions', account);
      }, function (err) {
        financecaster.message(err.data, 'error');
        if (err.data.fields) {
          err.data.fields.forEach(function (field) {
            if (form[field.path]) {
              form[field.path].$setValidity('uniqueness', false);
            }
          });
        }
      });
    }
  };

  $scope.save = function (form) {
    $scope.transaction.$update().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      $scope.response = response;
      financecaster.message('Transaction Saved');
      $state.go('main.editaccountTransactions', account);
    }, function (err) {
      financecaster.message(err.data, 'error');
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  };

}]);

accounts.controller('accountPermissionsController', ['$scope', '$state', '$stateParams', '$http', 'financecaster', 'account', 'permissions', function ($scope, $state, $stateParams, $http, financecaster, account, permissions) {

  $scope.state = $stateParams;
  $scope.account = account;
  $scope.response = {};
  $scope.permissions = permissions;

}]);


accounts.controller('accountPermissionsAddController', ['$scope', '$state', '$stateParams', '$http', 'financecaster', 'account', 'AccountsPermissions', function ($scope, $state, $stateParams, $http, financecaster, account, Permissions) {

  $scope.accounts = accounts;
  $scope.permission = new Permissions({'accountId': account.id, 'balance': true, 'transactions': true, 'shares': false});

  $scope.state = $stateParams;
  $scope.account = account;
  $scope.response = {};
  $scope.sending = false;

  $scope.save = function (form) {
    $scope.sending = true;
    $scope.permission.$save().then(function (response) {
      $scope.sending = false;
      form.$setPristine();
      form.$setUntouched();

      financecaster.message('Permission Added');
      $state.go('main.editaccountPermissions', account);
      $scope.permission = new Permissions({'accountId': account.id, 'balance': true, 'transactions': true, 'shares': false});
    }, function (err) {
      $scope.sending = false;
      financecaster.message(err.data, 'error');
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  };

}]);

accounts.controller('accountPermissionsEditController', ['$scope', '$state', '$stateParams', '$http', 'financecaster', 'permission', 'account', function ($scope, $state, $stateParams, $http, financecaster, permission, account) {

  $scope.account = account;
  $scope.permission = permission;

  $scope.response = {};


  $scope.delete = function (form ) {
    if (confirm('Are you sure you want to delete this permission?')) {
      $scope.permission.$delete().then(function (response) {
        financecaster.message('Permission Deleted');
        $state.go('main.editaccountPermissions', account);
      }, function (err) {
        financecaster.message(err.data, 'error');
        if (err.data.fields) {
          err.data.fields.forEach(function (field) {
            if (form[field.path]) {
              form[field.path].$setValidity('uniqueness', false);
            }
          });
        }
      });
    }
  };

  $scope.save = function (form) {
    $scope.permission.$update().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      $scope.response = response;
      financecaster.message('Permission Saved');
      $state.go('main.editaccountPermissions', account);
    }, function (err) {
      financecaster.message(err.data, 'error');
      if (err.data.fields) {
        err.data.fields.forEach(function (field) {
          if (form[field.path]) {
            form[field.path].$setValidity('uniqueness', false);
          }
        });
      }
    });
  };

}]);
