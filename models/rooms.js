'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rooms.hasMany(models.bookings)
    }
  };
  rooms.init({
    room_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Enter the room name.' }
      }
    },
    room_capacity: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Enter the room capacity.' }
      }
    },
    photo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Input room picture.' }
      }
    },
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};