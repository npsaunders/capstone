var router = require('express').Router();
var passport = require('passport');
router.get('/', function (req, res) {
    res.render('index.ejs', {
        user: req.user
    });
});
// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/recipes',
    failureRedirect: '/'
}));
// OAuth logout route
router.get('/logout', function (req, res) {
    req.logout(function (err) {
        res.redirect('/');
    });
});
module.exports = router;
