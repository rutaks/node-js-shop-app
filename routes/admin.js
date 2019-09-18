const router = require('express').Router();
const path = require('path');
const productController = require('../controller/products');
const rootDir = require('../util/path');

router.get('/', productController.listAllProducts)

router.get('/add-product', productController.getAddProductPage)

module.exports = router