exports.getAddProductPage = (req, res, next) => {
    res.render('add-product');
}

exports.listAllProducts = (req, res, next) => {
    res.render('shop');
}