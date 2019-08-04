const express = require('express');
const router = express.Router();
const multer = require('multer');

//Image Upload Function
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb ){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({storage: storage, limits:{
        fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
});

const ensureAuthenticated = require('../middleware/login-auth');

//company Model
let Company = require('../models/company');

let Site = require('../models/site');

let User = require('../models/user');

let Recipe = require('../models/recipe');

//GET All Recipes
router.get('/', ensureAuthenticated, function(req, res){
    Recipe.find({}, function(err, recipes){
                    res.render('recipes', {
                        title:'Recipes',
                        recipes: recipes,
                    });
                
            });
        });

//Get single Recipe page
router.get('/:id', ensureAuthenticated, (req, res) => {
    Recipe.findById(req.params.id, function(err, recipe){
            res.render('recipe',{
                recipe:recipe,

            });
            //console.log(recipe)
        });

    });



//Add recipe.
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', upload.single('image'),[
    //Name
    check('title').isLength({min:3}).trim().withMessage('Title required'),
    //Company
    check('description').isLength({min:1}).trim().withMessage('Description required'),
    
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/');
    console.log(req.file);
   return { errors: errors.mapped() };
  }
  let recipe = new Recipe();
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.image = req.file.path;
    recipe.timetocook = req.body.timetocook;
    recipe.dfficulty = req.body.dfficulty;
    recipe.servings = req.body.servings;
    recipe.ingredients = req.body.ingredients;
    recipe.directions = req.body.directions;
    //console.log(req.body.path);

  recipe.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Recipe Added')
           res.redirect('/recipes')
        }
    });

});

//Edit recipe
router.post('/edit/:id', ensureAuthenticated,  (req, res) => {
    let recipe = {};
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.timetocook = req.body.timetocook;
    recipe.dfficulty = req.body.dfficulty;
    recipe.servings = req.body.servings;
  
    let query = {_id:req.params.id}

    Recipe.updateOne(query, recipe, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/recipes/'+ req.params.id)
         }
    });
    console.log(req.body.title)
 });

//Edit Image
router.post('/image/edit/:id', ensureAuthenticated, upload.single('image'), (req, res) => {
    let recipe = {};
    recipe.image = req.file.path;
  
    let query = {_id:req.params.id}

    Recipe.updateOne(query, recipe, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/recipes/'+ req.params.id)
         }
    });
 });

//Add ingredients to recipe.

router.post('/ingredients/add/:id',[
    //Name
    check('description').isLength({min:1}).trim().withMessage('PC Name required'),
    //Company
    check('amount').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('measurements').isLength({ min: 1}),
    // username must be an email
    
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/');
    console.log(req.params.id);
   return { errors: errors.mapped() };
  }
  console.log(req.params.id);
  Recipe.findById(req.params.id, function(err, recipe){
    
// create a comment
recipe.ingredients.push({ 
    description : req.body.description,
    amount: req.body.amount,
    measurements: req.body.measurements,
});
var subdoc = recipe.ingredients[0];
 console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
 subdoc.isNew; // true
 let query = {_id:req.params.id}

   Recipe.update(query, recipe, function(err){
     if(err){
         console.log(err);
        
         return;
     }
     else{
        req.flash('success', ' Added')
        res.redirect('/recipes/'+ recipe._id)
    }

});

});
});

//Add directions to recipe
router.post('/directions/add/:id',[
    
    //Company
    check('description').isLength({min:1}).trim().withMessage('IP Address required'),
 
    
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/recipes/'+ recipe._id);
    //console.log(req.params.id);
   return { errors: errors.mapped() };
  }
  console.log(req.params.id);
  Recipe.findById(req.params.id, function(err, recipe){

recipe.directions.push({ 

    description : req.body.description,
 
});
var subdoc = recipe.directions[0];
 //console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
 subdoc.isNew; // true
 let query = {_id:req.params.id}

   Recipe.update(query, recipe, function(err){
     if(err){
         console.log(err);
        
         return;
     }
     else{
        req.flash('success', ' Added')
        res.redirect('/recipes/'+ recipe._id)
    }

});

});
});

//Delete ingredients 
router.delete('/ingredients/:id/:id2', ensureAuthenticated, (req, res) => {
    console.log(req.params.id2)
    let query = {_id:req.params.id}
    console.log(query)
        Recipe.findById({_id:req.params.id}, function(err, recipe){
            /* if(device.owner != req.user._id){
                res.status(500).send();
            }else{ */
                // Equivalent to `parent.children.pull(_id)`
            recipe.ingredients.id(req.params.id2).remove();
            // Equivalent to `parent.child = null`
            //recipe.ingredients.remove();
            recipe.save(function (err) {
            if (err) return handleError(err);
            console.log('the subdocs were removed');
            
        });    
                
                res.send('Success');
                });
    
});
    


//Delete directions form
router.delete('/directions/:id/:id2', ensureAuthenticated, (req, res) => {

    /* if(!req.user._id){
        res.status(500).send();
    } */
    console.log(req.params.id2)

    let query = {_id:req.params.id}
    console.log(query)

    

    Recipe.findById({_id:req.params.id}, function(err, recipe){
        /* if(device.owner != req.user._id){
            res.status(500).send();
        }else{ */
        // Equivalent to `parent.children.pull(_id)`
        recipe.directions.id(req.params.id2).remove();
        // Equivalent to `parent.child = null`
        //recipe.ingredients.remove();
        recipe.save(function (err) {
        if (err) return handleError(err);
        console.log('the subdocs were removed');
        });    
            
                res.send('Success');
            });
        //}
    });

//Delete recipe 
router.delete('/:id', ensureAuthenticated, (req, res) => {

    /* if(!req.user._id){
        res.status(500).send();
    } */
    console.log(req.params.id2)

    let query = {_id:req.params.id}
    console.log(query)

    

    Recipe.findById({_id:req.params.id}, function(err, recipe){
            /* if(device.owner != req.user._id){
                res.status(500).send();
            }else{ */
                Recipe.deleteOne(query, function(err){
                    if(err){
                        console.log(err)
                    }
                    res.send('Success');
                });
            //}
        });
        
    });


module.exports = router;