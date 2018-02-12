const mongoose = require('mongoose');

// Map global promises

mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect('mongodb://habibf:habibf1234@ds121248.mlab.com:21248/hfpusherexample')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));