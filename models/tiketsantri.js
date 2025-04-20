'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiketSantri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TiketSantri.init({
    SantriId: DataTypes.STRING,
    TiketId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TiketSantri',
  });
  return TiketSantri;
};