
var welcome = angular.module('financecaster.welcome', ['ui.router', 'financecaster']);

welcome.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('welcome', {
      url: '/Welcome',
      templateUrl: 'views/welcome.html',
      controller: 'welcomeController',
      resolve: {
        'share': function () {
          return '';
        }
      }
    })
    .state('welcomeshared', {
      url: '/Welcome/:token',
      templateUrl: 'views/welcome.html',
      controller: 'welcomeController',
      resolve: {
        'share': function ($q, $stateParams, Share) {
          var defer = $q.defer();

          share = Share.get({'token': $stateParams.token}, function () {
            defer.resolve(share);
          });

          return defer.promise;
        }
      }
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

welcome.factory('Share', ['$resource', function($resource) {
  return $resource('/api/accounts/accept/:token', {token: '@token'});
}]);

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

welcome.controller('welcomeController', ['$scope', '$state', '$http', '$stateParams', 'financecaster', 'NewUser', 'ChangePw', 'share', function ($scope, $state, $http, $stateParams, financecaster, NewUser, ChangePw, share) {
  $scope.messages = financecaster.messages;
  financecaster.set_root($scope);
  
  $scope.newuser = new NewUser({'account_token': $stateParams.token});
  $scope.user = {'account_token': share.token};
  $scope.active = 0;
  $scope.creating = false;
  $scope.changing = false;
  $scope.changepw = undefined;
  $scope.auth = financecaster.config.auth;
  $scope.share = share;

  $scope.username = '';
  $scope.password = '';
    $scope.error = null;

  $scope.accept_share = function () {
    $http.post('/api/accounts/accept/' + $scope.user.account_token).then(function () {
      $state.go('main.accounts');
    }, function (err) {
      financecaster.message(err.data.error, 'error');
    });
  };

  $scope.login = function () {
    $scope.error = null;

    financecaster.login($scope.user.username, $scope.user.password, $scope.user.account_token).then(function () {
      $state.go('main.forecast');
    }, function (err) {
      if (err.status === 400) {
        $scope.changepw = new ChangePw();
        $scope.changepw.username = $scope.user.username;
        $scope.changepw.current = $scope.user.password;

        financecaster.message('Password Change Required', 'error');
        $scope.$digest();
      } else {
        $scope.error = err;
        financecaster.message('Login Failed', 'error');
        $scope.$digest();
      }
    });

  };

  $scope.changepassword = function (form) {
    $scope.changing = true;

    $scope.changepw.$save().then(function (response) {
      $scope.changing = false;

      financecaster.login($scope.changepw.username, $scope.changepw.newpassword).then(function () {
        $state.go('main.forecast');
      });

    }, function (err) {
      financecaster.message(err.data, 'error');
      $scope.changing = false;
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
