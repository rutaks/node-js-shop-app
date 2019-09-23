const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const app = express();
const sequelize = require("./util/database");
const errorController = require("./controller/error");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({ force: true })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user)
      return User.create({ name: "Samuel Rutakayile", email: "fake@fake.com" });
    else return user;
  })
  .then(user => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
