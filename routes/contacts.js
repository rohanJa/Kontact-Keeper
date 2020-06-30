const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator')

const User = require('../models/User');
const Contact =  require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private

router.get('/',auth, async (req, res) => {
    
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contacts
// @access  Private

router.post('/',
    [ 
        auth, 
        [
            check('name', 'Name is required')
            .not()
            .isEmpty()
        ]      
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;
        
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            const contact = await newContact.save();

            res.json(contact);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private

router.put('/:id', auth, async (req, res) => {

    const { name, email, phone, type } = req.body;

    //Build contact object

    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email =email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found'});

        //Make sure user owns contact 
        if(contact.user.toString() !== req.user.id) {       //check if the user is valid who updating the contact means he/she is owner of the contact
            return res.status(401).json({ msg: 'Not authorized'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true } //if contact does not exists it will create it
        );

        res.json(contact);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/contacts/:id
// @desc    DELETE contact
// @access  Private

router.delete('/:id', auth, async (req, res) => {


    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Contact not found' });

    //make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {          //check if the user is valid who deleting the contact means he/she is owner of the contact
        return res.status(401).json({ msg: 'Not authorized'});
    }
    
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
});

module.exports = router;