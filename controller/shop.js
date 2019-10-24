const Product = require("../models/product");

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

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart
//         .getProducts()
//         .then(products => {
//           res.render("shop/cart", {
//             pageTitle: "Your Cart",
//             products: products
//           });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// };

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
