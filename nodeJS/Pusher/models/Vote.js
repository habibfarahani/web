const mongoose = require('mongoose');

const schema = mongoose.Schema;

const voteSchema = new schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

// Create collections and add schema
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;