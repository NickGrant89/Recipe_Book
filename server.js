//Using modual

const morgan = require('morgan'); // Console Logger
const Joi = require('joi');  // Joi is a validator, making code smaller//
const express = require('express'); // Express Framework
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database')
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
const csv = require('fast-csv');

const helmet = require('helmet');
const parse = csv.parse();
const pugpdf = require('pug-pdf');

/* fs.createReadStream('./data.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', row => console.log(row)) */

  

// This calls the Device model to intergate the DB

const ensureAuthenticated = require('./middleware/login-auth')

let Site = require('./models/site');

let User = require('./models/user');

let Company = require('./models/company');

let Recipe = require('./models/recipe');


// Call Moongoose connection
const mongoose = require('mongoose');
mongoose.connect(config.database, {useNewUrlParser: true});

// Starting DB connection

let db = mongoose.connection;

db.once('open', function(err){
    console.log('MongoDB Live');
    if(err){
        console.log(err)
    }

})

db.on('error', function(err){
    console.log(err);

});

const app = express();
app.use(express.json());

app.use(helmet());
app.disable('x-powered-by')

//Logs all requests to the consol.
app.use(morgan('dev'));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'));


// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers', Origin, X-Requested-With, Content-Type, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

//Set Public folder

//app.use(express.static(path.join(__dirname, 'public')))

//app.use(express.static(path.join(__dirname, 'NewSB')))

app.use(express.static(path.join(__dirname, 'recipeBook')))

//Express session Middleware

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'Fam!lyGuy2o19',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection, 
                            ttl: 1 * 24 * 60 * 60 })
  }));

  //Express message middleware

  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Passport Config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
})


//GET display SB Admin page

app.get('/', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
        if(user.admin == 'Super Admin'){
           return res.redirect('/admin/dashboard')
        } 
        //console.log(user)
    Site.find({'name': user.sites}, function(err, sites){
        User.find({}, function(err, users){
            Company.find({}, function(err, companies){
            Company.countDocuments({'name':user.company}, function(err, numOfCompanies) {
                Site.countDocuments({'name': user.sites}, function(err, numOfSites) {
                    Recipe.find({}, function(err, recipes) {
                        User.countDocuments({'company': user.company}, function(err, numOfUsers) {
                       
                            if(err){
                                console.log(err)
                            }
                            else{
                                res.render('recipes', {
                                    title:'Dashboard',
                                    sites: sites,
                                    users:users,
                                    companies:companies,
                                    numOfCompanies: numOfCompanies,
                                    numOfSites: numOfSites,
                                    numOfUsers:numOfUsers,
                                    recipes:recipes,
                                    
            
                                });
                                //console.log(recipes)
                            }
                        });        
                    });  
                });
            });
        });
        });         
    });
});
});


// Route File

let users = require('./routes/users');
let jwt = require('./routes/apiJWT');
let apiRecipe = require('./routes/apiRecipe');
let companies = require('./routes/companies');
let site = require('./routes/sites');
let admin = require('./routes/admin');
let recipe = require('./routes/recipes');

app.use('/users', users);
app.use('/api/v1/recipes/', apiRecipe);
app.use('/api/v1/auth/', jwt);
app.use('/companies', companies);
app.use('/sites', site);
app.use('/admin', admin);
app.use('/recipes', recipe);

/* app.use('*', function(req, res) {
    res.status(404).end();
    res.redirect('/');
  });  */
 
app.use(function (req, res, next) {
//res.status(404).send("Sorry can't find that!")
res.redirect('/');
}); 

const ip = process.env.IP ;
const port = process.env.Port || 3000;

app.listen(port, ip, () => console.log('Example app listening on port' + ' ' + port +  '!'))
