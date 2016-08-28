
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

forecast.controller('forecastViewController', ['$scope', '$uibModal', '$timeout', 'myAccounts', 'account', 'Forecasts', function ($scope, $uibModal, $timeout, accounts, account, Forecasts) {
  $scope.accounts = accounts;
  $scope.account = account;
  $scope.loading = true;

  $scope.forecastChart = {
    'type':  'AreaChart',
    'options': {
      'backgroundColor': 'rgb(28, 30, 34)',
      'chartArea': {'width': '80%', 'height': '80%'},
      'legend': {
        'position': 'none'
      },
      'vAxis': {
        'textStyle':{color: '#ccc'},
        'gridlines': {
          'color': '#777',
          'count': 10
        }
      },
      'hAxis': {
        'textStyle':{color: '#ccc'},
        'gridlines': {
          'color': '#222',
          'count': 12
        }
      }
    },
    'data': {
      'cols': [
        {id: 's', label: 'Date', type: 'date'},
        {id: 't', label: 'Balance', type: 'number'}
      ],
      'rows': []
    }
  };

  var load = function () {
    $scope.loading = true;
    $scope.forecast = [];

    Forecasts.get({id: account.id}, function (result) {
      $scope.forecast = result;
      $scope.forecastChart.data.rows = [];

      $scope.forecast.future.forEach(function (day) {
        $scope.forecastChart.data.rows.push({c: [
          {v: new Date(day.date)},
          {v: day.balance}
        ]});
      });

      $scope.loading = false;
    });
  };

  $timeout(load, 500);

  var updateController = function ($scope, $uibModalInstance, account, myAccounts, Transactions) {
    $scope.account = account;
    $scope.accounts = myAccounts;
    $scope.transaction = new Transactions({'accountId': account.id, 'one_time': true, 'start': new Date()});

    $scope.addTransaction = function () {
      $scope.transaction.$save().then(function (response) {
        $uibModalInstance.close();
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
    };

    $scope.updateAccount = function () {
      $scope.account.$update().then(function (response) {
        $uibModalInstance.close();
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
    };

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  };

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/main/forecast.update.html',
      controller: updateController,
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
            account.balance_date = new Date(account.balance_date);
            defer.resolve(account);
          });

          return defer.promise;
        }
      },
      size: 'lg'
    });

    modalInstance.result.then(function () {
      load();
    }, function () {
    });
  };

}]);
