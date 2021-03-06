const jwt = require('jsonwebtoken');

const config = require('config');

//This will check if the user is authenticated or not by checking means comparing  
//the web token generated by json web token

module.exports = function(req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        req.user = decoded.user;
        next(); //use to execute the next funtion or got to the req, res part of the promise
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}