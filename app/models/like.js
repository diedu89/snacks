'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {}, {
  	hooks: {
  		afterBulkCreate: function(likes){
  			var promises = [];
  			for (var i = 0; i < likes.length; i++) {
  				promises.push(likes[i].getProduct().then(p => p.increment('likes', {by: 1})));
  			}
  			return Promise.all(promises);
  		}
  	}
  });

  Like.associate = function(models) {
    this.belongsTo(models.User, {onDelete: "CASCADE"});
    this.belongsTo(models.Product, {onDelete: "CASCADE"});
  };

  return Like;
};