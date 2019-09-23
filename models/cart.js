const Sequelize = require("sequelize"),
  sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.STRING,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
