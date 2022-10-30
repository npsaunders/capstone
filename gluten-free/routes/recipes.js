const express = require('express');
const recipeRoute = express.Router();
const Recipe = require('../models/recipes.js');



// ROUTES --------------------
// INDEX - Display all recipes. Allow user to add, edit, delete or show a recipe
recipeRoute.get('/recipes', (req, res) => {
  Recipe.find({}, (error, foundRecipes) => {
    res.render("recipes/index.ejs", {
      recipes: foundRecipes,
      user: req.user
    });
  });
});

// NEW - New Recipe Page
recipeRoute.get('/new', (req, res) => {
  res.render('recipes/new.ejs');
});

// DELETE - Delete a recipe
recipeRoute.delete('/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id, () => {
    res.redirect('/recipes');
  });
});

// UPDATE - Update a recipe 
recipeRoute.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  },
    (error, updatedRecipe) => {
      res.redirect(`/${req.params.id}`);
    });
});

// CREATE - Create a recipe you have submitted through the New page
recipeRoute.post('/', (req, res) => {
  Recipe.create(req.body, (error, createdRecipe) => {
    res.redirect('/recipes');
  });
});

// EDIT - Edit a recipe
recipeRoute.get('/:id/edit', (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render('recipes/edit.ejs', {
      recipe: foundRecipe
    });
  });
});

// SHOW - Show a recipe selected from the Index page
recipeRoute.get('/:id', (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render('recipes/show.ejs', {
      recipe: foundRecipe
    });
  });
});

module.exports = recipeRoute;