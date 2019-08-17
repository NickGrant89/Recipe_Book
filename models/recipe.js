const mongoose = require('mongoose');

// Recipe schema

const DirectionsSchema = mongoose.Schema({
    
    order:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },

    
});

const IngredientsSchema = mongoose.Schema({
    
    description:{
        type: String,
        required: false
    },
    amount:{
        type: String,
        required: false
    },
    measurements:{
        type: String,
        required: false
    },
    
});

const RecipeSchema = mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    timetocook:{
        type: String,
        required: false
    },
    dfficulty:{
        type: String,
        required: false
    },
    servings:{
        type: String,
        required: false
    },
    company:{
        type: String,
        required: false
    },
    ingredients:[IngredientsSchema],
    directions:[DirectionsSchema],
    allergies:[],
    sites:[],
});


let Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);