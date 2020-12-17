'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookings.belongsTo(models.rooms);
      bookings.belongsTo(models.users);
    }
  };
  bookings.init({
    total_person: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: 'Input how much people will be in the room.' }
      }
    },
    booking_time: DataTypes.DATE,
    noted: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please input your noted message.' }
      }
    },
    check_in_time: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: { msg: 'Input your check_in_time' }
      }
    },
    check_out_time: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: { msg: 'Input your check_in_time' }
      }
    },
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};