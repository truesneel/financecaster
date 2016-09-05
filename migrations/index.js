module.exports = {
  up: function(queryInterface, Sequelize) {
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
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
  }
}
