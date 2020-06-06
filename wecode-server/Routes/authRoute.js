const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', 
passport.authenticate('google', { scope: 'openid email profile' }));

router.get('/auth/google/callback',
passport.authenticate('google', {successRedirect: '/user'}));


router.get('/auth/facebook', 
passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
passport.authenticate('facebook', {successRedirect: '/'}));


router.get('/login', (req, res) => {
    const div = `<div>
    <a href="/auth/google">Sign in With google </a><br>
    <a href="/auth/facebook">Sign in With facebook </a><br>
    </div>`
    res.send(div);
})


router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;