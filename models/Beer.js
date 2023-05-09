const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Beer extends Model {}
    Beer.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        tagline: {
        type: DataTypes.STRING,
        allowNull: false
        },
        description: {
        type: DataTypes.LONGTEXT,
        allowNull: false
        },
        images: {
        type: DataTypes.STRING,
        allowNull: false
        },
    });
