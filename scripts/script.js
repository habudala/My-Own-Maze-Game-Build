
// new images are made here for the Image Constructor
// new hero image instance
var heroBackground = new Image();
heroBackground.src = "Images/sprite image.png";


function initCanvas () {

	var ctx = document.getElementById("game").getContext("2d");
	var canvW = ctx.canvas.width; 
	var canvH = ctx.canvas.height;

	//////creating hero properties///////

	// var heroXPos = heroBackground.x = 10;
	// var heroYPos = heroBackground.y = 310;
	



//////background constructor function

	 function PlayerBackground () {

		//properties
		this.x = 0;
		this.y = 0;
		this.w = 40;
		this.h = 40;
		this.clipX = 32;
		this.clipY = 64;
		this.clipW = 32;
		this.clipH = 32;

		// methods 
		this.render = function(){

			ctx.drawImage(heroBackground,this.clipX+=32, this.clipY, this.clipW, this.clipH, this.x, this.y, this.w, this.h);

			
			if (this.clipX >= 60) {
				this.clipX = 0;
			}
			
		}

	}


	/////////creating new instance of a background//////////

	//////running player////////
	var backGround = new PlayerBackground();
	backGround.x = 10;
	backGround.y = 310;
	backGround.w = 40;
	backGround.h = 40;
	backGround.clipX = 32;
	backGround.clipY = 64;
	backGround.clipW = 31;
	backGround.clipH = 32;




	function animate () {
	////draw within ctx.save & ctx.restore
		ctx.save();
		ctx.clearRect(0,0,canvW,canvH); // this allows for movement effect (instead of drawn effect)

	/////////////////////////////////////draw here////////////////////////////////
		backGround.render();

		clearInterval(animateInterval)
		ctx.restore();
	}


	///// setting animation timer
	var animateInterval = setInterval( animate,200);



	///// stopping animate function
	//ctx.canvas.addEventListener("click",function(e) {
		//clearInterval(animateInterval)
	//});



	/////////Adding event listeners to keyboard///////////

	

	document.addEventListener("keydown", function (e) {

		var target = e.keyCode;
		//console.log(target);  //self check
		//-38 up
		//-40 down
		//- 37 left
		//-39 right

		animate();

		switch (target) {
			//upward movement
			case 38:
					 backGround.y -= 13 ;
					 backGround.clipY = 96;

			break;
			//downward movement
			case 40: 
					 backGround.y += 13;
					 backGround.clipY = 0;

			break;
			//left movement
			case 37:
					 backGround.x -= 13; 
					 backGround.clipY = 32;

			break;
			//right movement
			case 39:
			 		backGround.x += 13;
			 		backGround.clipY = 64;


			break;
		}

	});

///////////////adding event listener to keyup event/////////////////
	document.addEventListener("keyup", function (e) {
		clearInterval(animateInterval)
	});

}

window.addEventListener("load", function(e) {

	initCanvas();

});