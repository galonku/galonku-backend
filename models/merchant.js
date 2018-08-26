'use strict';
module.exports = (sequelize, DataTypes) => {
  var merchant = sequelize.define('merchant', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(40)
    },
    store_name: {
      allowNull: false,
      isAlpha: true,
      unique: true,
      type: DataTypes.STRING(100)
    },
    email: {
      allowNull: false,
      unique: true,
      isEmail: true,
      type: DataTypes.STRING(100)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    identity_number: {
      allowNull: false,
      unique: true,
      isNumeric: true,
      type: DataTypes.STRING(20)
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  merchant.associate = function (models) {
    // associations can be defined here
  };
  return merchant;
};