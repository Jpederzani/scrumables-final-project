/*
	File: 		HotRocks JavaScript File
	Autor: 		Jonathan Pederzani
	Purpose: 	To provide functionality to HoTrOcKs!
*/

//Global Variables
var round = 0;
var score = 0;

function rollDice() {

	//Global Variables

	var i = 1;

	const side = [];
		side[0] = 0;
		side[1] = 0;
		side[2] = 0;
		side[3] = 0;
		side[4] = 0;
		side[5] = 0;

	let d1 = Math.floor(Math.random()*6) + 1;
	let d2 = Math.floor(Math.random()*6) + 1;
	let d3 = Math.floor(Math.random()*6) + 1;
	let d4 = Math.floor(Math.random()*6) + 1;
	let d5 = Math.floor(Math.random()*6) + 1;
	let d6 = Math.floor(Math.random()*6) + 1;

	const roll = [d1, d2, d3, d4, d5, d6];

	document.getElementById("die1").src = getValue(d1);
	document.getElementById("die1").alt = d1;

	document.getElementById("die2").src = getValue(d2);
	document.getElementById("die2").alt = d2;
	
	document.getElementById("die3").src = getValue(d3);
	document.getElementById("die3").alt = d3;

	document.getElementById("die4").src = getValue(d4);
	document.getElementById("die4").alt = d4;
	
	document.getElementById("die5").src = getValue(d5);
	document.getElementById("die5").alt = d5;
	
	document.getElementById("die6").src = getValue(d6);
	document.getElementById("die6").alt = d6;

	round++;
	roll.forEach(tabulateScore);
	side.forEach(calculateScore);

	document.getElementById("rnd").innerHTML = round;
	document.getElementById("r_scr").innerHTML = score;
	document.getElementById("game_msg").innerHTML = side+"And side number: "+i;

	var i = 0;

	//Required Functions

	function getValue(die) {

		let pic;

		if(die == 1){
			pic = "/hr_resources/die_1.png";
			return pic;
		}
		else if(die == 2) {
			pic = "/hr_resources/die_2.png";
			return pic;
		}
		else if(die == 3) {
			pic = "/hr_resources/die_3.png";
			return pic;
		}
		else if(die == 4) {
			pic = "/hr_resources/die_4.png";
			return pic;
		}
		else if(die == 5) {
			pic = "/hr_resources/die_5.png";
			return pic;
		}
		else if(die == 6) {
			pic = "/hr_resources/die_6.png";
			return pic;
		}
		else{
			document.getElementById("cat").innerHTML = "ERROR - NO MATCH FOUND";
		}
	}

	function tabulateScore(die) {

		if(die == 1){
			side[0]++;
		}
		else if(die == 2){
			side[1]++;
		}
		else if(die == 3){
			side[2]++;
		}
		else if(die == 4){
			side[3]++;
		}
		else if(die == 5){
			side[4]++;
		}
		else if(die == 6){
			side[5]++;
		}

	}

	function calculateScore(amt){

		switch(i){
			case 0:
				break;
			
			case 1:
				if(amt >= 3){
					if(amt == 6){
						score += 2000;
					} else {
						score += (100 * (amt - 3)) + 1000;
					}
				}
				else if(amt > 0){
					score += (100 * amt); 
				}
				break;

			case 2:
				if(amt >= 3){
					if(amt == 6){
						score += 400;
					}
						score += 200;
				}
				break;
			
			case 3:
				if(amt >= 3){
					if(amt == 6){
						score += 600;
					}
					score += 300;
				}
				break;

			case 4:
				if(amt >= 3){
					if(amt == 6){
						score += 800;
					}
						score += 400;
				}
				break;
			case 5:
				if(amt >= 3){
					if(amt == 6){
						score += 1000;
						break;
					} else {
					score += 50 * (amt - 3) + 500;
					}
				}
				else {
					score += (50 * amt); 
				}
				break;

			case 6:
				if(amt >= 3){
					if(amt == 6){
						score += 1200;
					}
					score += 600;
				}
				break;
		
			default:
				break;
			}	
		i++;		
	}

	function checkRound(round) {
		
		switch (round) {
			case 0:
				document.getElementById("game_msg").innerHTML = "NEW GAME - ROLL DICE TO START";
				break;
			default:
				document.getElementById("game_msg").innerHTML = "Round #: "+round;
				break;

		}
	}

}