const { DataTypes } = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Song;
