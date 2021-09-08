const { DataTypes } = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
  image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Song;
