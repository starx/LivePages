const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require("../services/UserService");

/*
 * Example auth implementation
 */
exports.index = async (req, res, next) => {
    // console.log( req.body )
    const { username, password } = req.body;
    console.log(`authentication request received: Username: ${username}, Password: ${password}`);
    
    // Un comment the following to fetch the user from db
    // const user = UserService.findUserByName(req.body.username);
    // if (user == null) {
    //     return res.status(400).send('Cannot find user');
    // }

    const user = {
        name: username,
        password: await bcrypt.hash(password, 10)
    };

    try {
        if (await bcrypt.compare(password, user.password)) { 
            console.log('authenticated')
            // User authenticated, create and return JWT
            const accessToken = jwt.sign({ username: user.name }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.send('Not Allowed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}