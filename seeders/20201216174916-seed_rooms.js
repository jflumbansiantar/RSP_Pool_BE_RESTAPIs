'use strict';
const fs = require('fs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const parseData = JSON.parse(fs.readFileSync('./datarooms.json', 'utf8'));
    const roomData = [];

    parseData.forEach(data => {
      const { room_name, room_capacity, photo } = data;
      roomData.push({
        room_name,
        room_capacity,
        photo,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })
    await queryInterface.bulkInsert('rooms', roomData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
