"use strict";
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define(
    "review",
    {
      comments: {
        type: DataTypes.TEXT
      },
      store_name: {
        type: DataTypes.STRING(80)
      },
      username: {
        type: DataTypes.STRING(40)
      },
      idorder: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {}
  );
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};
