
const exphbs            = require('express-handlebars')
const passport = require('passport');
//const app = express();
const router = require('express').Router();
const User = require('../models/user');
const bcrypt			= require('bcryptjs');
const localStrategy		= require('passport-local').Strategy;
//const calculations =    require('../lib/gamesPlayedInc');

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/hotrocks');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}


router.get('/about', isLoggedIn, (req, res) => {
	res.send('about');
});

router.get('/login', isLoggedOut, (req, res) => {
	const response = {
		title: "Login",
		error: req.query.error
	}

	res.render('login.hbs', response);
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/hotrocks/profile' ,
	failureRedirect: '/login?error=true'
}));


router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
	res.render('hotrocksloggedin.ejs', {title: 'hotrocks', user: req.user})
   /*User.updateOne({username: req.user.username}, {$inc:{gamesplayed:1}}, (err) => {
		if (err) {
			console.log("Something wrong when updating data!");
		}
	});
    */
})

router.post('/register/done', async (req, res) => {
    const exists = await User.exists({ username: req.body.email });

    if (exists) {
        res.send('Account email is already taken');
        return;
    };

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);
            
            const newAdmin = new User({
                username: req.body.email,
                password: hash,
            });

            newAdmin.save();
            
            res.redirect('/hotrocks/login');
        });
    });
});
module.exports = router;