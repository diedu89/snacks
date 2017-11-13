'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique:true, validate: {isEmail: true}},
    username: {type: DataTypes.STRING, unique:true},
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: function(user, options){
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.Role, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  User.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};