'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    role: { type: DataTypes.STRING, unique: true }
  });

  Role.associate = function(models) {
    this.hasMany(models.User);
  };

  return Role;
};