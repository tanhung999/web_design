const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');
const db = require('./config/db/index');
const cors = require("cors");

let corsOptions = {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
  };
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.use('/products',productRoutes);
app.use('/users',userRoutes);


app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin,X-Requested-With,Content-Type,Accept.Authorization");
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,DELETE,GET,PATCH");
        return res.status(200).json({});
    }
});
app.use((req,res,next)=> {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=> {
    res.status(error.status||500);
    res.json({
        error: {
            message:error.message
        }
    })
});

// Connected MongoDB
db.connect();

mongoose.Promise=global.Promise;

module.exports = app;