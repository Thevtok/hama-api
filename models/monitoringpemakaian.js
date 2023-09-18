'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonitoringPemakaian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonitoringPemakaian.init({
    name: DataTypes.STRING,
    no_order: DataTypes.STRING,
    satuan: DataTypes.STRING,
    satuanb: DataTypes.STRING,
    ins: DataTypes.INTEGER,
    out: DataTypes.INTEGER,
    satuan_akhir: DataTypes.STRING,
    stok_awal: DataTypes.INTEGER,
    merk: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    bahan_aktif: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MonitoringPemakaian',
  });
  return MonitoringPemakaian;
};