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

var SNAKE = {
	x : 0,y : 0
}
var HEIGHT = 8;
var WIDTH = 8;

function moveSnake(direction) {
	gameArray[SNAKE.y][SNAKE.x] = GridEnum.EMPTY;
	if (direction == DirEnum.LEFT) {
		SNAKE.x--;
	} 
	else if (direction == DirEnum.RIGHT) {
		SNAKE.x++;
	} 
	else if (direction == DirEnum.UP) {
		SNAKE.y--;
	} 
	else if (direction == DirEnum.DOWN) {
		SNAKE.y++;
	}  
	if (SNAKE.x >= WIDTH) {
		SNAKE.x -= WIDTH;
	}
	if (SNAKE.y >= HEIGHT) {
		SNAKE.y -= HEIGHT;
	}
	if (SNAKE.x < 0) {
		SNAKE.x += WIDTH;
	}
	if (SNAKE.y < 0) {
		SNAKE.y += HEIGHT;
	}
	gameArray[SNAKE.y][SNAKE.x] = GridEnum.SNAKE;
}
function convertGameToDisplay() {

	var i,j;
	for (i = 0; i < 8; i++) {
		for (j = 0; j < 8; j++) {
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

var size = 8;
var gameArray = new Array(size);
var displayArray = new Array(size);
while (size--) {
	var length = 8;
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
moveSnake(DirEnum.DOWN);
}
else {
moveSnake(DirEnum.LEFT);
}
w = w * -1;
convertGameToDisplay();
createTable(displayArray);

}

window.onload = run;
