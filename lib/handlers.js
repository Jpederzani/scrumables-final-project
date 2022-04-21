exports.home = (req, res) => res.render('home.hbs')

exports.hotrocks = (req, res) => res.render('hotrocks.hbs')

exports.proposal = (req, res) => res.render('proposal.hbs')
exports.register = (req,res) => res.render('register.hbs')
exports.login = (req, res) => res.render('login.hbs')
exports.riskcalculator = (req, res) => res.render('riskcalculator.hbs')

exports.bmi_calculator = (req, res) => res.render('bmi_calculator.hbs')
// custom 404 pages
exports.notFound = (req, res) => res.render('404.hbs')

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500.hbs')
/* eslint-enable no-unused-vars */