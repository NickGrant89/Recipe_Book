

let User = require('../models/user');

let Company = require('../models/company');

const of = require('../middleware/onec-functions');


module.exports = (req, res, next) => {
    try{
        const decoded = of.deCodeed(req.headers.authorization);
        
        User.findById(decoded.userId, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

                Company.findById(req.params.id, function(err, company){
                    if(err)return res.status(500).send("There was a problem finding the user.");
                    if(user.admin == 'Super Admin')return next();
                    if(user.company != company.name && user.admin == 'Super Admin' || user.admin == 'Admin'){
                    return res.status(401).send("Unauthorized");
                    } 
                    next();
                });
        });
       
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
}