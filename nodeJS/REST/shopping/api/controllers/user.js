const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signup = (req, res, next) => {

    // Make sure this user already does not exit. So serach the DB first
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // Check if the user is found in then part of the promise
            console.log(user);
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "email already exists"
                });
            } else {
                // User is not found so, encrypt the password and store the uer
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // If there is any errors
                    console.log('hash  ' + hash);
                    if (err) {
                        // report the error
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        // Otherwise create the user and store the credentials
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user.save()
                            .then(results => {
                                console.log(results);
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })

            }
        })
        .catch();
}

exports.user_login = (req, res, next) => {
    console.log(req.body);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // We jave found a user that exists
            console.log(user);

            console.log('===================================');

            console.log(user[0].password)
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log('Compare is done');
                if (err) {
                    res.status(401).json({
                        message: 'Auth Failed!'
                    });
                }

                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        }
                    )
                    res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                } else {
                    res.status(401).json({
                        message: 'Auth Failed!'
                    });
                }
            })
        })
        .catch();
}


exports.user_delete = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log('Found user to delete:');
                console.log(user);
                User.remove({ _id: req.params.userId })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            mesage: "User deleted"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })


            } else {
                res.status(500).json({
                    message: "User is not found to delete"
                })

            }
        })
        .catch(err => {
            console.log(err);
        })

}

exports.user_get_users = (req, res, next) => {
    User.find()
        //        .populate('user')
        .exec()
        .then(users => {
            if (users.length >= 1) {
                const response = {
                    count: users.length,
                    us: users.map(user => {
                        return {
                            email: user.email,
                            _id: user._id,
                        }
                    })
                }
                console.log(response);

                return res.status(409).json(response);


            } else {
                return res.status(500).json({
                    message: "No users found"
                });

            }

        })
        .catch()

}