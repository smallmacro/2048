function showAnimation( x, y, number ){
	var numberCeil =  $('#number-ceil-' + x + '-' + y);
	numberCeil.css('background-color', getNumberBackgroundColor( number ));
	numberCeil.css('color', getNumberColor( number ));
	numberCeil.text( number );


	numberCeil.animate({
		width: "20%",
		height: "20%",
		top: getPosTop(x, y),
		left: getPosLeft(x, y)
		},50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
	var numberCeil =  $('#number-ceil-' + fromx + '-' + fromy);
	numberCeil.animate({
		top: getPosTop(tox, toy),
		left: getPosLeft(tox, toy)
		},200);
}

function updateScore(score) {
	$("#score").text(score);
}