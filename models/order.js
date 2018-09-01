"use strict";
module.exports = (sequelize, DataTypes) => {
  var order = sequelize.define(
    "order",
    {
      iduser: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      merchant: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      idmerchants: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      quantities: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      phone_number: {
        allowNull: false,
        type: DataTypes.STRING(30)
      },
      user_address: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      user_notes: DataTypes.TEXT,
      status: {
        allowNull: false,
        type: DataTypes.ENUM("pending", "progress", "delivering","done")
      }
    },
    {}
  );
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};
