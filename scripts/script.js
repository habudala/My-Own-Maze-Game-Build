
// new images are made here for the Image Constructor
// new hero image instance
var heroBackground = new Image();
heroBackground.src = "Images/sprite image.png";

////////////////////////////////////INITIALIZING GAME ANIMATION/////////////////////////////////////
function initCanvas () {

	var ctx = document.getElementById("game").getContext("2d");
	var canvW = ctx.canvas.width; 
	var canvH = ctx.canvas.height;

	
	


//////CHARACTER BACKGROUNDS CONSTRUCTOR FUNCTION//////////

	 function PlayerBackground () {

		// methods 
		this.render = function(){

			ctx.drawImage(heroBackground,this.clipX += 32, this.clipY, this.clipW, this.clipH, this.x, this.y, this.w, this.h);
			
			if (this.clipX >= 64) {
				this.clipX = -32;
			}
			
		}

	};


///////INSTANCES OF BACKGROUNDS(PLAYERS)//////////

	////// player////////
	var backGround = new PlayerBackground();
	backGround.x = 10;
	backGround.y = 310;
	backGround.w = 50;
	backGround.h = 50;
	backGround.clipX = -32;
	backGround.clipY = 64;
	backGround.clipW = 32;
	backGround.clipH = 32;



//////WALLS CONSTRUCTOR FUNCTION//////////

	 function CreateRestr () {

		//properties
		// this.x = 0;
		// this.y = 0;
		// this.w = 40;
		// this.h = 40;
		// this.clipX = 0;
		// this.clipY = 64;
		// this.clipW = 32;
		// this.clipH = 32;

		// methods 
		this.render = function(){

			ctx.strokeStyle = "black";
			ctx.lineWidth = 10;
			// ctx.lineCap = "round";
			// ctx.lineJoin = "round";
			// ctx.setLineDash([10,25,7]);
			// ctx.lineDashOffset = this.dashOffset;
			// ctx.strokeStyle = "dashed";
			ctx.strokeRect(0,0,this.w,this.h);
			
		}

	};

///////INSTANCES OF WALLS//////////

	var mainRest = new CreateRestr();
	mainRest.w = canvW;
	mainRest.h = canvH;


////////////////////LABYRINTH CONSTRUCTOR FUNCTIONs//////////////////////////////
	
	 function MazeWall () {

		//properties

		// methods 
		this.render = function(){

			//console.log("I work") //self check
			ctx.strokeStyle = "black";
			ctx.lineWidth = 7;

			ctx.beginPath();
			ctx.moveTo(this.mtx1, this.mty1);
			ctx.lineTo(this.ltx1, this.lty1);
			ctx.lineTo(this.ltx2, this.lty2);
			ctx.lineTo(this.ltx3, this.lty3);
			ctx.lineTo(this.ltx4, this.lty4);
			ctx.lineTo(this.ltx4, this.lty5);
			ctx.stroke();

			
		}

	};

///////INSTANCE OF OUTER MAZE//////////

////// outer maze ////////

	var outerMazeWall = new MazeWall();
	outerMazeWall.mtx1 = 110;
	outerMazeWall.mty1 = 275;
	outerMazeWall.ltx1 = 110;
	outerMazeWall.lty1 = 100;
	outerMazeWall.ltx2 = 990;
	outerMazeWall.lty2 = 100;
	outerMazeWall.ltx3 = 990;
	outerMazeWall.lty3 = 550;
	outerMazeWall.ltx4 = 110;
	outerMazeWall.lty4 = 550;
	outerMazeWall.ltx5 = 110;
	outerMazeWall.lty5 = 375;
		
////// inner maze ////////

	var innerMazeWall = new MazeWall();
	innerMazeWall.mtx1 = 890;
	innerMazeWall.mty1 = 275;
	innerMazeWall.ltx1 = 890
	innerMazeWall.lty1 = 200;
	innerMazeWall.ltx2 = 210;
	innerMazeWall.lty2 = 200;
	innerMazeWall.ltx3 = 210;
	innerMazeWall.lty3 = 450;
	innerMazeWall.ltx4 = 890;
	innerMazeWall.lty4 = 450;
	innerMazeWall.ltx5 = 890;
	innerMazeWall.lty5 = 375;






//////////////////////////////////////DRAWING STUFF/////////////////////////////////////

	function animate () {
	////draw within ctx.save & ctx.restore
		ctx.save();
		ctx.clearRect(0,0,canvW,canvH); // this allows for movement effect (instead of drawn effect)

	//////.....draw here......//////
	 
		backGround.render();
		mainRest.render();
		outerMazeWall.render();
		innerMazeWall.render();

		clearInterval(animateInterval)
		
		ctx.restore();
	}


///////////////////////////////// SETTING ANIMATION TIMER/////////////////////////////////

	var animateInterval = setInterval( animate,250);


/////////////////////////////////////////////////////////////////////////////////////////
	///// stopping animate function
	//ctx.canvas.addEventListener("click",function(e) {
		//clearInterval(animateInterval)
	//});
////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////ADDING EVENT LISTENERS TO KEYBOARDS/////////////////////////

////////listener for keydown//////

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
					 backGround.y -= 12 ;
					 backGround.clipY = 96; console.log();

			break;
			//downward movement
			case 40: 
					 backGround.y += 12; 
					 backGround.clipY = 0;

			break;
			//left movement
			case 37:
					 backGround.x -= 12; 
					 backGround.clipY = 32;

			break;
			//right movement
			case 39:
			 		backGround.x += 12; 
			 		backGround.clipY = 64;

			break;
		}

	});

///////////////listener for keyup/////////////////

	document.addEventListener("keyup", function (e) {
			target = e.keyCode;

		 clearInterval(animateInterval);

	});

}

window.addEventListener("load", function(e) {

	initCanvas();

});