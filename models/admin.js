'use strict';
module.exports = (sequelize, DataTypes) => {
  var admin = sequelize.define('admin', {
    username: {
      allowNull:false,
      type: DataTypes.STRING(30)
    },
    email: {
      allowNull:false,
      type: DataTypes.STRING(50)
    },
    password: {
      allowNull:false,
      type: DataTypes.STRING
    },
    fullname: {
      allowNull:false,
      type: DataTypes.STRING(75)
    }
  }, {});
  admin.associate = function (models) {
    // associations can be defined here
  };
  return admin;
};