//01-18-2016 v1 done - need to clean code up!

var snake = {
	direction :"r",
	startheadPos : [20,20],
	headPos : [20,20],
	bodyPos : [[20,20]],

	addTail: function (){
		var $grid = $('.grid'),
			lastOfBodyPos = $(snake.bodyPos).last()[0];
		snake.bodyPos.push([lastOfBodyPos[0]]);
		},
	//eatFood: function(){
		
		//},

	render: function(){
		var $grid = $('.grid');
		switch(snake.direction){
			case 'l':
				snake.headPos[0] -= 1
				break;
			case 'u':
				snake.headPos[1] -= 1
				break;
			case 'r':
				snake.headPos[0] += 1
				//console.log('head b4 ' + snake.headPos);
				break;
			case 'd':
				snake.headPos[1] += 1
				break;
			default: return;
		}

		if(snake.headPos[0] > 40 || snake.headPos[0] < 1 || snake.headPos[1] > 40 || snake.headPos[1] < 1){
			reset();
		}

		snake.bodyPos.unshift([snake.headPos[0],snake.headPos[1]]);
		snake.bodyPos.pop();

		if ($('.food.snake').length > 0) { 
			generateFood();
			snake.addTail();
		}
		
		$('div').removeClass('snake');
		for(var i = 0; i  < snake.bodyPos.length; i++){
			if($grid.find('[data-col="'+snake.bodyPos[i][0]+'"]' + '[data-row="'+snake.bodyPos[i][1]+'"]').hasClass('snake') === true){
				reset();
			}else{
			$grid.find('[data-col="'+snake.bodyPos[i][0]+'"]' + '[data-row="'+snake.bodyPos[i][1]+'"]').addClass('snake');
			}
		}


	}
		
};





//creating the gird
function render(){
	var $grid = $('.grid'),
		columns = 41,
		rows = 41,
		totalTiles = columns * rows;	
	for (var i = 1; i < rows; i++){
		for (var g = 1; g < columns; g++){
			$grid.append('<div data-col="' + g + '" data-row="' + i + '"></div>');		
		}
	};
	//Rending Snake Starting headPos
	$grid.find('[data-col="'+snake.startheadPos[0]+'"]' + '[data-row="'+snake.startheadPos[1]+'"]').addClass('snake');
}

function generateFood(){
	var $grid = $('.grid'),
		foodCol = 1 + Math.floor(Math.random() * 40),
		foodRow = 1 + Math.floor(Math.random() * 40) ;
	$('div').removeClass('food');
	$grid.find('[data-col="'+foodCol+'"]' + '[data-row="'+foodRow+'"]').addClass('food');
}

function reset(){
	snake.direction = 'r';
	snake.headPos = [20,20];
	snake.bodyPos = [[20,20]];
	confirm('Your snake died ;_;7 ')
}
render();
generateFood();
window.setInterval(snake.render, 100);




//Arrow keys event listeners
$(document).keydown(function move(e){
	switch(e.which){
		case 37: //left	
			snake.direction = "l"
			break;
		case 38://up
			snake.direction = "u"
			break;
		case 39://right
			snake.direction = "r"
			break;
		case 40://down
			snake.direction = "d"
			break;
		case 8://space
			eatFood();
			//snake.addTail();
			break;
		default: return;
	}
	e.preventDefault();			
})


