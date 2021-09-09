const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:c8ead41b25144e7b83a6c89d08dca88f@localhost:5432/BlueBadge"
);

module.exports = sequelize;
