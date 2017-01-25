//Alphabet Snake
//By J.R. Walther & Konnor Petersen

var GridEnum = {
	SNAKE: 1,
	FOOD: 2,
	EMPTY: 3
};
var DirEnum = {
	LEFT:1,
	RIGHT:2,
	UP:3,
	DOWN:4
};

var SNAKE = [];
SNAKE.push(new SnakeSegment(0,0,true,true,null,null,DirEnum.LEFT));

function SnakeSegment(x,y,head,tail,leader,follower, direction) {
this.x = x;
this.y = y;
this.head = head;
this.tail = tail;
this.leader = leader;
this.follower= follower;
this.direction = direction;
}
var HEIGHT = 8;
var WIDTH = 8;

function moveSnake(segment) {
	gameArray[segment.y][segment.x] = GridEnum.EMPTY;
	if (segment.direction == DirEnum.LEFT) {
		segment.x--;
	} 
	else if (segment.direction == DirEnum.RIGHT) {
		segment.x++;
	} 
	else if (segment.direction == DirEnum.UP) {
		segment.y--;
	} 
	else if (segment.direction == DirEnum.DOWN) {
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
	eat();
	}
	gameArray[segment.y][segment.x] = GridEnum.SNAKE;
}

function eat() {
	alert("YUM");
generateFood();
}

function collision() {
	alert("YOU DIED");
}

function generateFood() {
	gameArray[getRandomInt(0,7)][getRandomInt(0,7)] = GridEnum.FOOD;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertGameToDisplay() {

	var i,j;
	for (i = 0; i < HEIGHT; i++) {
		for (j = 0; j < WIDTH; j++) {
			if (gameArray[i][j] == GridEnum.EMPTY) {
				displayArray[i][j] = " ";
			}
			else if (gameArray[i][j] == GridEnum.SNAKE) {
				displayArray[i][j] = "0";
			}
			else if (gameArray[i][j] == GridEnum.FOOD) {
				displayArray[i][j] = "*";
			}
		}
	}
}

function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
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
createTable(displayArray);


function run() {
	generateFood();
	setInterval(function() { eternalSnake() }, 200);
}

function eternalSnake() {
	moveSnake(SNAKE[0]);
	convertGameToDisplay();
	createTable(displayArray);
}


var startButton = document.getElementById("start");
startButton.addEventListener("click", startSnake);
function startSnake() {
  startButton.innerHTML = "";
  startButton.style.border = "0px";
  startButton.style.marginBottom = "88px";
  run();
}



document.onkeydown = function moveFunction() {
switch (event.keyCode) {
case 38:
    SNAKE[0].direction = DirEnum.UP;
    break;
case 40:
    SNAKE[0].direction = DirEnum.DOWN;
    break;
case 37:
    SNAKE[0].direction = DirEnum.LEFT;
    break;
case 39:
    SNAKE[0].direction = DirEnum.RIGHT;
    break;
}
}
