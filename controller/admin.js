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

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then(product => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const { id, title, imgUrl, price, description } = req.body;
  Product.findByPk(id)
    .then(product => {
      product.id = id;
      product.title = title;
      product.imageUrl = imgUrl;
      product.price = price;
      product.description = description;
      product.save();
    })
    .then(res => {
      res.redirect("/admin/");
    })
    .catch(err => console.log(err));
  console.log(id);
};
