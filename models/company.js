const mongoose = require('mongoose');

// User schema

const CompanySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
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
    phonenumber:{
        phone: {type: String},
        mobile: {type: String},
    },
    setting:{
        
    }
});


let Company = module.exports = mongoose.model('Company', CompanySchema);