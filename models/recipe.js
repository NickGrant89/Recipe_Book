const mongoose = require('mongoose');

// User schema

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
    ingredients:{
        type: String,
        required: false
    },
    Directions:{
        phone: {type: String},
        mobile: {type: String},
    },
});


let Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);