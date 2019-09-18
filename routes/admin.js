const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

products = []
router.get('/', (req, res, next) => {
    res.render('shop', {"prods": products});
})

router.get('/add-product', (req, res, next) => {
    res.render('add-product');
})

exports.routes = router;