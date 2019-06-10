const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a Schema which is like aplan and then a model whihc is the object that we shall ahndle
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'                                // Object iud from Event model (this has to be the same name as the model. )
        }
    ]


});

// Eport the modle so it can be used in other modules.
module.exports = mongoose.model('User', userSchema);