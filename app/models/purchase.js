'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    currentPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    hooks: {
      afterBulkCreate: function(purchases, options){
        var promises = [];
        for (var i = 0; i < purchases.length; i++) {
          var purchase = purchases[i];
          promises.push(purchase.getProduct().then(function(p){ return p.decrement('stock', {by: purchase.quantity}); }));
        }
        return Promise.all(promises);
      }
    }
  });

  Purchase.associate = function(models) {
    this.belongsTo(models.User, {onDelete: "CASCADE"});
    this.belongsTo(models.Product, {onDelete: "CASCADE"});
  };

  return Purchase;
};