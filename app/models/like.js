'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {}, {});
  return Like;
};