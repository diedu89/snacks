'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: function(user, options){
        console.log("--------------- hook before create --------");
      },
      afterBulkCreate: function(purchases, options){
        console.log("-------------- hook after create ----------");
      }
    }
  });

  Purchase.associate = function(models) {
    this.belongsTo(models.User, {onDelete: "CASCADE"});
    this.belongsTo(models.Product, {onDelete: "CASCADE"});
  };

  return Purchase;
};