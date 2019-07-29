const express = require('express');
const router = express.Router();

//Access Control
const ensureAuthenticated = require('../middleware/login-auth');

const checkServer = require('../middleware/check-server');

let Device = require('../models/device');

let User = require('../models/user');

let Site = require('../models/site');

let Company = require('../models/company');

const of = require('../middleware/onec-functions');


//Device check in view
router.get('/checkin', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function (err, user) {
        if(user.admin != 'Super Admin'){
            req.flash('danger', 'Unauthorized');
            res.redirect('/');
        }
        else{
            Company.find({}, function(err, companies){
                const q = {"status": "Disabled"}
            Device.find(q, function(err, devices){
                if(err){
                    console.log(err)
                }else{
                    res.render('devices_checkin', {
                        title:'Device Check-In',
                        devices: devices,
                        companies:companies,
                    });
                }
            });
        });
        }
    });    
});



//GET Method to display devices on page.

router.get('/', ensureAuthenticated, function(req, res){
   Company.find({}, function(err, companies){
    User.findById(req.user.id, function(err, user){
        if(err){res.redirect('/');}
        if(user.admin == 'Super Admin'){
            return res.redirect('/admin/devices')
        }
            if(user.admin == 'Admin' || 'User'){

                const q = ({"site": user.sites, 'status':'Active'});
                console.log(q);
                Device.find(q, function(err, devices){
                    if(err){
                        console.log(err)
                    }else{
                        //console.log(devices)
                        res.render('devices', {
                            title:'Devices',
                            devices: devices,
                            companies:companies,
                        });
                    }
                });
            }
    });
});
});


//GET display add device page with form

router.get('/add', ensureAuthenticated, function(req, res){
    Site.find({}, function(err, sites){
        Company.find({}, function(err, companies){
            res.render('add_device', {
                title:'Add Device',
                sites: sites,
                companies: companies,

            });
        });
    });
});

//Get single device page

router.get('/:id', ensureAuthenticated, (req, res) => {
    
    function hello2(type, check) {
         if(type == check){
             return 'true';
         }
         return false;
 }
    Device.findById(req.params.id, function(err, device){
        User.findById(req.user.id, function(err, user){
            if(err){res.redirect('/')}
            if(user.admin == 'Admin' || 'User'){
                Site.find({'company': user.company}, function(err, sites){
                    Company.find({'name': user.company}, function(err, companies){
                        let check = device.deviceSettings.fileTransfer.ftStatus;
                        let type = device.deviceSettings.fileTransfer.type;
                      
                        //console.log(type);
                        res.render('device', {
                            device:device,
                            sites: sites,
                            companies: companies,
                            title: device.pcname,
                            check:check,
                            clientSetTrue:hello2(device.deviceSettings.fileTransfer.type, 'client'),
                            serverSetTure:hello2(device.deviceSettings.fileTransfer.type, 'server'),
                        });
                        //console.log(device);
                    
                    });
                });
          
             
            }
        });     
    });
});

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', ensureAuthenticated, [
    //Name
    check('pcname').isLength({min:3}).trim().withMessage('PC Name required'),
    //Company
    check('ipaddress').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('macaddress').isLength({ min: 6}),

], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/devices/add');

   return { errors: errors.mapped() };
  }
  let device = new Device();
  device.pcname = req.body.pcname;
  device.ipaddress = req.body.ipaddress;
  device.macaddress = req.body.macaddress;
  device.company = req.body.company;
  device.site = req.body.site;

  device.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Device Added')
           res.redirect('/devices')
       }
  });

});


//Add submit device with form
router.post('/edit/:id', ensureAuthenticated,  (req, res) => {
    let device = {};
    device.pcname = req.body.pcname;
    device.status = req.body.status;
    device.pcname = req.body.pcname;
    device.ipaddress = req.body.ipaddress;
    device.macaddress = req.body.macaddress;
    device.site = req.body.site;
    device.company = req.body.company;
  
    let query = {_id:req.params.id}

    Device.updateOne(query, device, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/devices')
         }
    });
    //console.log(req.body.pcname)
 });

 router.post('/settings/:id', ensureAuthenticated, (req, res) => {
    
    //console.log(req.body.ftStatus);
    function f(){
        if(req.body.ftStatus == 'true'){
            return true;
        }
        return false;
    }
    
    //console.log(hello(device));
    var settings = {
        deviceSettings: {
            fileTransfer: {
                type: req.body.type,
                path: req.body.path,
                ftStatus: f()
            }
        },
    }
    //console.log(settings);
    let query = {_id:req.params.id}

    Device.updateOne(query, settings, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/devices')
         }
    });
    //console.log()

 });

 //Delete edit form
router.delete('/:id', ensureAuthenticated, (req, res) => {
    /* if(!req.user._id){
        res.status(500).send();
    } */

    let query = {_id:req.params.id}

    Device.findById(req.params.id, function(err, device){
        /* if(device.owner != req.user._id){
            res.status(500).send();
        }else{ */
            Device.deleteOne(query, function(err){
                if(err){
                    console.log(err)
                }
                res.send('Success');
            });
        //}
    });
});

module.exports = router;