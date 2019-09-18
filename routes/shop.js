const router = require('express').Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.send('hey')
})

module.exports = router;