const User = require('../models/user');


exports.gamesInc = (req, res) => {
	//const values = document.getElementById("funcId");
	let auser = req.user;
	gamesInc(auser.username);
	function gamesInc(usrname) {
		User.updateOne({username: usrname}, {$inc:{gamesplayed:1}}, (err) => {
			if (err) {
				console.log("Something wrong when updating data!");
			}
		});
	}
}