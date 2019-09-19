const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "All Products"
    });
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id, product => {
    console.log("Item Found:" + product);
  });
  res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      products: products,
      pageTitle: "All Products"
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart"
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders"
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout"
  });
};
