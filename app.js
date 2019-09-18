const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : true}));

app.use('/', adminRoute);

app.use((req,res,next)=>{
    res.status(404).send('<h1>404 Page Not Found</h1>')
})

app.listen(3000);