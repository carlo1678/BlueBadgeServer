const { DataTypes } = require("sequelize");
const db = require("../db");

const Game = db.define("game", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Game;
