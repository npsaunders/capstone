const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//MongoDB schema for a recipe
const recipeSchema = new Schema(
  {
    name: String,
    recipeName: String,
    email: String,
    urlPath: String,
    instructions: String,
    googleID: String
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;