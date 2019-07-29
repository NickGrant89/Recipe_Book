let Device = require('../models/device');

module.exports = (req, res, next) => {

        Device.findById(req.params.id, function (err, device) {
            if(err){return}
            Device.find({'company':device.company}, function (err, devices) {
                if(err){return}    
            console.log(devices);
            next();
        });
    });
}