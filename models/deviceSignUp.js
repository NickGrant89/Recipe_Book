const mongoose = require('mongoose');

// User schema

const DeviceSuSchema = mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    }
});


let DeviceSu = module.exports = mongoose.model('DeviceSu', DeviceSuSchema);