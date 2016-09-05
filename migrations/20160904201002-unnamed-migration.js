'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'permissions',
      'email',
      Sequelize.STRING
    );
    queryInterface.addColumn(
      'permissions',
      'token',
      Sequelize.STRING
    );
    queryInterface.addColumn(
      'permissions',
      'token',
      {
        'type': Sequelize.BOOLEAN,
        'allowNull': false
      }
    );
    queryInterface.removeColumn(
      'permissions',
      'tansactions'
    );
    queryInterface.addColumn(
      'permissions',
      'transactions',
      {
        'type': Sequelize.BOOLEAN,
        'allowNull': false,
        'defaultValue': false,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
