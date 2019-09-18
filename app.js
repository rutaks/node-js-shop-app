const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : true}));

app.use('/', adminRoute);

app.listen(3000);