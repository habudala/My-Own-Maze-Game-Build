
// new images are made here for the Image Constructor

// new hero image instance

var heroBackground = new Image();
heroBackground.src = "Images/sprite image.png";

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////INITIALIZING GAME ANIMATION/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
function initCanvas () {

	var ctx = document.getElementById("game").getContext("2d");
	var canvW = ctx.canvas.width; 
	var canvH = ctx.canvas.height;


///////////////////////////////////////////////////////////
//////CHARACTER BACKGROUNDS CONSTRUCTOR FUNCTION//////////

	function PlayerBackground () {

		// methods 
		this.render = function(){

			ctx.drawImage(heroBackground,this.clipX += 32, this.clipY, this.clipW, this.clipH, this.x, this.y, this.w, this.h);
			
			if (this.clipX >= 64) {
				this.clipX = -32;
			}
			
		};
	}


///////////////////////////////////////////////////
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


///////////////////////////////////////////
//////WALLS CONSTRUCTOR FUNCTION//////////

	 function CreateRestr () {

	 	//properties

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
			
		};

	}

////////////////////////////////////
///////INSTANCES OF WALLS//////////

	var mainRest = new CreateRestr();
	mainRest.w = canvW;
	mainRest.h = canvH;
	mainRest.x = 0;
	mainRest.y = 0;


//////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////
////////////////////////INSTANCES OF MAZEWALL///////////////////////////

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
	innerMazeWall.ltx1 = 890; 
	innerMazeWall.lty1 = 200; 
	innerMazeWall.ltx2 = 210; 
	innerMazeWall.lty2 = 200; 
	innerMazeWall.ltx3 = 210;
	innerMazeWall.lty3 = 450; 
	innerMazeWall.ltx4 = 890;
	innerMazeWall.lty4 = 450;
	innerMazeWall.ltx5 = 890;
	innerMazeWall.lty5 = 375;


/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////DRAWING STUFF/////////////////////////////////////

	function animate () {
	////draw within ctx.save & ctx.restore
		ctx.save();
		ctx.clearRect(0,0,canvW,canvH); // this allows for movement effect (instead of drawn effect)

	//////.....draw here......//////
	 
		
		mainRest.render();
		outerMazeWall.render();
		innerMazeWall.render();
		backGround.render();

		clearInterval(animateInterval)
		
		ctx.restore();
	}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// SETTING ANIMATION TIMER/////////////////////////////////

	var animateInterval = setInterval( animate,250);
	

/////////////////////////////////////////////////////////////////////////////////////////
	///// stopping animate function
	//ctx.canvas.addEventListener("click",function(e) {
		//clearInterval(animateInterval)
	//});
