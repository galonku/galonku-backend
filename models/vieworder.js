"use strict";
module.exports = (sequelize, DataTypes) => {
  var vieworder = sequelize.define(
    "vieworder",
    {
      fullname: {
        type: DataTypes.STRING
      },
      store_name: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      Total: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  vieworder.associate = function(models) {
    // associations can be defined here
  };
  return vieworder;
};
