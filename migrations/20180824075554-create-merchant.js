"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("merchants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(40)
      },
      store_name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },
      email: {
        allowNull: false,
        unique: true,
        isEmail: true,
        type: Sequelize.STRING(100)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      identity_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20)
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("pending", "verified"),
        defaultValue: "pending"
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
    return queryInterface.dropTable("merchants");
  }
};
