const mongoose = require('mongoose');

// User schema

const CompanySchema = mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    email:{
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
    phonenumber:{
        phone: {type: String},
        mobile: {type: String},
    },
    setting:{
        
    }
});


let Company = module.exports = mongoose.model('Company', CompanySchema);