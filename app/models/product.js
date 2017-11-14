'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: { 
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING(1234),
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      defaultValue: 0
    },
    likes:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    } 
  });

  Product.associate = function(models) {
    this.hasMany(models.PriceLog, {onDelete: "CASCADE"});
  };


  return Product;
};