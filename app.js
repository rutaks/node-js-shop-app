const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const errorController = require('./controller/error');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use('/shop', shopRoute);

app.use(errorController.get404)

app.listen(3000);