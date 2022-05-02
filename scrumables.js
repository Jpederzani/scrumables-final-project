//Jquery setup variables/requires
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// var $ = jQuery = require('jquery')(window);

// required variables for client
const exphbs        = require('express-handlebars');
const express		= require('express');
const session		= require('express-session');
const mongoose		= require('mongoose');
const passport		= require('passport');
const localStrategy	= require('passport-local').Strategy;
const bcrypt		= require('bcryptjs');
const app 			= express();
var path 			= require('path');
const siteRoutes 	= require('./routes/authorized-routes');
const regSiteRoutes = require('./routes/regular-routes');
const bodyparser    = require('body-parser');
const handlers 		= require('./lib/handlers');
const calculations 	= require('./lib/calculations');
const User 			= require(__dirname+'/models/user');
var fs 				= require('fs');
const req 			= require('express/lib/request');
const database 		= "mongodb+srv://omar:ExYGd9mqyB96n7cH@cluster0.nyasx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
};

//connecting to the database
mongoose.connect(database, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


// configure Handlebars view engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.set('view engine', 'ejs');
const port = process.env.PORT || 1037

// static content handler
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: true}))
app.use(express.json());
app.use(session({
	secret: "verygoodsecret",
	resave: false,
	saveUninitialized: true
}));
function initApplication() {
    console.log('Welcome to the Scrumables homepage - Starting!');
}
//this is passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
/*User.find({}).sort({gamesplayed: -1}).limit(5).exec(function(err, doc) {   
    if (err) throw err;
    var gamesplayed = doc['gamesplayed'];
    console.log(gamesplayed); // sorting_index == 10
});
*/

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



app.get('/', handlers.home)

app.get('/hotrocks', handlers.hotrocks)

app.get('/proposal', handlers.proposal)

app.get('/riskcalculator', handlers.riskcalculator)

app.get('/bmi_calculator', handlers.bmi_calculator)

app.use('/hotrocks', siteRoutes);

app.use('/hotrocks', regSiteRoutes);

// POST method routes; custom applications
app.post('/calculations', calculations.calculateRisk)


//Old links for future conversion
/*
app.get('/about', (req, res)=> res.render('about'))

app.get('/resume', (req, res)=> res.render('resume'))

app.get('/regexp', (req, res)=> res.render('regexp'))
*/

// custom 404 pages
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate`))