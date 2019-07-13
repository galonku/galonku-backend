"use strict";
module.exports = (sequelize, DataTypes) => {
  var vieworder = sequelize.define(
    "vieworder",
    {
      idorder: {
        type: DataTypes.INTEGER
      },
      fullname: {
        type: DataTypes.STRING(75)
      },
      address: {
        type: DataTypes.STRING
      },
      phone_number: {
        type: DataTypes.STRING
      },
      notes: {
        type: DataTypes.STRING
      },
      store_name: {
        type: DataTypes.STRING(100)
      },
      price: {
        type: DataTypes.INTEGER
      },
      quantities: {
        type: DataTypes.INTEGER
      },
      Total: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM("pending, rejected, progress, delivering")
      }
    },
    {}
  );
  vieworder.associate = function(models) {
    // associations can be defined here
  };
  return vieworder;
};