////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
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
					 backGround.y -= 15 ; // moving character
					 backGround.clipY = 96; // relevant char image

					 /////field restrictions//////
					 if (backGround.y <= mainRest.y) {backGround.y = mainRest.y + 5;}
					 ///// outer maze restrictions//////
					 ///outer maze outside
					 if ((backGround.y <= outerMazeWall.lty3 - 10)&&
					 	(backGround.y >= outerMazeWall.lty3 - 40)&&
					 	(backGround.x > outerMazeWall.ltx4 - 50)&&
					 	(backGround.x < outerMazeWall.ltx3))

					 	{backGround.y = outerMazeWall.lty3 - 10;
					 	} 
					 ///outer maze inside
					 // upper wall
					 if ((backGround.y <= outerMazeWall.lty2 - 10)&&
					 	(backGround.y >= outerMazeWall.lty2 - 40)&&
					 	(backGround.x > outerMazeWall.ltx1 - 30)&&
					 	(backGround.x < outerMazeWall.ltx2))

					 	{backGround.y = outerMazeWall.lty2 - 10;
					 	}
					 	///// inner maze restrictions//////
					 	///inner maze outside///
					 if ((backGround.y <= innerMazeWall.lty3 - 10)&&
					 	(backGround.y >= innerMazeWall.lty3 - 40)&&
					 	(backGround.x > innerMazeWall.ltx3 - 50)&&
					 	(backGround.x < innerMazeWall.ltx4 - 30)) 

					 	{backGround.y = innerMazeWall.lty3 - 10;
					 	}

			break;
			//downward movement
			case 40: 
					 backGround.y += 15; // moving character
					 backGround.clipY = 0; // relevant char image

					 /////field restrictions//////
					 if (backGround.y >= mainRest.h - 52) {backGround.y = mainRest.h - 55;}
					 ///// outer maze restrictions//////
					 ///outer maze outside
					 if ((backGround.y >= outerMazeWall.lty1 - 50)&&
					 	(backGround.y <= outerMazeWall.lty1  - 20)&&
					 	(backGround.x > outerMazeWall.ltx4 - 30)&&
					 	(backGround.x < outerMazeWall.ltx3 - 10))

					 	{backGround.y = outerMazeWall.lty1 - 52;
					 	} 
					 ///outer maze inside
					 //  bottom wall
					  if ((backGround.y <= outerMazeWall.lty3 - 10 )&&
					 	(backGround.y >= outerMazeWall.lty3 - 50)&&
					 	(backGround.x > outerMazeWall.ltx1 - 50)&&
					 	(backGround.x < outerMazeWall.ltx2 - 30)) 

					 	{backGround.y = outerMazeWall.lty3  - 52;
					 	}
					 	///// inner maze restrictions//////
					 	///inner maze outside
					 if ((backGround.y >= innerMazeWall.lty1 - 52)&&
					 	(backGround.y <= innerMazeWall.lty1 - 20)&&
					 	(backGround.x < innerMazeWall.ltx1 )&&
					 	(backGround.x > innerMazeWall.ltx2 )) 

					 	{backGround.y = innerMazeWall.lty1 - 52 ;
					 	}


			break;
			//left movement
			case 37:
					 backGround.x -= 15; // moving character
					 backGround.clipY = 32;// relevant char image

					 /////field restrictions//////
					 if (backGround.x <= mainRest.x ) {backGround.x = mainRest.x;}
					 ///// outer maze restrictions//////
					 ///outer maze outside
					 if ((backGround.x <= outerMazeWall.ltx3)&&
					 	(backGround.x >= outerMazeWall.ltx3 - 50)&&
					 	(backGround.y > outerMazeWall.lty2 - 52 )&&
					 	(backGround.y < outerMazeWall.lty3 - 30)) 

					 	{backGround.x = outerMazeWall.ltx3;
					 	} 
					 ///outer maze inside
					 // upper wall
					 if ((backGround.x <= outerMazeWall.ltx1 )&&
					 	(backGround.x >= outerMazeWall.ltx1 - 30 )&&
					 	(backGround.y < outerMazeWall.mty1 - 30)&&
					 	(backGround.y > outerMazeWall.lty1 - 30)) 

					 	{backGround.x = outerMazeWall.ltx1 ;
					 	} 
					 // lower wall
					if ((backGround.x <= outerMazeWall.ltx1 )&&
					 	(backGround.x >= outerMazeWall.ltx1 - 30 )&&
					 	(backGround.y < outerMazeWall.lty4 - 10)&&
					 	(backGround.y > outerMazeWall.lty5 - 30))

					 	{backGround.x = outerMazeWall.ltx1 ;
					 	}
					 	///// inner maze restrictions//////
					 	///inner maze outside top
					 if ((backGround.x <= innerMazeWall.ltx1)&&
					 	(backGround.x >= innerMazeWall.ltx1 - 30)&&
					 	(backGround.y < innerMazeWall.mty1 )&&
					 	(backGround.y > innerMazeWall.lty1 - 50)) 

					 	{backGround.x = innerMazeWall.ltx1 ;
					 	}
					 	///inner maze outside bottom
					 	 if ((backGround.x <= innerMazeWall.ltx1)&&
					 	(backGround.x >= innerMazeWall.ltx1 - 30)&&
					 	(backGround.y > innerMazeWall.lty5 - 50)&&
					 	(backGround.y < innerMazeWall.lty4 - 12)) 

					 	{backGround.x = innerMazeWall.ltx1 ;
					 	}
					

			break;
			//right movement
			case 39:
			 		backGround.x += 15; // moving character
			 		backGround.clipY = 64;// relevant char image

			 		/////field restrictions//////
			 		if (backGround.x >= mainRest.w - 52) {backGround.x = mainRest.w - 50;}

			 		///// outer maze restrictions//////
			 		///outer maze outside

			 		// upper wall
			 		if ((backGround.x >= outerMazeWall.ltx1 - 50)&&
					 	(backGround.x <= outerMazeWall.ltx1 - 20)&&
					 	(backGround.y < outerMazeWall.mty1 - 30)&&
					 	(backGround.y > outerMazeWall.lty1 - 50))

					 	{backGround.x = outerMazeWall.ltx1 - 50;
					 	} 
					// lower wall
					if ((backGround.x >= outerMazeWall.ltx1 - 50)&&
					 	(backGround.x <= outerMazeWall.ltx1 - 20)&&
					 	(backGround.y < outerMazeWall.lty4 )&&
					 	(backGround.y > outerMazeWall.lty5 - 50))

					 	{backGround.x = outerMazeWall.ltx1 - 50;
					 	}

					 ///outer maze inside
					 // right wall 
					 if ((backGround.x >= outerMazeWall.ltx3 - 50)&&
					 	(backGround.x <= outerMazeWall.ltx3 - 20)&&
					 	(backGround.y > outerMazeWall.lty2 - 30)&&
					 	(backGround.y < outerMazeWall.lty3 )) 

					 	{backGround.x = outerMazeWall.ltx3 - 50;
					 	}
					 	///// inner maze restrictions////// 
					 	///inner maze outside///
					 if ((backGround.x >= innerMazeWall.ltx2 - 50)&&
					 	(backGround.x <= innerMazeWall.ltx2)&&
					 	(backGround.y > innerMazeWall.lty2 - 50)&&
					 	(backGround.y < innerMazeWall.lty3 - 12)) 

					 	{backGround.x = innerMazeWall.ltx2 - 50 ;
					 	}

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