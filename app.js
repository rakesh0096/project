const express = require('express');
var mongoose = require ("mongoose");
var bodyParser = require ("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.text());

mongoose.connect("mongodb://localhost:27017/myProject", { useNewUrlParser:true, useUnifiedTopology :true});
mongoose.connection
.once('open',() => console.log("Database Connected"))
.on('error',(err) =>{
    return err;
})

//routing start//

// routing for user registration and login 

var authRouter = require("./routes/auth");
app.use('/api/auth',authRouter);

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