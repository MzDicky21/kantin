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
      TiketSantri.belongsTo(models.Tiket)
      TiketSantri.belongsTo(models.User)
      // define association here
    }
  }
  TiketSantri.init({
    SantriId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "SantriId can't be empty"},
        notNull: {msg: "SantriId can't be null"}
      }
    },
    TiketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "TiketId can't be empty"},
        notNull: {msg: "TiketId can't be null"}
      }
    }
  }, {
    sequelize,
    modelName: 'TiketSantri',
  });
  return TiketSantri;
};