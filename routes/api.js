const express = require('express');
const router = express.Router();


let Device = require('../models/device');

//GET Method for devices // API Functions

router.get('/devices', (req, res) => {
    
    Device.find({}, function(err, devices){
        if(err){
            console.log(err)
        }else{
    res.send(devices);
    console.log(devices);
        }
    
    })
    
});

//GET Singel device :id

router.get('/devices/:id', (req, res) => {

    const device = Device.find(d => d._id === parseInt(req.params._id))
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
    res.send(device);
    
});

//Post requests to add device

router.post('/devices', (req, res) => {
    const {error} = validateDevice(req.body);

   if(error){
       res.status('404').send(error.details[0].message)
       console.log(error.details[0].message);
       return; 
   } 
   //let device = new Device();

    const Device = {
     
        pcname: req.body.pcname
       
    };
    //device.id =  devices.length +1;
    //device.pcname = req.body.pcname;

    device.save();
    res.send(device);
    console.log(device , ' Created 200');
});

//PUT Method update single device

router.put('/devices/:id', (req, res) => {
    const device = devices.find(d => d.id === parseInt(req.params.id))
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

    const {error} = validateDevice(req.body);

    if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);
     
 

    device.name = req.body.name;
    device.ver = req.body.ver;
 
    res.send(device);
    console.log(device, 'Updated 200!');
});

//DEL Method 

router.delete('/devices/:id', (req, res) => {
    const device = Device.find(d => d.id === parseInt(req.params.id))
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

    const index = Device.indexOf(device);

    devices.splice(index, 1);

    res.send(device);
    console.log(device, 'Delete 200 ');

});

module.exports = router;