'use strict';
module.exports = (sequelize, DataTypes) => {
  var PriceLog = sequelize.define('PriceLog', {
    oldPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    newPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  PriceLog.associate = function(models) {
    PriceLog.belongsTo(models.Product, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return PriceLog;
};