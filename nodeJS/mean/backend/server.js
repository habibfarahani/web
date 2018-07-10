//import express from 'express';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Issue = require('./models/issue');

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('');
const connection = mongoose.coonection;

connection.once('open', () => {
    console.log('MongoDB connected successfully');
});

router.route('/issue').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    })
});


router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issue);
        }
    });

});


router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.staus(200).json({ 'issue': 'Added Successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create  anew record');
        })
})

app.use('/', router);

// app.get('/', (req, res) => {
//     res.send('Hello World!!');
// })

app.listen(4000, () => console.log('Express Server runnig on port 4000'));