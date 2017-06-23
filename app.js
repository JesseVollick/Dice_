/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var dice1 	= Math.floor(Math.random()*6)+1,
		player1 = new Player("Player 1", "Jesse"),
 		player2 = new Player("Player 2", "Markie"),
		scoreUpdate = console.log(player2.name + ": " + player2.current + " " + player1.name +": "+ player1.current);


init();

function Player(player, name){
	this.player = player;
	this.name = name;
	this.current;
	this.totalPoints;
	this.active;
}


//////////////////
//newGame Event Listener//
////////////////
document.querySelector(".btn-new").addEventListener("click", init);


//////////////////
//ROll DICE Event-Listener//
////////////////

document.querySelector(".btn-roll").addEventListener("click", function(){
	var dice = Math.floor(Math.random()*6+1),
			dice2 = Math.floor(Math.random()*6+1),
			diceDom = document.querySelector(".dice"),
			diceDom2 = document.querySelector("#dice2");

	diceDom.src = "dice-" + dice + ".png";
	diceDom.style.display = "block";
	diceDom2.src = "dice-" + dice2 + ".png";
	diceDom2.style.display = "block";

	//updated current score
	if(player1.active){
		if(dice !== 1){
			player1.current = player1.current + dice + dice2;
			document.querySelector("#current-0").textContent = player1.current
		}else{
			player1.current = 0;
			document.querySelector("#current-0").textContent = player1.current
			//switch players here
			switchPlayers();
		}
	}else{
		if(dice !== 1){
			player2.current = player2.current + dice;
			document.querySelector("#current-1").textContent = player2.current
		}else{
			player2.current = 0;
			document.querySelector("#current-1").textContent = player2.current;
			//switch players here
			switchPlayers();
		}

	}
	//add dice to current if not 0
	//if 1 set to zero and switch players

});


//////////////////
//hold event listener//
////////////////
document.querySelector(".btn-hold").addEventListener("click", function(){
	var finalScore = document.querySelector('.final-score').value;

	if(player1.active){
			player1.totalPoints += player1.current;
			document.querySelector("#score-0").textContent = player1.totalPoints;
			document.querySelector("#current-0").textContent = 0;
			switchPlayers();
			if(player1.totalPoints >= finalScore){
				winner();
			}
	}else{
			player2.totalPoints += player2.current;
			document.querySelector("#score-1").textContent = player2.totalPoints;
			document.querySelector("#current-1").textContent = 0;
			switchPlayers();
			if(player2.totalPoints >= finalScore){
				winner();
			}
	}

});

///////////////////////////
////WINNER! function///////
//////////////////////////
function winner(){
	console.log("winner circle");
	document.querySelector(".btn-roll").style.display = "none";
	document.querySelector(".btn-hold").style.display = "none";
	if(player1.totalPoints >= 10){
		document.querySelector('#name-0').textContent = "WINNER";
		document.querySelector('#name-1').textContent = "loser";
		document.querySelector('.player-1-panel').classList.toggle("active");
		document.querySelector('#name-0').classList.add("winner");
		document.querySelector('#name-1').classList.add("loser");

	}else{
		document.querySelector('#name-0').textContent = "loser";
		document.querySelector('#name-1').textContent = "winner";
		document.querySelector('.player-0-panel').classList.toggle("active");
		document.querySelector('#name-1').classList.add("winner");
		document.querySelector('#name-0').classList.add("loser");

	}
}


//////////////////
//Swith Player function//
////////////////
function switchPlayers(){
	if(player1.active){
		player1.active = false;
		player2.active = true;
		player1.current = 0;
		// console.log("players turn switched. its now the turn of "+ player2.name );
		document.querySelector('.player-0-panel').classList.toggle("active");
		document.querySelector('.player-1-panel').classList.toggle("active");
	}else{
		player1.active = true;
		player2.actie = false;
		player2.current = 0;
		// console.log("players turn switched. its now the turn of "+ player1.name );
		document.querySelector('.player-0-panel').classList.toggle("active");
		document.querySelector('.player-1-panel').classList.toggle("active");
	}
}

//////////////////
//INIT function//
////////////////
function init(){
	console.log("init");
	player1.active = true;
	player2.active = false;
	player1.current = 0;
	player2.current = 0;
	player1.totalPoints = 0;
	player2.totalPoints = 0;
	document.querySelector("#name-0").textContent = player1.name;
	document.querySelector("#name-1").textContent = player2.name;
	document.querySelector("#current-0").textContent = player1.current;
	document.querySelector("#current-1").textContent = player2.current;
	document.querySelector("#score-0").textContent = player1.totalPoints;
	document.querySelector("#score-1").textContent = player2.totalPoints;
	document.querySelector(".dice").style.display = "none";
	document.querySelector("#dice2").style.display = "none";
	document.querySelector(".btn-roll").style.display = "block";
	document.querySelector(".btn-hold").style.display = "block";
	document.querySelector('.player-0-panel').classList.add("active");
	document.querySelector('.player-1-panel').classList.remove("active");
	document.querySelector('#name-0').classList.remove("winner");
	document.querySelector('#name-1').classList.remove("winner");
	document.querySelector('#name-0').classList.remove("loser");
	document.querySelector('#name-1').classList.remove("loser");
}
