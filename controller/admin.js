const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product"
  });
};

exports.addProduct = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imgUrl: imgUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log("ERR: Could not save Product");
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products"
      });
    })
    .catch(err => {
      console.log("ERR: Could Not Get Products");
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId).then(product => {
    res.render("shop/product-details", {
      product: product,
      pageTitle: "Product Details"
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then(product => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: product
      });
    })
    .catch(err => console.log("ERR: Could not find Product, " + err));
};

exports.editProduct = (req, res, next) => {
  const { id, title, imgUrl, price, description } = req.body;
  Product.findById(id)
    .then(product => {
      product.id = id;
      product.title = title;
      product.imageUrl = imgUrl;
      product.price = price;
      product.description = description;
      product.save();
    })
    .then(result => {
      res.redirect("/admin/");
    })
    .catch(err => console.log("ERR: Could not edit product, " + err));
};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.log("ERR: Could not remove product, " + err);
    });
};
