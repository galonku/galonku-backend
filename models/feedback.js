'use strict';
module.exports = (sequelize, DataTypes) => {
  var feedback = sequelize.define('feedback', {
    name: {
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull:false,
      type: DataTypes.STRING(75)
    },
    phone_number: {
      type: DataTypes.STRING(20)
    },
    comments: {
      allowNull:false,
      type: DataTypes.TEXT
    }
  }, {});
  feedback.associate = function (models) {
    // associations can be defined here
  };
  return feedback;
};