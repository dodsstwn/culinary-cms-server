'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [
      {
        "name": "Indonesia Barat",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Indonesia Tengah",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Indonesia Timur",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]
    await queryInterface.bulkInsert('Categories', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
