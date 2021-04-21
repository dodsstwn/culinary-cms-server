'use strict';

const { hashPassword } = require('../helpers/password-helper');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [
      {
        "email": "daniel@mail.com",
        "password": hashPassword('daniel'),
        "role": 'admin',
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "email": "admin@mail.com",
        "password": hashPassword('administrator'),
        "role": 'admin',
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]
    await queryInterface.bulkInsert('Users', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
