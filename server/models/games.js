const { DataTypes } = require("sequelize");
const db = require("../db");

const Game = db.define("game", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Game;
