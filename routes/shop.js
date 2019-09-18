const router = require('express').Router();
const path = require('path');

router.get('/', (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../' ,'views','shop.html'));
})

router.get('/add-product', (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
})

module.exports = router;