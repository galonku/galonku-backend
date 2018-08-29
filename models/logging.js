"use strict";
module.exports = (sequelize, DataTypes) => {
  var logging = sequelize.define(
    "logging",
    {
      iduser: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM("user", "merchant", "admin")
      }
    },
    {}
  );
  logging.associate = function(models) {
    // associations can be defined here
  };
  return logging;
};
