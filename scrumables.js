const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')


const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 1037

// static content handler
app.use(express.static(__dirname + '/public'))

// custom routed pages
 
app.get('/', handlers.home)

app.get('/hotrocks', handlers.hotrocks)

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