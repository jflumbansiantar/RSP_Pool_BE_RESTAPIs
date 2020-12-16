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
    }
  };
  rooms.init({
    room_name: DataTypes.STRING,
    room_capacity: DataTypes.STRING,
    photo: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};