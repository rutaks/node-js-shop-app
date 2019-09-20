const Sequelize = require("sequelize");

const db = "shop_app",
  username = "root",
  password = "",
  dialect = "mysql",
  host = "localhost";

const sequelize = new Sequelize(db, username, password, {
  dialect: dialect,
  host: host
});

module.exports = sequelize;
