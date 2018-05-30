const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
// Middleware we created to protect routes.
const checkAuth = require('../middleware/check-auth');
router.post('/signup', UserController.user_signup)

router.post("/login", UserController.user_login);

router.delete('/:userId', UserController.user_delete)

router.get('/', checkAuth, UserController.user_get_users);

module.exports = router;