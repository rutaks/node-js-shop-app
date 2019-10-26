const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const app = express();
const mongoose = require("mongoose");
const errorController = require("./controller/error");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

require("custom-env").env();

const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "Long ID should be here",
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  User.findById("5db167aa85c99f4d390fd76d")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log("ERR: Could not find User, " + err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.error("ERR: Could not connect to MongoDB");
  });
