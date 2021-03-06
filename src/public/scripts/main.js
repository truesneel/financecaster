
var financecaster = angular.module('financecaster', [
  'ng',
  'ui.router',
  'ui.bootstrap',
  'googlechart',
  'financecaster.welcome',
  'financecaster.forecast',
  'financecaster.accounts',
  'financecaster.transactions',
  'financecaster.settings',
  'financecaster.users',
]);

financecaster.directive('currency', function() {
  var currency = /^-?\d+(\.\d\d?)?$/;

  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.currency = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(viewValue)) {
          // consider empty models to be valid
          return true;
        }

        return currency.test(modelValue);
      };
    }
  };
});

financecaster.directive('unsignedint', function() {
  var unsignedint = /^\d+$/;

  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.unsignedint = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        return unsignedint.test(modelValue);
      };
    }
  };
});

financecaster.directive('requiredIf', function() {

  return {
    require: 'ngModel',
    scope: {
      requiredIf: '='
    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.requiredIf = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue) && scope.requiredIf) {
          // consider empty models to be valid
          return false;
        }

        return true;
      };

      scope.$watch( 'requiredIf', function() {
          ctrl.$validate();
      } );

    }
  };

});

financecaster.directive('matches', function() {

  return {
    require: 'ngModel',
    scope: {
      matches: '='
    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.matches = function(modelValue, viewValue) {
        if (scope.matches == modelValue) {
          // consider empty models to be valid
          return true;
        }

        return false;
      };

      scope.$watch( 'matches', function() {
          ctrl.$validate();
      } );

    }
  };

});

financecaster.factory('Auth', ['$resource', function($resource) {
  return $resource('/api/auth');
}]);

financecaster.provider('financecaster', function ($httpProvider) {
  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');
  var $q = initInjector.get('$q');
  var $timeout = initInjector.get('$timeout');
  var headers = {};

  this.config = {};
  this.messages = [];

	this.load = function () {
    try {
      this.config = JSON.parse(localStorage.getItem('financecaster'));
      this.config = this.config || {};

      if (this.config.auth) {
        $httpProvider.defaults.headers.common.client_token = this.config.auth.client_token;
        $httpProvider.defaults.headers.common.auth_token = this.config.auth.auth_token;
      }
    } catch (e) {
      this.config = {};
    }
	};

  this.save = function () {

    localStorage.setItem('financecaster', JSON.stringify(this.config));

  };

  this.is_authed = ['$q', '$http', 'financecaster', function ($q, $http, financecaster) {
    var defer = $q.defer();

    if (financecaster.config.auth) {
      $http.get('/api/auth').then(function (response) {
        defer.resolve(financecaster.config.auth);
      }, function (err) {
        if (err.status === 403) {
          err.state = 'welcome';
          err.message = 'Login Expired';
          financecaster.config = {};
          financecaster.save();
        } else if (err.status === -1) {
          delete err.state;
          err.message = 'Server Went Away';
        }
        defer.reject(err);
      });
    } else {
      defer.reject({state: 'welcome'});
    }

    return defer.promise;
  }];

  this.login = function (username, password, account_token) {
    var self = this,
      defer = $q.defer();

    $http.post('/api/auth', {'username': username, 'password': password, 'account_token': account_token}).then(function (response) {
      self.config.auth = response.data;

      $httpProvider.defaults.headers.common.client_token = self.config.auth.client_token;
      $httpProvider.defaults.headers.common.auth_token = self.config.auth.auth_token;

      self.save();
      defer.resolve();
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  this.logout = function () {
    var self = this,
      defer = $q.defer();


    console.log(self.Auth);
    auth.delete().then(function (response) {

      delete self.config.auth;
      self.save();

      defer.resolve();

    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  this.set_root = function (scope) {
    this.rootScope = scope;
  };

  this.message = function (message, type) {
    var self = this;

    if (!self.messages) {
      return false;
    }
    self.messages.push({
      'message': message,
      'type': type
    });

    $timeout(function () {
      self.messages.shift();
      self.rootScope.$digest();
    }, 5000);
  };

	this.$get = function (Auth) {
		var self = this;
    self.Auth = Auth;

		return {
			load: self.load,
      save: self.save,
      config: self.config,
      is_authed: self.is_authed,
      login: self.login,
      logout: function () {
        var self = this,
          defer = $q.defer();


        auth = new Auth();
        auth.$delete().then(function (response) {

          delete self.config.auth;
          self.save();

          defer.resolve();

        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      },
      message: self.message,
      messages: self.messages,
      set_root: self.set_root,
		};
	};
});

financecaster.config(function($stateProvider, $urlRouterProvider, financecasterProvider) {

	financecasterProvider.load();

	$urlRouterProvider.otherwise('/Forecast');
	$urlRouterProvider.when('', '/Forecast');

	$stateProvider
		.state('main', {
			url: '',
			templateUrl: "views/main/index.html",
      controller: 'mainController',
			resolve: {
				auth: financecasterProvider.is_authed
			}
		});

});

financecaster.controller('mainController', ['$scope', 'financecaster', 'auth', function ($scope, financecaster, auth) {
  $scope.auth = auth;
  financecaster.set_root($scope);
  $scope.messages = financecaster.messages;

}]);

financecaster.controller('rootController', ['$rootScope', '$scope', '$state', '$timeout', 'financecaster', function ($rootScope, $scope, $state, $timeout, financecaster) {

	$rootScope.loading = false;

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
		$rootScope.loading = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
		$rootScope.loading = false;
	});

	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

    if (error.message || error.state !== 'welcome') {
      financecaster.message(error.message || 'Error Loading Page', 'error');
    }
		$rootScope.loading = false;
		event.preventDefault();
		if ( ! error ) {
			alert('Application failed to load');
		} else {
			if (error.state && toState.name !== error.state) {
				$state.go(error.state, error);
			}
		}
	});

}]);
