const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a Schema which is like aplan and then a model whihc is the object that we shall ahndle
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    id: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        street: String,
        city: String,
        state: String,
        zip: Number

    },
    email: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    contacts: [
        {
            firstName: { type: String},
            lastName: {type: String},
            email: {type: String},
            phone: {type: String},
        }
    ],

    classes: [
        {
            name: String,
            teacher: {
                name: String,
                email: String,
                phone: String
            },
            period: Number,

        }
    ],

    
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

// Eport the modle so it can be used in other modules.
module.exports = mongoose.model('Student', studentSchema);