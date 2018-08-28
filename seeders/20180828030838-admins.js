'use strict';
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPassword = 'superpower';
const myPassword2 = 'tes123';

const doEncryptPassword =  (textPassword, salt = 5) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPassword, salt).then(result => {
            resolve(result);
        })
    })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    const admins = [{
      "username": "nukesmith",
      "fullname": "Nuke Smith",
      "email": "nukesmith@mail.com"
    },{
      "username": "paul",
      "fullname": "paul jenkins",
      "email": "pauljenkins@mail.com"
    }]

    await doEncryptPassword(myPassword, saltRounds).then(newPassword => {
      admins[0].password = newPassword      
    })

    await doEncryptPassword(myPassword2, saltRounds).then(newPassword => {
      admins[1].password = newPassword      
    })

    return queryInterface.bulkInsert('admins', admins, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
