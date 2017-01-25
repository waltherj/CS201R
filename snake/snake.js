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
	gameArray[segment.y][segment.x] = GridEnum.SNAKE;
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
			else if (gameArray[step] == GridEnum.FOOD) {
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
setInterval(function() { eternalSnake() }, 100);
}

var w = 1;
function eternalSnake() {
if (w > 0) {
moveSnake(SNAKE[0]);
}
else {
moveSnake(SNAKE[0]);
}
w = w * -1;
convertGameToDisplay();
createTable(displayArray);

}

window.onload = run;

function startSnake() {
  var startButton = document.getElementById("start");
  
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
