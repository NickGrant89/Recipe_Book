const mongoose = require('mongoose');

// Sites schema

const SiteSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    county:{
        type: String,
        required: true
    },
    postcode:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    }
});


let Site = module.exports = mongoose.model('Site', SiteSchema);