"use strict";
module.exports = (sequelize, DataTypes) => {
  var vieworder = sequelize.define(
    "vieworder",
    {
      fullname: {
        type: DataTypes.STRING(75)
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
      }
    },
    {}
  );
  vieworder.associate = function(models) {
    // associations can be defined here
  };
  return vieworder;
};
