const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product"
  });
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imgUrl,
    description: description
  })
    .then(res => {
      console.log("Product Create");
    })
    .catch(err => {
      console.log(err);
    });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("admin/Products", {
        products: products,
        pageTitle: "Admin Products"
      });
    })
    .catch(err => {
      console.log("An Error Occured");
    });
};
