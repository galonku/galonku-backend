'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
       const merchantsSeed = [{
      username: "ariebrainware",
      store_name: "BrainwareQua",
      email: "brainware@gmail.com",
      password: "arie",
      phone_number: "0812 2212 2123",
      identity_number: "23332221233123",
      address: "Batu Aji",
      createdAt: new Date() + 7,
      updatedAt: new Date() + 7
    }, {
      username: "indrolie",
      store_name: "Sangford",
      email: "sangford@gmail.com",
      password: "indro",
      phone_number: "0812 2212 2123",
      identity_number: "233312010101123",
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
