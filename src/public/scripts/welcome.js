
var welcome = angular.module('financecaster.welcome', ['ui.router', 'financecaster']);

welcome.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('welcome', {
      url: '/Welcome',
      templateUrl: 'views/welcome.html',
      controller: 'welcomeController',
    })
    .state('forgotpassword', {
      url: '/ForgotPassword',
      templateUrl: 'views/forgotpassword.html',
      controller: 'forgotController',
    })
    .state('verify', {
      url: '/Verify/:verification',
      templateUrl: 'views/verify.html',
      controller: 'verifyController',
      resolve: {
        'verified': function ($q, $stateParams, NewUser) {
          var defer = $q.defer();

          verify = new NewUser({'verification': $stateParams.verification});

          verify.$activate().then(function () {
            defer.resolve(true);
          }, function () {
            defer.resolve(false);
          });

          return defer.promise;
        }
      }
    });

});

welcome.factory('ForgotPassword', ['$resource', function($resource) {
  return $resource('/api/auth/forgot');
}]);

welcome.factory('NewUser', ['$resource', function($resource) {
  return $resource('/api/auth/newuser/:verification', { verification: '@verification' }, {
    activate: {
      method: 'POST' // this method issues a PUT request
    }
  });
}]);

welcome.controller('forgotController', ['$scope', 'financecaster', 'ForgotPassword', function ($scope, financecaster, ForgotPassword) {
  financecaster.set_root($scope);
  $scope.messages = $scope.messages || [];
  $scope.resetting = false;
  $scope.reset = new ForgotPassword();

  $scope.resetpassword = function (form) {
    $scope.resetting = true;

    $scope.reset.$save().then(function () {
      $scope.resetting = false;

      $scope.active = 0;
      form.$setPristine();
      form.$setUntouched();
      $scope.reset = new ForgotPassword();

      financecaster.message('Password Reset. Check your Email');

    }, function (err) {
      $scope.resetting = false;
      err.data = err.data || 'Unknown Error';

      financecaster.message(err.data.message || err.data.error || err.data, 'error');
    });

  };

}]);

welcome.controller('verifyController', ['$scope', 'verified', function ($scope, verified) {
  $scope.verified = verified;
}]);

welcome.controller('welcomeController', ['$scope', '$state', '$http', 'financecaster', 'NewUser', function ($scope, $state, $http, financecaster, NewUser) {
  financecaster.set_root($scope);
  $scope.messages = $scope.messages || [];
  $scope.newuser = new NewUser();
  $scope.login = {};
  $scope.active = 0;
  $scope.creating = false;

  $scope.username = '';
  $scope.password = '';
    $scope.error = null;

  $scope.login = function () {
    $scope.error = null;

    financecaster.login($scope.login.username, $scope.login.password).then(function () {
      $state.go('main.forecast');
    }, function (err) {
      $scope.error = err;
      financecaster.message('Login Failed', 'error');
      $scope.$digest();
    });

  };

  $scope.createaccount = function (form) {
    $scope.creating = true;

    $scope.newuser.$save().then(function () {
      $scope.creating = false;

      if (!$scope.newuser.verification) {
        $scope.active = 0;
        form.$setPristine();
        form.$setUntouched();
        $scope.newuser = new NewUser();

        financecaster.message('Account Created. Please Login');
      }

    }, function (err) {
      $scope.creating = false;
      err.data = err.data || 'Unknown Error';

      financecaster.message(err.data.message || err.data.error || err.data, 'error');
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
