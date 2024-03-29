const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/products", {
        products: products,
        pageTitle: "All Products"
      });
    })
    .catch(err => {
      console.log("Err: Could Not Load Products " + err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      res.render("shop/product-details", { product: product });
    })
    .catch(err => {
      console.log("Err: Could Not Load Product " + err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/index", {
        products: products,
        pageTitle: "All Products"
      });
    })
    .catch(err => {
      console.log("Err: Could Not Load Products " + err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect("/cart");
    });
};

exports.deleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log("ERR: Could Not Remove Item from Cart, " + err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render("shop/orders", {
        orders: orders,
        pageTitle: "Your Orders"
      });
    })
    .catch(err => {
      console.log("ERR: Could not get orders, " + err);
    });
};

exports.postOrders = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          userId: req.user,
          email: req.user.email
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log("ERR: Could not Create Order, " + err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout"
  });
};
