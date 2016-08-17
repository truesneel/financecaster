
var financecaster = angular.module('financecaster', ['ui.router']);


financecaster.provider('financecaster', function () {
  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');
  var $q = initInjector.get('$q');

  this.config = {};

	this.load = function () {
    try {
      this.config = JSON.parse(localStorage.getItem('financecaster'));
      this.config = this.config || {};
    } catch (e) {
      this.config = {};
    }
	};

  this.save = function () {
    localStorage.setItem('financecaster', JSON.stringify(this.config));
  };

  this.is_authed = function () {
    return (this.config && this.config.auth);
  };

	this.$get = function () {
		var self = this;
		return {
			load: self.load,
      save: self.save,
      config: self.config,
      is_authed: self.is_authed,
		};
	};
});

financecaster.controller('welcomeController', ['$scope', '$state', 'financecaster', function ($scope, $state, financecaster) {

	$scope.login = function () {
		financecaster.config.auth = {};
		financecaster.save();

		$state.go('main.forecast');
	}
}]);

financecaster.controller('settingsController', ['$scope', '$state', 'financecaster', function ($scope, $state, financecaster) {

	$scope.logout = function () {
		delete financecaster.config.auth;
		financecaster.save();
		
		$state.go('welcome');
	}
}]);

financecaster.config(function($stateProvider, $urlRouterProvider, financecasterProvider) {

	financecasterProvider.load();

	$urlRouterProvider.otherwise('/Forecast');
	$urlRouterProvider.when('', '/Forecast');

	$stateProvider
		.state('welcome', {
			url: '/Welcome',
			templateUrl: 'views/welcome.html',
			controller: 'welcomeController',
		})
		.state('main', {
			url: '',
			templateUrl: "views/main/index.html",
			resolve: {
				auth: ['$q', 'financecaster', function ($q, financecaster) {
					var defer = $q.defer();

					if (!financecaster.is_authed()) {
						defer.reject({state: 'welcome'})
					} else {
						defer.resolve(financecaster.auth);
					}

					return defer.promise;
				}]
			}
		})
		.state('main.forecast', {
			url: '/Forecast',
			templateUrl: 'views/main/forecast.html',
		})
		.state('main.accounts', {
			url: '/Accounts',
			templateUrl: 'views/main/accounts.html',
		})
		.state('main.transactions', {
			url: '/Transactions',
			templateUrl: 'views/main/transactions.html',
		})
		.state('main.settings', {
			url: '/Settings',
			templateUrl: 'views/main/settings.html',
			controller: 'settingsController',
		})

});


financecaster.controller('rootController', ['$rootScope', '$state', 'financecaster', function ($rootScope, $state, financecaster) {

	 if ( !financecaster.is_authed() && $state.current.name !== 'welcome') {
	 	console.log('here');
    $state.go('welcome');
  }

	$rootScope.loading = false;

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
		$rootScope.loading = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
		$rootScope.loading = false;
	});

	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
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