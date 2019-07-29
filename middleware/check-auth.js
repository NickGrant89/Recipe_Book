const jwt = require('jsonwebtoken');

let User = require('../models/user');


module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secretkey', );
            User.findById(decoded.userId, { password: 0 }, function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
               
                 req.userData = decoded;
                    next();
            });
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
}