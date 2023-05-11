const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BeerToTry extends Model {}

BeerToTry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      beer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "beer",
          key: "id",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "beerToTry",
    }
  );
  
  module.exports = BeerToTry;