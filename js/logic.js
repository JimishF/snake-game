var scl = 10;
var Food = function(){
	this.x = scl * constrain(floor(random(width/scl)),0,width-scl );
	this.y = scl * constrain(floor(random(height/scl)),0,height-scl );

	this.show = function(){
		fill(240,10,100);
		rect (this.x,this.y,scl,scl );
	}
}
var Snake = function(){
	
	this.x = 0;
	this.y = 0;
	
	this.total = 4;

	this.dx = 1;
	this.dy = 0;

	this.allowVertical = true;

	this.show = function (){
		fill(255);
		rect (this.x,this.y,scl,scl );
 		for( var i = this.tail.length - 1; i > this.tail.length - this.total  ; i-- ){
			rect (this.tail[ i ].x, this.tail[ i ].y,scl,scl );
		}
	}
	
	this.collieded = function(){
		for( var i in this.tail ){
			if ( this.tail[ i ].x == this.tmpx &&  this.tail[ i ].y == this.tmpy ){
				return true;
			}
		}
		return false;
	} 
	this.hadleOverflow = function(item, min, max, scl){
		if( item > max-scl ){
			return min;
		}else if( item < min ){
			return max-scl;
		}
		return item;
	}


	this.update = function(){
		this.tail.shift();
	
		if ( this.collieded() ){
			alert( "lolzz: Game over");
		}
		if( this.eat() )
		{
			this.total++;
			this.changeHeadTo({x :this.x, y :this.y});
			this.setNewFood();	
			doNotShift = false;
		}

		this.tmpx = this.x + this.dx * scl; 
		this.tmpy = this.y + this.dy * scl;

		this.tail.push({x:this.x,y:this.y});

		this.x = this.hadleOverflow(this.tmpx, 0, width, scl);
		this.y = this.hadleOverflow(this.tmpy, 0, height, scl);

	}

	this.changeHeadTo = function (obj) 
	{
		for( var i = this.tail.length ; i > 0; i-- ){
			this.tail[ i ] = this.tail[ i-1 ];
		}	
		this.tail[0] = obj;
	}
	this.eat = function(){
		 return  ( Math.abs(this.food.x - this.x) < 1  && Math.abs(this.food.y - this.y) < 1) 
	}
	
	this.setNewFood = function(){
		this.food = new Food();
	}

	this.direction = function(xi,yi){
		this.dx = xi;
		this.dy = yi;
	}

	this.tail = [];
	this.food = new Food();

	for( var i = 1 ; i <= this.total; i++ )
	{
		this.tail.push ({ x: this.x - (i*scl),y: this.y - (i*scl)  })
	}
	
}

function setup() {
   createCanvas(640, 500);    
   snake = new Snake();
   snake.setNewFood();
   frameRate(15);
}

function keyPressed(){
	if ( keyCode === UP_ARROW && snake.allowVertical ){
		snake.allowVertical = false;
		snake.direction(0,-1);
	}
	else if(  keyCode === DOWN_ARROW && snake.allowVertical ){
		snake.allowVertical = false;
		snake.direction(0,1);
	}else if(  keyCode === LEFT_ARROW && !snake.allowVertical ){
		snake.allowVertical = true;
		snake.direction(-1,0);
	}else if(  keyCode === RIGHT_ARROW && !snake.allowVertical ){
		snake.allowVertical = true;
		snake.direction(1,0);
	}
}


function draw() 
{
	background(50);
	snake.food.show();
	snake.update();
	snake.show();
	// clear();
}