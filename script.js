var game = {
	count: 0,
	comEntry: ['blue', 'red', 'yellow', 'green'],
	comPlay: [],
	userPlay: [],
	level: 1,
	strict: false,

	sound:{
	    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
	    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
	    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
	    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	}
}

var gameInterval, gameCount = 1;
var switchOn = false;

//event handlers for some buttons
$('div.sw-slot').click(function(){
	if(!switchOn){
		switchOn = true;
		$('div.switch').addClass('sw-on');
		$('h1.count').addClass('led-on');			
	}else{
		switchOn = false;
		gameCount = 1;
		game.level = 1;
		clearGame();
		clearInterval(gameInterval);
		$('.push').removeClass('clickable');
		$('.push').addClass('unclickable');
		$('div.switch').removeClass('sw-on');
		$('h1.count').removeClass('led-on');
		$('h1.count').text('--');
	}
})

$('div#mode').click(function (){
	if(switchOn){
		if(!game.strict){
			$('div#mode-led').addClass('led-on');
			game.strict = true;
		}else{
			$('div#mode-led').removeClass('led-on');
			game.strict = false;
		}
	}
})

$('div#start').click(function(){
	if(switchOn){
		gameCount = 1;
		game.level = 1;
		clearGame();
		clearInterval(gameInterval);
		$('.push').removeClass('clickable');
		$('.push').addClass('unclickable');
		startGame();
	}
})

//The main functionality of the simon game
function newGame(){
	clearGame();
}

function clearGame(){
	game.count = 0;
	game.comPlay = [];
	game.userPlay = [];
}

function startGame(){
	checkLevel(game.level)
}

function checkLevel(level){
	$('h1.count').text(level);
	switch(level){
		case 1:
			gameCount = 2;
			addComMove();
			break;
		case 2:
			gameCount = 4;
			addComMove();
			break;
		case 3:
			gameCount = 6;
			addComMove();
			break;		
		case 4:
			gameCount = 8;
			addComMove();
			break;
		case 5:
			gameCount = 10;
			addComMove();
			break;
		case 6:
			gameCount = 12;
			addComMove();
			break;
		case 7:
			gameCount = 14;
			addComMove();
			break;
		case 8:
			gameCount = 16;
			addComMove();
			break;
		case 9:
			gameCount = 18;
			addComMove();
			break;
		case 10:
			gameCount = 20;
			addComMove();
			break;						
		default:
			clearInterval(gameInterval);
			gameCount = 1;
			game.level = 1;
			$('h1.count').text('WIN');
			newGame();
	}
}

function addComMove(){
	gameInterval = setInterval(function(){
		if(game.count != gameCount){
			game.count++;
			var randColor = game.comEntry[Math.floor(Math.random() * 4)]
			game.comPlay.push(randColor);
			displayInput(randColor);
			sound(randColor);
		}else{	
			clearInterval(gameInterval);
			game.level += 1;
			$('.push').removeClass('unclickable');
			$('.push').addClass('clickable');
		}

	}, 700)
}

function userPlay(color){
	displayInput(color);
	sound(color);
	game.userPlay.push(color);
	var length = game.userPlay.length;
		
	if(game.userPlay[length - 1] == game.comPlay[length - 1]){
		if(length == game.comPlay.length){
			$('.push').removeClass('clickable');
			$('.push').addClass('unclickable');
			setTimeout(checkLevel, 1000, game.level);
			clearGame();	
		}

	}else{
		if(game.strict){
			clearGame();
			clearInterval(gameInterval)
			game.level = 1;
			gameCount = 1;
			$('h1.count').addClass('led-on');
			$('h1.count').text("LOSS")
			setTimeout(checkLevel, 1500, game.level);
		}else{
			game.userPlay = [];
			$('h1.count').text('!!');
			setTimeout(function(){
				$('h1.count').text(game.level - 1);
			}, 1000)
		}
	}
}

function displayInput(color){
	var index = '#' + color;
	$(index).addClass('light');
	setTimeout(function(){
		$(index).removeClass('light');
	}, 300)
}

function sound(color){
	switch(color){
		case 'blue':
			game.sound.blue.play();
			break;
		case 'red':
			game.sound.red.play();
			break;
		case 'yellow':
			game.sound.yellow.play();
			break;
		case 'green':
			game.sound.green.play();
			break;			
	}
}