const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    try {
        // Get the token from header
        const token = req.headers.authorization.split(" ")[1]; // This removes the bearer
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('-');
        console.log(decoded);
        req.userData = decoded;
        next();

    } catch (error) {
        res.status(401).json({
            message: error
        })
    }

};