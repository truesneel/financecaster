
var settings = angular.module('financecaster.settings', ['ui.router', 'financecaster']);

settings.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.settings', {
      url: '/Settings',
      templateUrl: 'views/main/settings.html',
      controller: 'settingsController',
      resolve: {
        'user': function ($q, $stateParams, User) {
          var account,
            defer = $q.defer();

          User.get(function (user) {
            defer.resolve(user);
          });

          return defer.promise;
        },
      }
    });

});

settings.factory('User', ['$resource', function($resource) {
  return $resource('/api/auth/user', {}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

settings.factory('ChangePw', ['$resource', function($resource) {
  return $resource('/api/auth/changepw');
}]);


settings.factory('Tokens', ['$resource', function($resource) {
  return $resource('/api/auth/tokens/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

settings.controller('settingsController', ['$scope', '$state', '$timeout', 'financecaster', 'user', 'Tokens', 'ChangePw', function ($scope, $state, $timeout, financecaster, user, Tokens, ChangePw) {

  $scope.loading = false;
  $scope.tokens = [];
  $scope.config = financecaster.config;
  $scope.user = user;
  $scope.changepw = new ChangePw();

  $scope.save = function (form) {
    $scope.user.$update().then(function (response) {

      financecaster.message('User Saved Successfully');
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

  $scope.change = function (form) {
    $scope.changepw.$save().then(function (response) {

      financecaster.message('Password Changed Successfully');
    }, function (err) {
      financecaster.message(err.data, 'error');
    });
  };

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
      financecaster.message(err.data, 'error');
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
