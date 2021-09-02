const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:Carl0Carb0nell!!@localhost:5432/bluebadge"
);

module.exports = sequelize;
