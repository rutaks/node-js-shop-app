const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : true}));

app.use('/admin', adminRoute);
app.use('/shop', shopRoute);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404NotFound.html'));
})

app.listen(3000);