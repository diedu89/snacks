'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique:true, validate:{ isEmail: true } },
    username: { type: DataTypes.STRING, unique:true },
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Role, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      },
      testMethod: function(){
        console.log("a model test method, here business logic will be store")
      }
    }
  });
  return User;
};