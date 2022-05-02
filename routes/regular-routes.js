
const passport = require('passport');
const router = require('express').Router();
const User = require('../models/user')

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}

router.get('/register', (req,res) =>{
	res.render('register.hbs');
   })

router.get('/login', isLoggedOut, (req, res) => {
	const response = {
		title: "Login",
		error: req.query.error
	}

	res.render('login.hbs', response);
});

router.get('/charts', (req, res) => {
	const leaderboardQuery = async () => {
	 
		try {
		  const results = await User
			.find({}, {username: 1, gamesplayed: 1, _id:0}) 
			.sort({
			  gamesplayed: -1,
			})
			.limit(5)
			var chartResults1 = (JSON.stringify(results[0])); var chartResults2 = (JSON.stringify(results[1]));var chartResults3 = (JSON.stringify(results[2]));
			var chartResults4 = (JSON.stringify(results[3])); var chartResults5 = (JSON.stringify(results[4]));
			chartResults2 = chartResults2.replace(/[{}]/g, ""); chartResults2 = chartResults2.replace(/[""]/g, " ");
			chartResults1 = chartResults1.replace(/[{}]/g, ""); chartResults1 = chartResults1.replace(/[""]/g, " ");
			chartResults3 = chartResults3.replace(/[{}]/g, ""); chartResults3 = chartResults3.replace(/[""]/g, " ");
			chartResults4 = chartResults4.replace(/[{}]/g, ""); chartResults4 = chartResults4.replace(/[""]/g, " ");
			chartResults5 = chartResults5.replace(/[{}]/g, ""); chartResults5 = chartResults5.replace(/[""]/g, " ");
		  res.render('charts.ejs', {player1: chartResults1, player2: chartResults2, player3: chartResults3, player4: chartResults4, player5: chartResults5})
		} catch(err){
			console.log(err)
		}
  
	}

	leaderboardQuery() 
})

module.exports = router;
