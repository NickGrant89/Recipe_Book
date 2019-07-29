// API Devices Functions
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkCompany = require('../middleware/check-company');
const of = require('../middleware/onec-functions');

// Import Device Model
let Company = require('../models/company');

let Site = require('../models/site');

let User = require('../models/user');



//GET Method for all company 

router.get('/', checkAuth, (req, res) => {
    console.log(of.ifSuperAdmin(req.params.id));
    Company.find({}, function(err, company){
        if(err){
            console.log(err)
        }else{
            //res.send(devices);
            res.json({
                company
            })
            //console.log(company);
        }
    }); 
});

//GET Singel Company :

router.get('/nick', checkAuth, (req, res) => {
    const company = req.query.id;
    const site = req.query.site;
    const device = req.query.device;

    res.send(company + site + device);
});

//GET All Company + Sites + Devices - :id

router.get('/:id', checkAuth, checkCompany, (req, res) => {
    
    Company.findById(req.params.id, function(err, company){
        if(err){
            res.send(err);
        }
        const query = {'company': company.name};
            Site.find(query, function(err, site){
                Device.find(query, function(err, device){
                    if(!company) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
                    res.json({
                        company: company,
                        sites: site,
                        devices: device
                        
                    });
                });
            }); 
        });
    }); 


//POST to add Company

router.post('/', checkAuth, (req, res) => {
    const {error} = of.validateCompany(req.body);
    const auth = req.headers.authorization.split(" ")[1];

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    } 

    

    let company = new Company();
    company.name = req.body.name;
    company.email = req.body.email;
    company.address = req.body.address;
    company.city = req.body.city;
    company.county = req.body.county;
    company.postcode = req.body.postcode;
    company.country = req.body.county;
    company.phonenumber = req.body.phonenumber;
    company.phone = req.body.phone;
    company.mobile = req.body.mobile;


    company.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(company);
            console.log(company , ' Created 200');
        };

    });
});

//PUT Method update single company

router.put('/:id', checkAuth, (req, res) => {
    Company.findById(req.params.id, function(err, company){
        if(!company) return res.status('404').send('The company with the given ID cannot be found!'), console.log('ID not found!')

        const {error} = of.validateCompany(req.body);

        if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);

        company.companyname = req.body.companyname;
        company.email = req.body.email;
        company.address = req.body.address;
        company.city = req.body.city;
        company.county = req.body.county;
        company.postcode = req.body.postcode;
        company.country = req.body.county;
        company.phonenumber = req.body.phonenumber;
        company.phone = req.body.phone;
        company.mobile = req.body.mobile;  

        company.save();
        res.send(company);
        console.log(company, 'Updated 200!');
    });
});



//DEL Method company

router.delete('/:id', checkAuth, (req, res) => {
        Company.findById(req.params.id, function(err, company){
            if(!company) return res.status(404).send('The company with the given ID cannot be found!'), console.log('ID not found!')

            company.remove(company._id);

            res.send(company + 'Delete 200');
            console.log(company, 'Delete 200 ');
        });
    });


module.exports = router;