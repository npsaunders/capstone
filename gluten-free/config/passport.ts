//for use with oauth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Recipe = require('../models/recipes.js')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  function (accessToken, refreshToken, profile, cb) {
    Recipe.findOne({ 'googleId': profile.id }, function (err, recipe) {
      if (err) return cb(err);
      if (recipe) {
        return cb(null, recipe);
      } else {
        // we have a new user via OAuth!
        const newRecipe = new Recipe({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newRecipe.save(function (err) {
          if (err) return cb(err);
          return cb(null, newRecipe);
        });
      }
    });
  }
));

passport.serializeUser(function (recipe, done) {
  done(null, recipe.id);
});

passport.deserializeUser(function (id, done) {
  Recipe.findById(id, function (err, recipe) {
    done(err, recipe);
  });
});