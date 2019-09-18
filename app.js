const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use('/shop', shopRoute);

app.use((req,res,next)=>{
    res.status(404).render('404NotFound')
})

app.listen(3000);