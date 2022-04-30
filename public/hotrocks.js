/*
	File: 		HotRocks JavaScript File
	Autor: 		Jonathan Pederzani
	Purpose: 	To provide functionality to HoTrOcKs!
*/

//Global Variables
var totScore = 000;
var roundScore = 000;
var activate = true;
//var passGo = false;

function rollDice() {

    const die = document.getElementsByClassName("die");
    const sel = document.getElementsByClassName("select");

	let d1 = Math.floor(Math.random()*6) + 1;
	let d2 = Math.floor(Math.random()*6) + 1;
	let d3 = Math.floor(Math.random()*6) + 1;
	let d4 = Math.floor(Math.random()*6) + 1;
	let d5 = Math.floor(Math.random()*6) + 1;
	let d6 = Math.floor(Math.random()*6) + 1;

	const roll = [d1, d2, d3, d4, d5, d6];

    for(var i = 0; i < roll.length; i++){
        if(sel[i].disabled == false){
            document.getElementsByClassName("die")[i].src = getValue(roll[i]);
            document.getElementsByClassName("select")[i].value = roll[i];
        }
        else{
            //continue
        }
    }

    toggleRoll();
	//round++;

	//roll.forEach(tabulateScore);
	//side.forEach(calculateScore);

	//document.getElementById("rnd").innerHTML = round;
	//document.getElementById("r_scr").innerHTML = score;
	//document.getElementById("game_msg").innerHTML = side+"And side number: "+i;

}
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

function select(obj) {
    var elem = document.getElementById(obj);
    var val = document.getElementById("s"+ obj[1]);

    if(val.checked == true && val.disabled == false){
        elem.style.border = "";
        val.checked = false;

    }
    else if(val.checked == false) {
        elem.style.border =  "ridge 2px red";
        document.getElementById("s"+ obj[1]).checked = true;

    }
}

function toggleRoll(){
        
    if(activate === true){
        alert("Toggle Roll True");
        activate = false;
        document.getElementById("roll").disabled = true;
        document.getElementById("sub").disabled = false;
    }
    else {
        alert("Toggle Roll False");
        activate = true;
        document.getElementById("roll").disabled = false;
        document.getElementById("sub").disabled = true;
    }
}

function checkStatus() {
   
    const stat = document.getElementsByClassName("select");
    var limit = 0;

    for(var i = 0; i<stat.length; i++){
        if(stat[i].disabled == true){
            limit++;
        }
    }

    if(limit == 6){
        releaseDice();
    }
}

function releaseDice() {
    const die = document.getElementsByClassName("select");
    const mark = document.getElementsByClassName("holder");

    for(var i = 0; i<die.length; i++){
        die[i].disabled = false;
        die[i].checked = false;
        mark[i].style.border = "";
        document.getElementsByClassName("die")[i].src = "/hr_resources/die_0.png";
        document.getElementsByClassName("select")[i].value = 0;
    }
      
}

function uncheckAll() {
    var inputs = document.querySelectorAll(".select");

    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].disabled == false){
            inputs[i].checked = false;
        }        
    }
}

var setScore = function(tempScore) {
    
    if(Number(tempScore) > 0){
        roundScore += tempScore
    }
    else if(tempScore === 0){
        roundScore = 0;
        alert("Loser!  No points generated on this roll, round score set to zero.");
        passGo = true;
        releaseDice();
       
    }

    document.getElementById("r_scr").innerHTML = roundScore;
    document.getElementById("t_scr").innerHTML = totScore;
}

var getSelected = function() {
    const roll = document.getElementsByClassName("select");
    var selection = [];
    var tScore;
    
    for(var i = 0, j = 0; i < roll.length; i++){
        if(roll[i].checked == true && roll[i].disabled == false){
            selection[j] = roll[i].value;
            document.getElementsByClassName("select")[i].disabled = true;
            j++;
        } 
        else if(roll[i].checked == false && roll[i].disabled == true) {
            document.getElementsByClassName("dval")[i].innerHTML = "Kept"
        }
        else{
            //continue
        }
    }
    alert("Selected Values: " + selection);
    tScore = tabulateScore(selection);
    alert("Temp Score: "+tScore)
    setScore(tScore);
    toggleRoll();
}

function tabulateScore(die) {
    var tScore;
    const side = [];
        side[0] = 0;
        side[1] = 0;
        side[2] = 0;
        side[3] = 0;
        side[4] = 0;
        side[5] = 0;

    die.forEach(function(die)  {    
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
    })

    alert("side count: "+ side);
    tScore = calculateScore(side);
    return tScore;  
    
}

function calculateScore(amt){
    var score = 0;
                
    for(var i = 0; i<amt.length; i++){
        switch(i){       
    
            case 0:
                if(amt[i] >= 3){
                    if(amt[i] == 6){
                        score =+ 2000;
                    } else {
                        score += (100 * (amt[i] - 3)) + 1000;
                    }
                }
                else if(amt[i] > 0){
                    score += (100 * amt[i]); 
                }
                break;

            case 1:
                if(amt[i] >= 3){
                    if(amt[i] == 6){
                        score += 400;
                    }
                        score += 200;
                }
                break;
            
            case 2:
                if(amt[i] >= 3){
                    if(amt[i] == 6){
                        score += 600;
                    }
                    score += 300;
                }
                break;

            case 3:
                if(amt[i] >= 3){
                    if(amt[i] == 6){
                        score += 800;
                    }
                        score += 400;
                }
                break;
    
            case 4:
                if(amt[i] >= 3){
                    if(amt[i] == 6){
                        score += 1000;
                        break;
                    } else {
                    score += 50 * (amt[i] - 3) + 500;
                    }
                }
                else {
                    score += (50 * amt[i]); 
                }
                break;

            case 5:
                if(amt[i] >= 3){
                    if(amt[i] == 6){
                        score += 1200;
                    }
                    score += 600;
                }
                break;
        
            default:
                break;
        }	
    }
    //alert("Score Variable: " + score);
    return score;
}