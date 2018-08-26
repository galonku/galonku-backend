'use strict';
module.exports = (sequelize, DataTypes) => {
  var merchant = sequelize.define('merchant', {
    username: {
      type: DataTypes.STRING(40)
    },
    store_name: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(100)
    },
    password: {
      type: DataTypes.STRING(50)
    },
    phone_number: {
      type: DataTypes.STRING(30)
    },
    identity_number: {
      type: DataTypes.STRING(20)
    },
    address: {
      type: DataTypes.TEXT
    }
  }, {});
  merchant.associate = function (models) {
    // associations can be defined here
  };
  return merchant;
};