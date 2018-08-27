"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(40)
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
      fullname: {
        allowNull: false,
        type: DataTypes.STRING(75)
      },
      phone_number: {
        allowNull: false,
        type: DataTypes.STRING
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
