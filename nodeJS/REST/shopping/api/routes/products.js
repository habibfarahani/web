const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const multer = require('multer');

// Middleware we created to protect routes.
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

//const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    //    filename: function(eeq, file, cb) {
    filename: (eeq, file, cb) => {
        console.log('file name is: ' + file.originalname);
        //        cb(null, (new Date().toISOString() + file.originalname));
        cb(null, file.originalname);
    }

})

const fileFilter = (req, file, cb) => {
        if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
            cb(null, true); // Callback allows this file to be stored
        } else {
            cb(null, false); // Callback results in this file to be rejected.
        }

    }
    //const upload = multer({ dest: 'uploads/' });
    // Now use the storage as the config
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);


router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);


module.exports = router;