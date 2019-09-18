const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use('/shop', shopRoute);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir, 'views', '404NotFound.html'));
})

app.listen(3000);