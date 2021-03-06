const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //for hashing the password
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

//importing express validator for checks
const { check, validationResult } = require('express-validator');

//Importing user model
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private

router.get('/',auth,async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public

router.post('/',[
        check('email', 'Please include  a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {             //if error array is empty
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            
            if(!user) {
                return res.status(400).json({ msg: 'Invalid Credentials'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {              //if the saved password and entered password are not same using bcrypt
                return res.status(400).json({ msg: 'Invalid Credentials ' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;