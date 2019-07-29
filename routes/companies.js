const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/login-auth');

//company Model
let Company = require('../models/company');

let Site = require('../models/site');

let User = require('../models/user');

router.get('/add', ensureAuthenticated, function(req, res){
    res.render('add_company', {
    title:'Add Company',

    });
});

//Get single company page
router.get('/:id', ensureAuthenticated, (req, res) => {
    Company.find({}, function(err, companies){
    Company.findById(req.params.id, function(err, company){
        User.findById(req.user.id, function(err, user){
            if(err){res.redirect('/');}
            if(user.admin == 'Super Admin'){
                const q = ({"company": company.name});
                Site.find(q, function(err, sites){
                    if(err){
                        console.log(err)
                    }else{
                        res.render('company', {
                            title: company.name,
                            sites:sites,
                            company:company,
                            companies:companies,
                        });
                    }
                });
            }
            if(user.admin == 'Admin' || 'User'){
                const q = ({"name": user.sites});
                //console.log(q);
                Site.find(q, function(err, sites){
                    if(err){
                        console.log(err)
                    }else{
                        //console.log(company)
                        res.render('company', {
                            title: company.name,
                            sites:sites,
                            company:company,
                            companies:companies,
                        });
                    }
                });
            }
        });
    });
});
});



// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', ensureAuthenticated, [
    //Name
    check('name').isLength({min:3}).trim().withMessage('PC Name required'),
    //Company
    check('email').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('address').isLength({ min: 3}),
    // username must be an email
    check('postcode').isLength({min:3}).trim().withMessage('Company Name required'),
    // username must be an email
    check('country').isLength({min:3}).trim().withMessage('Company Name required'),

    check('phone').isLength({min:3}).trim().withMessage('Company Name required'),

], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/');

   return { errors: errors.mapped() };
  }
  let company = new Company();
    company.name = req.body.name;
    company.email = req.body.email;
    company.address = req.body.address;
    company.city = req.body.city;
    company.county = req.body.county;
    company.postcode = req.body.postcode;
    company.country = req.body.county;
    company.phone = req.body.phone;
    company.mobile = req.body.mobile;

  company.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Company Added')
           res.redirect('/companies')
        }
    });

});

//GET Method to display all companies on page.
router.get('/', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
        if(err){res.redirect('/');}
        if(user.admin == 'Super Admin'){
            return res.redirect('/admin/companies')
        }
        if(user.admin == 'Admin' || 'User'){
            const q = ({"name": user.company});
            Company.find(q, function(err, companies){
                if(err){
                    console.log(err)
                }else{
                    res.render('companies', {
                        title:'Company',
                        companies: companies,
                    });
                }
            });
        }
    });
});

//get 'add' company page/page
router.get('/add', ensureAuthenticated, function(req, res){
    res.render('add_company', {
        title:'Add Company',
    });
});

module.exports = router;