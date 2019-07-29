// API Devices Functions
const express = require('express');
const router = express.Router();
const Joi = require('joi');  // Joi is a validator, making code smaller//
const checkAuth = require('../middleware/check-auth');

// Import Device Model
let Company = require('../models/company');

let Site = require('../models/site');

let User = require('../models/user');

//GET Method for all Devices 

router.get('/', checkAuth, (req, res) => {
    Device.find({}, function(err, devices){
        if(err){
            console.log(err)
        }else{
            //res.send(devices);
            res.json({
                devices
            })
            console.log(devices);
        }

    });
});

//GET params device :

router.get('/nick', checkAuth, (req, res) => {
    const company = req.query.id;
    const site = req.query.site;
    const device = req.query.device;

    res.send(company + site + device);
});

//GET Singel device :id

router.get('/check/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
        if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
            res.send(device.deviceSettings);           
                
        });  
});

//GET files :id

router.get('/getFiles/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
        Device.find({'company': device.company }, 'deviceSettings pcname ', function(err, devices){

        
        if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
            res.send(devices);           
                
        });  
    });
});

//GET device by :macaddress

router.get('/find/:macaddress', checkAuth, (req, res) => {
    const q = ({"macaddress": req.params.macaddress});
    Device.findOne(q, function(err, device){
        if(err)           
        return res.status(404).send('Not Found!'), console.log('ID not found!')
        if(device == null){
        return res.status(404).send('Not Found!'), console.log('ID not found!')
        }
        else{
            res.json({
                _id: device._id,
                
            });
        }
    });  
});

//POST to add device

router.post('/', checkAuth, (req, res) => {
    const {error} = validateDevice(req.body);

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    } 

    let device = new Device();
    device.pcname = req.body.pcname;
    device.ipaddress = req.body.ipaddress;
    device.macaddress = req.body.macaddress;
    device.status = req.body.status;
    device.timestamp = req.body.timestamp;
    device.deviceinfo = req.body.deviceinfo;
    device.winver = req.body.winver;
    device.ocslogfile = req.body.ocslogfile;


    device.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(device);
            console.log(device , ' Created 200');
        };

    });
});

//PUT Method update single device

router.put('/:id', checkAuth, (req, res) => {
    Device.findById(req.params.id, function(err, device){
        if(!device) return res.status('404').send('The device with the given ID cannot be found!'), console.log('ID not found!')

        //const {error} = validateDevice(req.body);

        //if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);

        device.pcname = req.body.pcname;
        device.ipaddress = req.body.ipaddress;
        device.macaddress = req.body.macaddress;

        device.deviceinfo = req.body.deviceinfo;
            device.windowsversion = req.body.windowsversion;
            device.cpu = req.body.cpu;
            device.availablememory = req.body.availablememory;
            device.exipaddress = req.body.exipaddress;
            device.antivirus = req.body.antivirus;
            device.deviceuptime = req.body.deviceuptime;
            device.lastupdated = req.body.lastupdated;

        device.devicestatus = req.body.devicestatus;
            device.cpu = req.body.cpu;
            device.memory = req.body.memory;
            device.network = req.body.network;

        device.harddrivespace = req.body.harddrivespace;
            device.totalspace = req.body.totalspace;
            device.freespace = req.body.freespace;
            device.usedspace = req.body.usedspace;
            
        device.ocslogfile = req.body.ocslogfile;         

        device.save();
        res.send(device);
        console.log(device, 'Updated 200!');
    });
});

//Validation 

function validateDevice(device){
    const schema ={
        pcname: Joi.string().min(3).required(),
        ipaddress: Joi.string().min(3).required(),
        macaddress: Joi.string().min(3).required(),
        status: Joi.string().min(3).required(),
        timestamp: Joi.string().min(3).required(),
    };

    return Joi.validate(device, schema);
} 

module.exports = router;