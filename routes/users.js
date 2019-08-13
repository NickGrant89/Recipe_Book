const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Passport Config
require('../config/passport')(passport);

const of = require('../middleware/onec-functions');

const ensureAuthenticated = require('../middleware/login-auth');

//Users Model
let User = require('../models/user');
//Company Model
let Company = require('../models/company');
//Site Model
let Site = require('../models/site');



//Register new user 
router.get('/registerNewuser',  function(req, res){
    let user = new User();
  user.admin = 'SuperAdmin';
  user.name = 'rv';
  user.email = 'rv@rv.com';
  user.company = 'req.body.company';
  user.phone = 'req.body.phone';
  user.username = 'req.body.username';
  user.password = 'rv';
  user.password2 = 'req.body.password2';

  //console.log(user);

  bcrypt.genSalt(10, function(errors, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(errors){
                console.log(err);
            }else{
                user.password = hash;
                //console.log(hash)

                user.save(function(err){
                    if(errors){
                        console.log(err);
                        return;
                    }else{
                        
                        console.log(user);
                    }
                });
            }
        });
    });
});
//login Form
router.get('/login', function(req, res){
    res.render('login', {title:'Login'});

});

//Logout Function
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/users/login');
});

//Get all users
router.get('/', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
        if(err){
            console.log(err)
        }
        if(user.admin == 'Super Admin'){
            return res.redirect('/admin/users')
        } 
        
        const q = {'company': user.company}
        //console.log(q);
        User.find(q, function(err, users){
            Company.find({'name': user.company}, function(err, companies){
            res.render('users', {
                title:'Users',
                users: users,
                companies:companies,
            });
        });
    });
        
    });
});

// Display Single User
router.get('/:id', ensureAuthenticated, (req, res) => {
    User.findById(req.user._id, function(err, users){
    User.findById(req.params.id, function(err, user){
        Site.find({company:user.company}, 'name', function (err, sites){
            Company.find({}, function(err, companies){

                function hello(s) {
                    var a = []; 
                        for(var o in s) {
                            a.push(hello2(s[o].name)); 
                        }
                    return a;
                }
                function hello2(s1) {
                    if(user.sites == null){return false};
                        for(var i = 0; i < user.sites.length; i++) {
                            if(user.sites[i] == s1)
                                return 'true';
                            }
                            return false;
                } 

                var a =  hello(sites);
                
                res.render('user', {
                    user:user,
                    users:users,
                    title: user.name,
                    companies:companies,
                    sites:sites,
                    check:a,
                    userRole:of.checkUserUser(user.admin),
                    adminRole:of.checkUserAdmin(user.admin),

                }); 
             });
        });
    });
});
});

 //Get register form
router.get('/register', ensureAuthenticated,  function(req, res){
    User.findById(req.user.id, function(err, user){
        if(err){
            console.log(err)
        }
        if(user.admin == 'Super Admin'){
            Company.find({}, function(err, companies){
                Site.find({}, function(err, sites){
                    res.render('register', {
                        title:'Create User',
                        companies: companies,
                        sites: sites,
                    });
                });
            });
        }
        else{
            const q = {'company': user.company} 
            Company.find({'name': user.company}, function(err, companies){
                Site.find({q}, function(err, sites){
                    res.render('register', {
                        title:'Create User',
                        companies: companies,
                        sites: sites,
                    });
                });
            });
            
        }
    });
});






//Login Function
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Edit User 
router.post('/edit/:id',  (req, res) => {
    console.log(req.file);
    User.findById(req.user.id, function(err, users){ 
        //console.log(users);
    let user = {};
    user.admin = req.body.admin;
    user.name = req.body.name;
    user.email = req.body.email;
    //user.company = users.company;
    user.phone = req.body.phone;
    user.sites = req.body.sites;
    user.userImage = req.file.path;
    console.log(req.body.sites);
  
    let query = {_id:req.params.id}

    User.updateOne(query, user, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/users')
             
         }
    });
    //console.log()
 });
});

//Register User Function

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/register', [

    //Name
    check('name').isLength({min:3}).trim().withMessage('Name required'),
    //Company
    check('company').isLength({min:1}).trim().withMessage('Company required'),
    //Company
    check('phone').isLength({min:1}).trim().withMessage('Phone Number required'),
    //Username
    check('username').isLength({ min: 1}),
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 8 }),

    //check('password2').equals('password')
], (req, res) => {


  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/users');
    User.find({email:req.body.email}, function(err, user){
        if(user.length >= 1){
        }
                
            });
    //res.render('register',)

   return { errors: errors.mapped() };
  }
  if(req.body.password !== req.body.password2) {
    req.flash('danger' , ('Password confirmation does not match password'));
    res.redirect('/');
    return new Error('Password confirmation does not match password');
    }

  let user = new User();
  user.admin = req.body.admin;
  user.name = req.body.name;
  user.email = req.body.email;
  user.company = req.body.company;
  user.phone = req.body.phone;
  user.username = req.body.username;
  user.password = req.body.password;
  user.password2 = req.body.password2;

  console.log(user);

  bcrypt.genSalt(10, function(errors, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(errors){
                console.log(err);
            }else{
                user.password = hash;
                console.log(hash)

                user.save(function(err){
                    if(errors){
                        console.log(err);
                        return;
                    }else{
                        req.flash('success', 'You are now registered');
                        res.redirect('/users');
                    }
                });
            }
        });
    });
});



module.exports = router;