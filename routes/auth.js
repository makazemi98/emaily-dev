const passport = require('passport');
const {
    Router
} = require('express');

const router = Router();

//http://localhost:5000/auth/google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/auth/google/cb', passport.authenticate('google'), (req, res) => {
    res.send('Login')
});

router.get('/api/current_user', (req, res) => {
    // res.send(req.user || 'Plz login')
    res.send(req.session)
});
router.get('/api/logout', (req, res) => {
    req.logout()
    res.send('logout')
});

module.exports = router