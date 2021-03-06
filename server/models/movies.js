const { DataTypes } = require("sequelize");
const db = require("../db");

const Movie = db.define("movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Movie;
