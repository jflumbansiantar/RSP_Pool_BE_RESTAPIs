'use strict';

const { tokenGenerator } = require('../helpers/jwt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please enter a valid email' }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please enter your password' }
      }
    },
    photo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Input your photo.' }
      }
    },
  },
    {
      hooks: {
        beforeCreate(users, options) {
          users.password = tokenGenerator(users.password)
        },
      },

      sequelize,
      modelName: 'users',
    });
  return users;
};