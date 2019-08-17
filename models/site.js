const mongoose = require('mongoose');

// Sites schema

const SiteSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    county:{
        type: String,
        required: false
    },
    postcode:{
        type: String,
        required: false
    },
    country:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },
    phonenumber:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required: false
    },
    company:{
        type: String,
        required: false
    }
});


let Site = module.exports = mongoose.model('Site', SiteSchema);