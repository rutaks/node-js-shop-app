const Sequelize = require("sequelize"),
  sequelize = require("../util/database");

const CartItem = Sequelize.define("cartItem", {
  id: {
    type: Sequelize.STRING,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
