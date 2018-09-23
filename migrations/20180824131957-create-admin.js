'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      fullname: {
        allowNull:false,
        type: Sequelize.STRING(75)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admins');
  }
};