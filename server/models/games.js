const { DataTypes } = require("sequelize");
const db = require("../db");

const Game = db.define("game", {
  image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Game;
