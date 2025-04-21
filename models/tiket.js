'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tiket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tiket.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "name can't be empty"},
        notNull: {msg: "name can't be null"}
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "count can't be empty"},
        notNull: {msg: "count can't be null"}
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {msg: "basePrice can't be empty"},
        notNull: {msg: "basePrice can't be null"}
      }
    }
  }, {
    sequelize,
    modelName: 'Tiket',
  });
  return Tiket;
};