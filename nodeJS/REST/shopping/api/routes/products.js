const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {

    Product.find()
        .select('name price _id')
        .populate('product')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    // Return an object with some meta data placed in request.
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Xreated producy successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });


});


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("From Databse", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                })
            } else {
                res.status(404).json({ message: 'No Valid entry found for Product Id' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });

        });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (ops of req.body) {
        updateOps[ops.propName] = ops.value;
        console.log(ops);
    }

    Product.update({ _id: id }, {
            //                    $set: { name: req.body.newName, price: req.body.newprice } 
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });

        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:productId', (req, res, next) => {

    const id = req.params.productId;

    Product.remove({ _id: id })
        .exec()
        .then(results => {
            //            res.status(200).json(results);
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    if (id === 'special') {
        res.status(200).json({
            message: 'Hitting special id'
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'

        });
    }

});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Products'

    });
});

router.delete('/:productId', (req, res, next) => {
    console.log(req)
    res.status(200).json({
        message: 'Deleted product'

    });

});
module.exports = router;