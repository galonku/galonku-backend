"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iduser: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      merchant: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      user_address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_notes: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("pending", "process", "done"),
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
    return queryInterface.dropTable("orders");
  }
};
