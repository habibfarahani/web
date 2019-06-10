const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a Schema which is like aplan and then a model whihc is the object that we shall ahndle
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true

    },

    date: {
        type: Date,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

// Eport the modle so it can be used in other modules.
module.exports = mongoose.model('Event', eventSchema);