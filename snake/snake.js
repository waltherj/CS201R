//Alphabet Snake
//By J.R. Walther & Konnor Petersen

var GridEnum = {
	SNAKE: 1,
	FOOD: 2,
	EMPTY: 3,
	PENDING: 4,
};
var DirEnum = {
	LEFT:1,
	RIGHT:2,
	UP:3,
	DOWN:4
};

var SNAKE = [];
var FOOD = []
var direction;

window.onload = function() {
    document.getElementById("snakeSong").play();
}

function SnakeSegment(x,y,head,tail,letter,invisible) {
this.x = x;
this.y = y;
this.head = head;
this.tail = tail;
this.letter = letter;
this.invisible = invisible;
}

function FoodPiece(x,y,letter,index) {
this.x = x;
this.y = y;
this.letter = letter;
}

var HEIGHT = 16;
var WIDTH = 16;

function moveSnake(segment, index) {
	if (segment.tail) {
	gameArray[segment.y][segment.x] = GridEnum.EMPTY;
	}
	if (segment.head) {
		if (direction == DirEnum.LEFT) {
			segment.x--;
		} 
		else if (direction == DirEnum.RIGHT) {
			segment.x++;
		} 
		else if (direction == DirEnum.UP) {
			segment.y--;
		} 
		else if (direction == DirEnum.DOWN) {
			segment.y++;
		}  
		if (segment.x >= WIDTH) {
			segment.x -= WIDTH;
		}
		if (segment.y >= HEIGHT) {
			segment.y -= HEIGHT;
		}
		if (segment.x < 0) {
			segment.x += WIDTH;
		}
		if (segment.y < 0) {
			segment.y += HEIGHT;
		}
		if (gameArray[segment.y][segment.x] == GridEnum.SNAKE) {
			//COLLISION
			collision();
		}
		else if (gameArray[segment.y][segment.x] == GridEnum.FOOD) {
			//EAT
			gameArray[segment.y][segment.x] = GridEnum.SNAKE;
			eat();
		}
		else {
			gameArray[segment.y][segment.x] = GridEnum.SNAKE;
		}

	}
	else {
		segment.x = SNAKE[index - 1].x;
		segment.y = SNAKE[index - 1].y;

	if (segment.invisible > 0) {
		segment.invisible--;
		gameArray[segment.y][segment.x] = GridEnum.PENDING;
	} else {
		gameArray[segment.y][segment.x] = GridEnum.SNAKE;
	}

	}

}

function eat() {
SNAKE[SNAKE.length - 1].tail = false;
SNAKE.push(new SnakeSegment(SNAKE[SNAKE.length - 1].x,SNAKE[SNAKE.length - 1].y,false,true, FOOD[0].letter, SNAKE.length - 1));
document.getElementById("eat").play();
generateFood();
}

