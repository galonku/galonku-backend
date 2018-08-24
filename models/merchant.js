'use strict';
module.exports = (sequelize, DataTypes) => {
  var merchant = sequelize.define('merchant', {
    username: {        
      type: Sequelize.STRING(40)
    },
    email: {
      type: Sequelize.STRING(100)
    },
    password: {
      type: Sequelize.STRING(50)
    },
    phone_number: {
      type: Sequelize.STRING(30)
    },
    identity_number: {
      type: Sequelize.STRING(20)
    },
    address: {
      type: Sequelize.TEXT
    }
  }, {});
  merchant.associate = function(models) {
    // associations can be defined here
  };
  return merchant;
};