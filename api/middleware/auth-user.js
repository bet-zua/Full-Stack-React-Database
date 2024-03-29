const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
    let message; 
    
    //parse credentials from the authentication header
    const credentials = auth(req);
    //check if credentials are available
    if (credentials) {
        const user = await User.findOne({ where: { emailAddress: credentials.name }})
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for username: ${credentials.name}`);

                req.currentUser = user; 
            } else {
                message = `Authentication failure for username: ${credentials.name}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next(); 
    }
}