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
  }, {
    hooks: {
      afterUpdate: function(product, options){
        var oldPrice = product.previous("price");
        if(oldPrice != product.price){        
          product.createPriceLog({
            oldPrice: oldPrice,
            newPrice: product.price
          }).then();
        }
      }
    }
  });

  Product.associate = function(models) {
    this.hasMany(models.PriceLog, {onDelete: "CASCADE"});
    this.belongsToMany(models.User, {through: "Like"});
    //this.belongsToMany(models.User, {through: "Purchase", as: 'Buyers', unique: false});
    this.hasMany(models.Purchase);
  };


  return Product;
};