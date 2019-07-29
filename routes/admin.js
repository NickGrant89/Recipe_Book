const express = require('express');
const router = express.Router();

//Access Control
const ensureAuthenticated = require('../middleware/login-auth');


let User = require('../models/user');

let Site = require('../models/site');

let Company = require('../models/company');

const of = require('../middleware/onec-functions');

//Device check in view
router.get('/dashboard', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function (err, user) {
        if(user.admin != 'Super Admin'){
            req.flash('danger', 'Unauthorized');
            res.redirect('/');
        }
        else{
            Site.find({}, function(err, sites){
                User.find({}, function(err, users){
                    Company.find({}, function(err, companies){
                    Company.countDocuments({}, function(err, numOfCompanies) {
                        Site.countDocuments({}, function(err, numOfSites) {
                            User.countDocuments({}, function(err, numOfUsers) {
                                Device.countDocuments({}, function(err, numOfDevices) {
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        res.render('admin_dashboard', {
                                            title:'Dashboard',
                                            sites: sites,
                                            users:users,
                                            companies:companies,
                                            numOfCompanies: numOfCompanies,
                                            numOfSites: numOfSites,
                                            numOfUsers:numOfUsers,
                                            numOfDevices:numOfDevices,
                                        });
                                    }
                                });        
                            });  
                        });
                    });
                });         
            });
        });
        }
    });    
});

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


router.get('/sites', ensureAuthenticated, function(req, res){
    Company.find({}, function(err, companies){
    User.findById(req.user.id, function(err, user){
        //if(err){res.redirect('/');}
        if(user.admin == 'Super Admin'){
            Site.find({}, function(err, sites){
                
                if(err){
                    console.log(err)
                }else{
                    res.render('admin_sites', {
                        title:'Sites',
                        sites: sites,
                        companies: companies,
                    });
                }
            });
        }
        
    });
});
});

//GET Method to display devices on page.

router.get('/devices', ensureAuthenticated, function(req, res){
    Company.find({}, function(err, companies){
     User.findById(req.user.id, function(err, user){
         if(err){res.redirect('/')}
             if(user.admin != 'Super Admin'){
                req.flash('danger', 'Unauthorized');
                res.redirect('/');
             }else{
                Device.find({}, function(err, devices){
                    if(err){
                        console.log(err)
                    }else{
                        res.render('admin_devices', {
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



 //GET Method to display all companies on page.
router.get('/companies', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
        if(err){res.redirect('/');}
        if(user.admin != 'Super Admin'){
            req.flash('danger', 'Unauthorized');
            res.redirect('/');
        }else{
            Company.find({}, function(err, companies){
                if(err){
                    console.log(err)
                }else{
                    res.render('admin_companies', {
                        title:'Companies',
                        companies: companies,
                    });
                }
            });
        }
    });
});

//Get all users
router.get('/users', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
        if(err){
            console.log(err)
        }
        if(user.admin != 'Super Admin'){
            
        }
        else{
            User.find({}, function(err, users){
                Company.find({}, function(err, companies){
                res.render('admin_users', {
                    title:'Users',
                    users: users,
                    companies:companies,
                });
            });
        });
        }
    });
});

router.get('/device/:id', ensureAuthenticated, (req, res) => {
    function hello(type) {
        if(type == 'client true'){
         return 'true';
         }
    }
    function hello2(type) {
         if(type == 'server true'){
             return 'true';
         }
 }
    Device.findById(req.params.id, function(err, device){
        User.findById(req.user.id, function(err, user){
            if(err){res.redirect('/')}
                Site.find({}, function(err, sites){
                    Company.find({}, function(err, companies){
                        let check = device.deviceSettings.fileTransfer.ftStatus;
                        let type = device.deviceSettings.fileTransfer.type;
                      
                        //console.log(type);
                        res.render('device', {
                            device:device,
                            sites: sites,
                            companies: companies,
                            title: device.pcname,
                            check:check,
                            clientSetTrue:hello(type),
                            serverSetTure:hello2(type),
                        });
                        //console.log(device);
                    
                    });
                });
        });     
    });
});

module.exports = router;