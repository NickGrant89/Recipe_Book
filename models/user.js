const mongoose = require('mongoose');

// User schema

const UserSchema = mongoose.Schema({
    admin:{
        type: String
    },    
    name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    company:{
        type: String
    },
    sites:[String],
    password:{
        type: String
    },
    userImage:{
        type: String
    }


});


let User = module.exports = mongoose.model('User', UserSchema);