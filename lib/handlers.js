exports.home = (req, res) => res.render('home')

exports.hotrocks = (req, res) => res.render('hotrocks')

/* 
app.get('/about', (req, res)=> res.render('about'))

app.get('/resume', (req, res)=> res.render('resume'))

app.get('/regexp', (req, res)=> res.render('regexp')) 
*/

// custom 404 pages
exports.notFound = (req, res) => res.render('404')

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */