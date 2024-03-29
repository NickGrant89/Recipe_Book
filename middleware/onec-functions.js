const express = require('express');

const Joi = require('joi');  // Joi is a validator, making code smaller//

const jwt = require('jsonwebtoken');

let User = require('../models/user');

let Company = require('../models/company');

//const csv = require('csv-parser');
const fs = require('fs');
const csv = require('fast-csv');


exports.deCodeed = function (token) {
    
    const decoded = jwt.verify(token.split(" ")[1], 'secretkey', );
    console.log(decoded);
    return decoded;
};


exports.checkValue = function (value1, value2) {
    if(value1 == value2){
    //console.log(value1 + ' ' + value2);
        return true;
    }
    return false;
      
};

exports.ReadCSV = function () {
    //var a = row

    const fileRows = [];
    // open uploaded file
    csv.fromPath('data.csv')
    .on("data", function (data) {
        fileRows.push(data); // push each row
    })
    .on("end", function () {
        console.log(fileRows)
        //fs.unlinkSync(req.file.path);   // remove temp file
        //process "fileRows" and respond
    })
    // fs.createReadStream('data.csv')
    // .pipe(csv())
    // .on('data', (row) => {
    //     var a = row;
    //     console.log(row);
    //     return a;
    // })
    // .on('end', () => {
    //     console.log('CSV file successfully processed');
    // });
     //return a; 
    
};

exports.checkArray = function (sites, checkArray) {
    var a = []; 
    var b = sites;
    for(var o = 0; o < b.length; o++) {
        a.push(hello4(b[o].name));
        //console.log(b[o].name)
    }

    function hello4(s1) {
        if(checkArray == null){return false};
        //console.log(s1 + ' '+ checkArray)
            for(var i = 0; i < checkArray.length; i++) {
                if(checkArray[i] == s1){
                    
                    return true;
                }
                
            }
            return false;
    }   
       
    return a;  
};

exports.checkAllergies = function (allergiesArray) {
        var a = []; 
            var b = ["Gluten","Peanuts","Tree_Nuts","Celery","Mustard","Eggs","Milk","Sesame","Fish","Crustaceans","Molluscs","Soya","Sulphites","Lupin"];
            for(var o = 0; o < b.length; o++) {
                a.push(hello2(b[o]));
            }
          
            function hello2(s1) {
                if(allergiesArray == null){return false};
                    for(var i = 0; i < allergiesArray.length; i++) {
                        if(allergiesArray[i] == s1){
                            return true;
                        }
                    }
                    return false;
            }   
        return a;
};

exports.checkAllergiesImages = function (allergiesArray) {
    var a = []; 
        
        for(var o = 0; o < allergiesArray.length; o++) {
            a.push(hello2(allergiesArray[o]));
        }
      
        function hello2(s1) {
            var b = ["Gluten","Peanuts","Tree_Nuts","Celery","Mustard","Eggs","Milk","Sesame","Fish","Crustaceans","Molluscs","Soya","Sulphites","Lupin"];
            if(allergiesArray == null){return false};
                for(var i = 0; i < b.length; i++) {
                    if(b[i] == s1){
                        var path = '/images/allergen/' + b[i] +'.png'
                        var path2 = {image:'/images/allergen/' + b[i] +'.png', title:b[i]}
                        return path2;
                    }
                }
                return null;
        }   
    return a;
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