var board =  new Array();
var score = 0;
var hasConfilicted = new Array();

$(document).ready(function(){
	newGame();
});

function newGame(){
	//初始化棋牌格
	init();

	//随机生成2或4的数字,需要调用两次
	generateOneNumber();
	generateOneNumber();

}
//initial cells with  position and number is 0 
function init(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCeil = $('#grid-ceil-' + i + "-" + j);

			gridCeil.css('top', getPosTop(i,j));
			gridCeil.css('left', getPosLeft(i,j));
		}
	}
	for (var i = 0; i < 4; i++) {
		hasConfilicted[i] =  new Array();
		board[i] =  new Array();
		for (var j = 0; j < 4;j++) {
			hasConfilicted[i][j] = false;
			board[i][j] = 0;
		};
	}
	updateBoardView();
	score = 0;
	updateScore(score);
}

function updateBoardView(){
	$(".number-ceil").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class= "number-ceil" id="number-ceil-' + i + '-' + j +'"><div>' );
			var theNumberCeil = $('#number-ceil-' + i + '-' + j);
			if ( board[i][j] === 0 ) {
				theNumberCeil.css('width', '0px');
				theNumberCeil.css('height', '0px');
				theNumberCeil.css('top', getPosTop(i,j) + 50);
				theNumberCeil.css('left', getPosLeft(i,j) + 50);
			}else {
				theNumberCeil.css('width', '100px');
				theNumberCeil.css('height', '100px');
				theNumberCeil.css('top', getPosTop(i,j));
				theNumberCeil.css('left', getPosLeft(i,j));
				theNumberCeil.css('background-color', getNumberBackgroundColor( board[i][j] ));
				theNumberCeil.css('color', getNumberColor( board[i][j] ));
				theNumberCeil.text(board[i][j]);

			}
			hasConfilicted[i][j] = false;
		}
	}
}

function generateOneNumber() {
	if ( nospace( board )) {
		console.log('sss');
		return false;
	};
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	while(true){
		if ( board[randx][randy] == 0) {
			break;
		};	
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
	}
	//随机数字
	var randNumber = Math.random() > 0.5 ? 2 : 4;

	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showAnimation( randx, randy, randNumber );//设置动画效果
	return true;
}

$(document).keydown(function( event ){
	switch( event.keyCode ){
		case 37://left
			event.preventDefault();
			if ( moveLeft()){
				setTimeout("generateOneNumber()", 200);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 38://up
			event.preventDefault();
			if ( moveUp()){
				setTimeout("generateOneNumber()", 200);
				setTimeout("isGameOver()", 300);
			}

			break;
		case 39://right
			event.preventDefault();
			if ( moveRight()){
				setTimeout("generateOneNumber()", 200);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 40://down
			event.preventDefault();
			if ( moveDown()){
				setTimeout("generateOneNumber()", 200);
				setTimeout("isGameOver()", 300);
			}
			break;
		default:break;
	}
});
function isGameOver(){
	if (nospace( board ) && noMove( board )) {
		gameOver();
	};
}
function gameOver(){
	alert("Game Over!");
}
function moveLeft(){
	if ( !canMoveLeft(board) ){
		return false;
	};
 	for (var i = 0; i < 4; i++) {
 		for (var j = 1; j < 4; j++) { //from j=1，
 			if (board[i][j] !== 0 ) {
 				for (var k = 0; k < j; k++) {
 					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
 						//move
 						showMoveAnimation(i, j, i, k);
 						board[i][k] = board[i][j];
 						board[i][j] = 0;
 						continue;
			
 					}else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConfilicted[i][k]){
 						//move
 						showMoveAnimation(i, j, i, k);
 						//add
 						board[i][k] += board[i][j];
 						board[i][j] = 0;
 						score += board[i][k];
 						hasConfilicted[i][k] = true;
 						updateScore(score);
 						continue;
 					}
 				};
 			};
 		};
 	};
 	setTimeout( "updateBoardView()",200);
	return true;
}
function moveRight(){
	if ( !canMoveRight(board) ){
		return false;
	};
 	for (var i = 0; i < 4; i++) {
 		for (var j = 2; j >= 0; j--) { 
 			if (board[i][j] !== 0 ) {
 				for (var k = 3; k > j; k--) {
 					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
 						//move
 						showMoveAnimation(i, j, i, k);
 						board[i][k] = board[i][j];
 						board[i][j] = 0;
 						continue;
 					}else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConfilicted[i][k]){
 						//move
 						showMoveAnimation(i, j, i, k);
 						//add
 						board[i][k] *= 2; 
 						board[i][j] = 0;
 						score += board[i][k];
 						hasConfilicted[i][k] = true;
 						updateScore(score);
 						continue;
 					}
 				};
 			};
 		};
 	};
 	setTimeout( "updateBoardView()",200);
	return true;
}
function moveUp(){
	if ( !canMoveUp(board) ){
		return false;
	};
 	for (var j = 0; j < 4; j++ ) {//from i=1
 		for (var i = 1; i < 4; i++) {
 			if (board[i][j] !== 0 ) {
 				for (var k = 0; k < i; k++) {
 					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
 						//move
 						showMoveAnimation(i, j, k, j);
 						board[k][j] = board[i][j];
 						board[i][j] = 0;
 						continue;
 					}else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConfilicted[k][j]){
 						//move
 						showMoveAnimation(i, j, k, j);
 						//add
 						board[k][j] *= 2;
 						board[i][j] = 0;
 						score += board[k][j];
 						updateScore(score);
 						hasConfilicted[k][j] = true;
 						continue;
 					}
 				};
 			};
 		};
 	};
 	setTimeout( "updateBoardView()",200);
	return true;
}
function moveDown(){
	if ( !canMoveDown(board) ){
		return false;
	};
 	for (var j = 0; j < 4; j++) {
 		for (var i = 2; i >= 0; i--) { //i<3
 			if (board[i][j] !== 0 ) {
 				for (var k = 3; k > i; k--) {
 					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
 						//move
 						showMoveAnimation(i, j, k, j);
 						board[k][j] = board[i][j];
 						board[i][j] = 0;
 						continue;
 					}else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConfilicted[k][j]){
 						//move
 						showMoveAnimation(i, j, k, j);
 						//add
 						board[k][j] *= 2;
 						board[i][j] = 0;
 						score += board[k][j];
 						hasConfilicted[k][j] = true;
 						updateScore(score);
 						continue;
 					}
 				};
 			};
 		};
 	};
 	setTimeout( "updateBoardView()",200);
	return true;
}
