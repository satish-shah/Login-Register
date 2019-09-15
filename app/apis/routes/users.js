const express = require('express')
const User = require('../models/users')

const router = express.Router()

router.post('/users/register', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email_address, password } = req.body
        console.log(email_address)
        const user = await User.findByCredentials(email_address, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
      console.log("Printing error")
      console.log(error)
      res.status(400).send({error: 'Login failed! Check authentication credentials.'});
    }

});

module.exports = router;
