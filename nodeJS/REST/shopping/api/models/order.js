const mongoose = require('mongoose');


// we want to tie order to products in let's say a shopping cart. 
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // This is model in products.js model to tie with an aorder
            //        required: true
    },
    quantity: { type: Number, default: 1 } // Start out with 1 item

});

module.exports = mongoose.model('Order', orderSchema);