function randomLetter() {
	var alphabet = "AAAAAAAABBCCCDDDDEEEEEEEEEEEEEFFGGHHHHHHIIIIIIIJKLLLLMMNNNNNNNOOOOOOOOPPQRRRRRRSSSSSSTTTTTTTTTUUUVWWXYYZ"
	return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function collision() {
	alert("You Died! Your score was: " + SNAKE.length);
  for (i=0; i<WIDTH; i++){
    for (j=0; j<HEIGHT; j++){
      gameArray[i][j] = GridEnum.EMPTY;
    }
  }
  //gameArray[firstPosition][secondPosition] = GridEnum.EMPTY;
  SNAKE = [];
FOOD = [];
  direction=null;
  startButton.innerHTML = "Start";
  startButton.style.borderTop = "4px solid black";
  startButton.style.borderBottom = "4px solid black";
  startButton.style.marginBottom = "10px";
gameOver = true;
gameCurrent = false;
  
}


function generateFood() {
	var ranX, ranY;
	do {
	ranX = getRandomInt(0,WIDTH - 1);
	ranY = getRandomInt(0,HEIGHT - 1);
	} while (gameArray[ranX][ranY] == GridEnum.SNAKE || gameArray[ranX][ranY] == GridEnum.PENDING);
	gameArray[ranX][ranY] = GridEnum.FOOD;
	ranX;
	ranY;
	FOOD = [];
	FOOD.push(new FoodPiece(ranX, ranY, randomLetter()));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertGameToDisplay() {

	var i,j;
	for (i = 0; i < HEIGHT; i++) {
		for (j = 0; j < WIDTH; j++) {
			if (gameArray[i][j] == GridEnum.EMPTY || gameArray[i][j] == GridEnum.PENDING) {
				displayArray[i][j] = " ";
			}
		}
	}
	for (index = SNAKE.length - 1; index >= 0; --index) {
		if (gameArray[SNAKE[index].y][SNAKE[index].x] == GridEnum.SNAKE)
		displayArray[SNAKE[index].y][SNAKE[index].x] = SNAKE[index].letter;
	}
	for (index = 0; index < FOOD.length; ++index) {
	displayArray[FOOD[index].x][FOOD[index].y] = FOOD[index].letter
	}
}

function createTable(tableData, gameData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

	for (i = 0; i < tableData.length; ++i) {
    var row = document.createElement('tr');

	for (j = 0; j < tableData[i].length; ++j) {
	var cell = document.createElement('td');
	if (gameData[i][j] == GridEnum.SNAKE) {
	cell.style.backgroundColor = "rgb(255, 112, 10)";
	}
      cell.appendChild(document.createTextNode(tableData[i][j]));
	row.appendChild(cell);
    };

    tableBody.appendChild(row);
  };
  table.appendChild(tableBody);
  document.getElementById("gameTable").innerHTML = table.innerHTML;
}

var size = HEIGHT;
var gameArray = new Array(size);
var displayArray = new Array(size);
while (size--) {
	var length = WIDTH;
	gameArray[size] = new Array(length);
	displayArray[size] = new Array(length);
	while(length--) gameArray[size][length] = GridEnum.EMPTY;
}
convertGameToDisplay();
createTable(displayArray, gameArray);
intervalSpeed = 200;
var interval = null;
function run() {
	generateFood();
  clearInterval(interval);
	interval = setInterval(function() { eternalSnake() }, intervalSpeed);
}
var gameOver = false;

function eternalSnake() {
	for (index = SNAKE.length - 1; index >= 0; --index) {
		moveSnake(SNAKE[index], index);
	}
	convertGameToDisplay();
	createTable(displayArray, gameArray);
}


var startButton = document.getElementById("start");

var gameCurrent = false;

startButton.addEventListener("click", startSnake);
function startSnake() {
gameCurrent = true;
  startButton.innerHTML = "";
  startButton.style.border = "0px";
  startButton.style.marginBottom = "88px";
  SNAKE.push(new SnakeSegment(0,0,true,true, randomLetter()));
run();
}


document.onkeydown = function moveFunction() {
switch (event.keyCode) {
case 38:
	if (direction == DirEnum.DOWN && !SNAKE[0].tail) {
		collision();
	break;
	}
    direction = DirEnum.UP;
    break;
case 40:
	if (direction == DirEnum.UP && !SNAKE[0].tail) {
		collision();
	break;

	}
    direction = DirEnum.DOWN;
    break;
case 37:
	if (direction == DirEnum.RIGHT && !SNAKE[0].tail) {
		collision();
	break;

	}
    direction = DirEnum.LEFT;
    break;
case 39:
	if (direction == DirEnum.LEFT && !SNAKE[0].tail) {
		collision();
	break;

	}
    direction = DirEnum.RIGHT;
    break;

case 189:
	slowdown();
	break;
case 187:
	speedup();
	break;
case 13:
	if (gameCurrent != true)
		startSnake();
	break;
case 16:
	if (gameCurrent == true) {
		gameArray[FOOD[0].x][FOOD[0].y] = GridEnum.EMPTY;
		document.getElementById("move").play();
		generateFood();
	}
	break;
	
}
}

window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
    }
    }, false);

document.getElementById("speed").onclick = speedup();

function speedup(){  
if (intervalSpeed > 6) {
//document.getElementById("up").play();
	intervalSpeed -= 5;
clearInterval(interval);
	interval = setInterval(function() { eternalSnake() }, intervalSpeed);
}
}
document.getElementById("slow").onclick = slowdown();

function slowdown(){
//document.getElementById("down").play();  
intervalSpeed += 5;
clearInterval(interval);
	interval = setInterval(function() { eternalSnake() }, intervalSpeed);
}
