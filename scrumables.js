// required variables for client
const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const calculations = require('./lib/calculations')

//Jquery setup variables/requires
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

const app = express()

// parse urls for data
app.use(express.urlencoded({extended:true}))

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 1037

// static content handler
app.use(express.static(__dirname + '/public'))

function initApplication() {
    console.log('Welcome to the Scrumables homepage - Starting!');
}

// GET method routes; custom routed pages
 
app.get('/', handlers.home)

app.get('/hotrocks', handlers.hotrocks)

app.get('/proposal', handlers.proposal)

app.get('/riskcalculator', handlers.riskcalculator)

app.get('/bmi_calculator', handlers.bmi_calculator)

// POST method routes; custom applications
app.post('/calculations', calculations.calculateRisk)

//app.post('/getDice', hotrocks.getDice)


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