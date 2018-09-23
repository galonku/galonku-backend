'use strict';
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPassword = process.env.ADMIN_PASSWORD
const myPassword2 = process.env.ADMIN_PASSWORD2

const doEncryptPassword = (textPassword, salt = 5) => {
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
      "email": "nukesmith@mail.com",
      createdAt: new Date() + 7,
      updatedAt: new Date() + 7
    }, {
      "username": "paul",
      "fullname": "paul jenkins",
      "email": "pauljenkins@mail.com",
      createdAt: new Date() + 7,
      updatedAt: new Date() + 7
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
