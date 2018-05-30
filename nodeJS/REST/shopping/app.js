const express = require('express');
const app = express();
const morgan = require('morgan'); // Logging middleware
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');


// Import products route so all REST api will be handled by this route.
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/user');


mongoose.connect('mongodb://habibfarahani:' + process.env.MONGO_ATLAS_PW + '@shoppingcluster-shard-00-00-ggnhy.mongodb.net:27017,shoppingcluster-shard-00-01-ggnhy.mongodb.net:27017,shoppingcluster-shard-00-02-ggnhy.mongodb.net:27017/test?ssl=true&replicaSet=shoppingcluster-shard-0&authSource=admin', {
    //    userMongoClient: true
});


mongoose.promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // Make uploads folder available
// a better and secure way is to create an get API specifically for uploads.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To prevent CORS errors with a client issueing REST requests, inject the following headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Or some url (http://mywebsite.com)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GTE');
        return res.status(200).json({});
    }

    next();
});

// Route which should handle the REST requests
app.use('/products', productRoutes); // All /priduct requistes will be routed appropriately.
app.use('/orders', ordersRoutes); // All /priduct requistes will be routed appropriately.
app.use('/user', usersRoutes); // All /priduct requistes will be routed appropriately.

// handle all errors that make it past these requests

app.use((req, err, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It Works!'
//     })
// });

module.exports = app;