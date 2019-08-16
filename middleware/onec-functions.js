const express = require('express');

const Joi = require('joi');  // Joi is a validator, making code smaller//

const jwt = require('jsonwebtoken');

let User = require('../models/user');

let Company = require('../models/company');


exports.deCodeed = function (token) {
    
    const decoded = jwt.verify(token.split(" ")[1], 'secretkey', );
    console.log(decoded);
    return decoded;
};


exports.checkValue = function (value1, value2) {
    if(value1 == value2){
    console.log(value1 + ' ' + value2);
        return true;
    }
    return false;
      
};


//Validation for company

exports.validateCompany= function (company){
    const schema ={
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
        address: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        county: Joi.string().min(3).required(),
        postcode: Joi.string().min(3).required(),
        country: Joi.string().min(3).required(),
        phonenumber: Joi.allow(),
        phone: Joi.allow(),
        mobile: Joi.allow(),
    };

    return Joi.validate(company, schema);
}; 

//Validation for Device Check In

exports.validateCheckIn= function (device){
    const schema ={
        pcname: Joi.string().min(3).required(),
        ipaddress: Joi.string().min(3).required(),
        macaddress: Joi.string().min(3).required(),
        status: Joi.string().min(3).required(),
        timestamp: Joi.string().min(3).required(),
    };

    return Joi.validate(device, schema);
}; 

//Validation for Device Check In

exports.validateCheckIn= function (device){
    const schema ={
        pcname: Joi.string().min(3).required(),
        ipaddress: Joi.string().min(3).required(),
        macaddress: Joi.string().min(3).required(),
        status: Joi.string().min(3).required(),
        timestamp: Joi.string().min(3).required(),
    };

    return Joi.validate(device, schema);
};

exports.checkUserRole= function (userID1) {
  
    User.findById(userID1, function(err, user){
       if(err)
       if(user) return user
    });
    

};

exports.checkUserUser= function (userRole) {
  console.log(userRole);
    if(userRole == 'User'){
        return true;
    }
 
    return false;
   
};

exports.checkUserAdmin= function (userRole) {
    console.log(userRole);
      if(userRole == 'Admin'){
          return true;    
      }
      return false;
     
  };