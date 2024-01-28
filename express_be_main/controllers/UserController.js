const User = require('../models/User');

/* GET users listing. */
exports.index = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send('Server error');
    }
}