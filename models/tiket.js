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
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
    basePrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Tiket',
  });
  return Tiket;
};