const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '465554',
    key: 'd2e7786a1451ece4e949',
    secret: 'f63d41683a806819c43e',
    cluster: 'us2',
    encrypted: true
});


router.get('/', (req, res) => {
    // Get the data from database
    Vote.find().then(votes => {
        console.log(votes);
        res.json({ success: true, votes: votes })
    });

});

router.post('/', (req, res) => {
    // increment and ave in database
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        // Now send the trigger
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
    });


    return res.json({
        success: true,
        message: 'Thank you for voting'
    });
});

module.exports = router;