'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {msg: ""},
        notNull: {msg: ""}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: {msg: ""},
        notNull: {msg: ""}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: ""},
        notNull: {msg: ""}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: ""},
        notNull: {msg: ""}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password)
  })
  return User;
};