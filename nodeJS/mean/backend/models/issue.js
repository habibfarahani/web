var mongoose = require('mongoose');

// Creste a schema for favorite
const issueSchema = mongoose.Schema;

let Issue = new issueSchema({
    title: {
        type: String //,
            //        required: true,
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    } //,
    // create_date: {
    //     type: Date,
    //     default: Date.now
    // }
});


export default mongoose.model('Issue', Issue);