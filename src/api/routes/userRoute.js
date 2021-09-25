//requirements
const express = require('express');
const bcrypt = require('bcrypt');

//router
const router = express.Router();

//mock database
const users = [];

//ROUTES
//list all users
router.get('/', (req, res) => {
    res.json(users);
})

//create new user
router.post('/', async (req, res) => {
    //grab username and password from request
    const userName = req.body.name;
    const unHashedPassword = req.body.password;
    
    //cheks if user already exists
    if (users.find(user => user.userName == userName)) {
        return res.status(401).send('user already exists')
    }
    
    //try catch for asyncronous code
    try {
        //generate salt and hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(unHashedPassword, salt);

        //new user object
        const newUser = {
            userName,
            hashedPassword,
        }
        //push new user object to mock db
        users.push(newUser);

        //send response
        res.status(201).send();
    } 
    //catch errors
    catch(error) {
        res.status(500).send();
    }
});

//authenticate login
router.post('/login', async (req, res) => {
    //check user exists/find user in mock db
    const user = users.find(user => user.userName === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    //try/catch for asyncronous code
    try {
        //compare password and hash
        //if successful:
        if(await bcrypt.compare(req.body.password, user.hashedPassword)) {
            res.send('Success')
        }
        //if not succesfull
        else {
            res.send('Not Allowed')
        }
    }
    //deal with errors
    catch(error) {
        res.status(500).send()
    }
  })
//exports
module.exports = router;