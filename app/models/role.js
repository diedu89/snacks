'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    role: { type: DataTypes.STRING, unique: true }
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Role;
};