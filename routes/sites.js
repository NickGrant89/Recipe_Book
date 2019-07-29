const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/login-auth');

//User Model
let Site = require('../models/site');

let Device = require('../models/device');

let Company = require('../models/company');

let User = require('../models/user');

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', ensureAuthenticated, [
    //Name
    check('name').isLength({min:3}).trim().withMessage('PC Name required'),
    //site
    check('email').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('address').isLength({ min: 3}),
    // username must be an email
    check('postcode').isLength({min:1}).trim().withMessage('site postcode required'),
    // username must be an email
    check('country').isLength({min:1}).trim().withMessage('site country required'),

    check('phonenumber').isLength({min:1}).trim().withMessage('site number required'),

    ], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/');

    //res.render('register',)

   return { errors: errors.mapped() };
    }

  let site = new Site();
  site.status = req.body.status;
  site.name = req.body.name;
  site.email = req.body.email;
  site.address = req.body.address;
  site.city = req.body.city;
  site.county = req.body.county;
  site.postcode = req.body.postcode;
  site.country = req.body.country;
  site.phonenumber = req.body.phonenumber;
  site.company = req.body.company;


  site.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Site Added')
           res.redirect('/sites')
       }
  });

});


//GET Method to display devices on page.

router.get('/', ensureAuthenticated, function(req, res){
    Company.find({}, function(err, companies){
    User.findById(req.user.id, function(err, user){
        if(err){res.redirect('/');}
        if(user.admin == 'Super Admin'){
            return res.redirect('/admin/sites')
        }
        if(user.admin == 'Admin' || 'User'){
            const q = ({"name": user.sites});
            console.log(q);
            Site.find(q, function(err, sites){
                if(err){
                    console.log(err)
                }else{
                    res.render('sites', {
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

//Get single site page
router.get('/:id', ensureAuthenticated, (req, res) => {
    Site.findById(req.params.id, function(err, sites){
            Company.find({}, function(err, companies){
                Site.find({}, function(err, site){
                    User.findById(req.user.id, function(err, user){
                        if(err){res.redirect('/');}
                        if(user.admin == 'Super Admin'){
                            const q = ({"site": sites.name});
                            Device.find(q, function(err, devices){
                                if(err){
                                    console.log(err)
                                }else{
                                    res.render('site', {
                                        title:'Devices',
                                        devices: devices,
                                        sites:sites,
                                        companies:companies,
                                        site:site,
                                    });
                                }
                            });
                        }
                        if(user.admin == 'Admin' || 'User'){
                            const q = ({"site": sites.name, 'status':'Active'});
                            console.log(q);
                            Device.find(q, function(err, devices){
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log(devices)
                                    res.render('site', {
                                        title:'Devices',
                                        devices: devices,
                                        sites:sites,
                                        companies:companies,
                                        site:site,

                                    });
                                }
                            });
                        }
                    });
                   
                });
            });
    });
});

//Load edit form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Site.findById(req.params.id, function(err, sites){
        Company.find({}, function(err, companies){
            res.render('edit_site', {
                title:'Edit Site',
                sites: sites,
                companies: companies,
            });
        });
    });
});

//edit submit form for site
router.post('/edit/:id', ensureAuthenticated, (req, res) => {
    let site = {};
    site.status = req.body.status;
    site.name = req.body.name;
    site.email = req.body.email;
    site.address = req.body.address;
    site.city = req.body.city;
    site.county = req.body.county;
    site.postcode = req.body.postcode;
    site.country = req.body.country;
    site.phonenumber = req.body.phonenumber;
    site.company = req.body.company;


    let query = {_id:req.params.id}

    Site.updateOne(query, site, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/sites')
         }
    });
    console.log(req.body.pcname)
 });

module.exports = router;