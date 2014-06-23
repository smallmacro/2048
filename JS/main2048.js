var board =  new Array();
var score = 0;


$(document).ready(function(){
	newGame();
});

function newGame(){
	//初始化棋牌格
	init();

	//随机生成2或4的数字

}

function init(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCeil = $('#grid-ceil-' + i + "-" + j);

			gridCeil.css('top', getPosTop(i,j));
			gridCeil.css('left', getPosLeft(i,j));
		}
	}
	for (var i = 0; i < 4; i++) {
		board[i] =  new Array();
		for (var j = 0; j < 4;ji++) {
			board[i][j] = 0;
		};
	}
	updateBoardView();
}

function updateBoardView(){
	$(".number-ceil").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("grid-container").append('<div class= "number-ceil" id="number-ceil-' + i + '-' + j +'"><div>' );
			var theNumberCeil = $('#number-ceil-' + i + '-' + j);
			if ( board[i][j] === 0 ) {
				theNumberCeil.css('width', '0px');
				theNumberCeil.css('height', '0px');
				theNumberCeil.css('top', getPosTop(i,j) + 50);
				theNumberCeil.css('left', getPosLeft(i,j) + 50);
			}else{
				theNumberCeil.css('width', '100px');
				theNumberCeil.css('height', '100px');
				theNumberCeil.css('top', getPosTop(i,j));
				theNumberCeil.css('left', getPosLeft(i,j));
				theNumberCeil.css('background-color', getNumberBackgroundColor( board[i][j] ));
				theNumberCeil.css('color', getNumberColor( borad[i][j] ));
				theNumberCeil.text(board[i][j]);

			}
		}
	}
}