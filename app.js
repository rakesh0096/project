const express = require('express');
var mongoose = require ("mongoose");
var bodyParser = require ("body-parser");
const app = express();
const config = require('./config/config.json');
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.text());
app.use( bodyParser.json()); 
mongoose.connect(config.db_url, { useNewUrlParser:true, useUnifiedTopology :true});
mongoose.connection
.once('open',() => console.log("Database Connected"))
.on('error',(err) =>{
    return err;
})


//routing start//


// routing for user registration and login 

var authRouter = require("./controllers/auth");
app.use('/api/auth',authRouter);


const checkAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    // check valid

    console.log(req.headers.authorization);

    next();
};

app.use(checkAuth);

// routing for product

var productRouter = require("./routes/products");
app.use('/api/products',productRouter);

// routing for reviews

var reviewRouter = require("./routes/reviews");
app.use('/api/reviews',reviewRouter);

//routing end//



app.listen(4802,() => {
    console.log('server runing on port 4802');
});