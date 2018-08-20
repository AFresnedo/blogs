'use strict';
// eslint-disable-next-line no-use-before-define
module.exports = (sequelize, DataTypes) => { // eslint-disable-line
  var author = sequelize.define('author', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    img: DataTypes.STRING
  }, {});
  author.associate = function(models) {
    models.author.hasMany(models.article);
    models.author.hasMany(models.comments);
  };
  return author;
};
