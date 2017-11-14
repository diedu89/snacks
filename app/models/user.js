'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, 
      unique:true, 
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING, 
      unique:true
    },
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: function(user, options){
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });

  User.associate = function(models) {
    this.belongsTo(models.Role, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    this.belongsToMany(models.Product, {through: "Like"});
    //this.belongsToMany(models.Product, {through: "Purchase", as: "Purchases", unique: false});
    this.hasMany(models.Purchase);
  }

  User.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};