'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
       const merchantsSeed = [{
      username: "Arie Brainware",
      store_name: "ReQua",
      email: "requa@gmail.com",
      password: "tes123",
      phone_number: "0812 2212 2123",
      identity_number: "23332221233123",
      address: "Batu Aji",
      createdAt: new Date() + 7,
      updatedAt: new Date() + 7
    }, {
      username: "Indro Lie",
      store_name: "Sangford",
      email: "sangford@gmail.com",
      password: "tes123",
      phone_number: "0812 2212 2123",
      identity_number: "23332221233123",
      address: "Baloi",
      createdAt: new Date() + 7,
      updatedAt: new Date() + 7
    }]

    return queryInterface.bulkInsert('merchants',merchantsSeed)
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('merchants', null, {});
  }
};
