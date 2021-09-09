const { DataTypes } = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
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

module.exports = Song;
