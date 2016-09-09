
var users = angular.module('financecaster.users', ['ui.router', 'financecaster']);

users.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.users', {
      url: '/Users',
      templateUrl: 'views/main/users.html',
      controller: 'usersController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        }
      }
    })
    .state('main.adduser', {
      url: '/Users/Add',
      templateUrl: 'views/main/users.add.html',
      controller: 'usersAddController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        }
      }
    })
    .state('main.edituser', {
      url: '/Users/:id',
      templateUrl: 'views/main/users.edit.html',
      controller: 'usersEditController',
      resolve: {
        'auth': function ($injector, financecaster) {
          return $injector.invoke(financecaster.is_authed);
        },
        'user': ['$stateParams', '$q', 'Users', function ($stateParams, $q, Users) {
          var user,
            defer = $q.defer();

          user = Users.get({'id': $stateParams.id}, function () {
            defer.resolve(user);
          });

          return defer.promise;  
        }]
      }
    });

});


users.factory('Users', ['$resource', function($resource) {
  return $resource('/api/users/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

users.controller('usersController', ['$scope', 'Users', function ($scope, Users) {

  $scope.users = Users.query();

}]);

users.controller('usersEditController', ['$scope', '$state', 'financecaster', 'user', function ($scope, $state, financecaster, user) {

  $scope.user = user;

  $scope.delete = function (form ) {
    if (confirm('Are you sure you want to delete this user?')) {
      $scope.user.$delete().then(function (response) {
        financecaster.message('User Deleted Successfully');
        $state.go('main.users');
      }, function (err) {
        financecaster.message(err.data, 'error');
      });
    }
  };

  $scope.save = function (form) {
    $scope.user.$update().then(function (response) {

      financecaster.message('User Saved Successfully');

    }, function (err) {
      financecaster.message(err.data, 'error');
    });
  };

}]);

users.controller('usersAddController', ['$scope', '$state', 'financecaster', 'Users', function ($scope, $state, financecaster, Users) {

  $scope.user = new Users();

  $scope.save = function (form) {
    $scope.user.$save().then(function (response) {
      form.$setPristine();
      form.$setUntouched();

      financecaster.message('User Added');
      $state.go('main.users');
    }, function (err) {
      financecaster.message(err.data, 'error');
    });
  };


}]);