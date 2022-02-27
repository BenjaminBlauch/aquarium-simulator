//Designed and Illustrated by Benjamin Blauch

//Gets the canvas
let canvas = document.getElementById("aquarium");
//Gets the 2d context
let ctx = canvas.getContext("2d");

const TANKWIDTH = 1960; //Bigger numbers go
const TANKHEIGHT = 1080; //Depth, bigger numbers go DOWN

//Classes
class Tang {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .7);
		this.minY = Math.round(tankHeight * .15);
		//Size of the Fish
		this.width = 140;
		this.height = 140;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Tang');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .3,
			y: .1
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = 0; //sticks to top
		if(this.position.y + this.height > this.maxY) { //will get speed and height if on the bottom
			this.swimUp = true;
			this.speedTimer = 450;
		}
		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//randomly flips the fish
		if(Math.round(Math.random() * 500) == 500) {
			this.faceRight = !this.faceRight;
			this.speed.x = -this.speed.x;
		}

		//determines if the fish gets a speed boost
		if(this.swimUp) {
			if(this.faceRight) this.speed.x = 5;
			else this.speed.x = -5;
			this.speed.y = -.7;
			this.swimUp = false;
		}
		else if(this.speedTimer <= 0) {
			this.speed.y = .1;
			if(this.faceRight) this.speed.x = .3;
			else this.speed.x = -.3;

			if(Math.round(Math.random() * 1000) == 1000) {
				if(this.faceRight) this.speed.x = 5;
				else this.speed.x = -5;
				this.speed.y = -.7;
				this.speedTimer = 450;
			}
		}
		else {
			--this.speedTimer;
			if (this.faceRight) this.speed.x = this.speed.x - .01;
			else this.speed.x = this.speed.x + .01;
			this.speed.y += .001;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 3.5 || this.speed.x < -3.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class Surgeonfish {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .8);
		this.minY = Math.round(tankHeight * .3);
		//Size of the Fish
		this.width = 120;
		this.height = 70;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Surgeonfish');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .4,
			y: .08
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = 0; //sticks to top
		if(this.position.y + this.height > this.maxY) { //will get speed and height if on the bottom
			this.swimUp = true;
			this.speedTimer = 450;
		}
		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//randomly flips the fish
		if(Math.round(Math.random() * 500) == 500) {
			this.faceRight = !this.faceRight;
			this.speed.x = -this.speed.x;
		}

		//determines if the fish gets a speed boost
		if(this.swimUp) {
			if(this.faceRight) this.speed.x = 5.2;
			else this.speed.x = -5.2;
			this.speed.y = -.7;
			this.swimUp = false;
		}
		else if(this.speedTimer <= 0) {
			this.speed.y = .08;
			if(this.faceRight) this.speed.x = .4;
			else this.speed.x = -.4;

			if(Math.round(Math.random() * 1000) == 1000) {
				if(this.faceRight) this.speed.x = 5.2;
				else this.speed.x = -5.2;
				this.speed.y = -.7;
				this.speedTimer = 450;
			}
		}
		else {
			--this.speedTimer;
			if (this.faceRight) this.speed.x = this.speed.x - .01;
			else this.speed.x = this.speed.x + .01;
			this.speed.y += .001;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 3.5 || this.speed.x < -3.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class Triggerfish {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .7);
		this.minY = Math.round(tankHeight * .05);
		//Size of the Fish
		this.width = 280;
		this.height = 180;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Triggerfish');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .2,
			y: .06
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = 0; //sticks to top
		if(this.position.y + this.height > this.maxY) { //will get speed and height if on the bottom
			this.swimUp = true;
			this.speedTimer = 450;
		}
		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//randomly flips the fish
		if(Math.round(Math.random() * 500) == 500) {
			this.faceRight = !this.faceRight;
			this.speed.x = -this.speed.x;
		}

		//determines if the fish gets a speed boost
		if(this.swimUp) {
			if(this.faceRight) this.speed.x = 4.5;
			else this.speed.x = -4.5;
			this.speed.y = -.6;
			this.swimUp = false;
		}
		else if(this.speedTimer <= 0) {
			this.speed.y = .06;
			if(this.faceRight) this.speed.x = .2;
			else this.speed.x = -.2;

			if(Math.round(Math.random() * 2000) == 2000) {
				if(this.faceRight) this.speed.x = 4.5;
				else this.speed.x = -4.5;
				this.speed.y = -.6;
				this.speedTimer = 450;
			}
		}
		else {
			--this.speedTimer;
			if (this.faceRight) this.speed.x = this.speed.x - .01;
			else this.speed.x = this.speed.x + .01;
			this.speed.y += .001;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 3.5 || this.speed.x < -3.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class Clownfish {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .9);
		this.minY = Math.round(tankHeight * .5);
		//Size of the Fish
		this.width = 106;
		this.height = 60;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Clownfish');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .4,
			y: .05
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = 0; //sticks to top
		if(this.position.y + this.height > this.maxY) { //will get speed and height if on the bottom
			this.swimUp = true;
			this.speedTimer = 450;
		}
		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//randomly flips the fish
		if(Math.round(Math.random() * 500) == 500) {
			this.faceRight = !this.faceRight;
			this.speed.x = -this.speed.x;
		}

		//determines if the fish gets a speed boost
		if(this.swimUp) {
			if(this.faceRight) this.speed.x = 5;
			else this.speed.x = -5;
			this.speed.y = -.64;
			this.swimUp = false;
		}
		else if(this.speedTimer <= 0) {
			this.speed.y = .05;
			if(this.faceRight) this.speed.x = .4;
			else this.speed.x = -.4;

			if(Math.round(Math.random() * 1000) == 1000) {
				if(this.faceRight) this.speed.x = 5;
				else this.speed.x = -5;
				this.speed.y = -.64;
				this.speedTimer = 450;
			}
		}
		else {
			--this.speedTimer;
			if (this.faceRight) this.speed.x = this.speed.x - .01;
			else this.speed.x = this.speed.x + .01;
			this.speed.y += .001;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 3.5 || this.speed.x < -3.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class Cuttlefish {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .93);
		this.minY = Math.round(tankHeight * .75);
		//Size of the Fish
		this.width = 240;
		this.height = 90;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Cuttlefish');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .2,
			y: .01
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = 0; //sticks to top
		if(this.position.y + this.height > this.maxY) { //will get speed and height if on the bottom
			this.swimUp = true;
			this.speedTimer = 225;
		}
		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//randomly flips the fish
		if(Math.round(Math.random() * 500) == 500) {
			this.faceRight = !this.faceRight;
			this.speed.x = -this.speed.x;
		}

		//determines if the fish gets a speed boost
		if(this.swimUp) {
			if(this.faceRight) this.speed.x = 5;
			else this.speed.x = -2.5;
			this.speed.y = -.03;
			this.swimUp = false;
		}
		else if(this.speedTimer <= 0) {
			this.speed.y = .01;
			if(this.faceRight) this.speed.x = .2;
			else this.speed.x = -.2;

			if(Math.round(Math.random() * 2000) == 2000) {
				if(this.faceRight) this.speed.x = 5;
				else this.speed.x = -2.5;
				this.speed.y = -.03;
				this.speedTimer = 225;
			}
		}
		else {
			--this.speedTimer;
			if (this.faceRight) this.speed.x = this.speed.x - .01;
			else this.speed.x = this.speed.x + .01;
			this.speed.y += .0001;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 1.5 || this.speed.x < -1.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class Pufferfish {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .8);
		this.minY = Math.round(tankHeight * .2);
		//Size of the Fish
		this.width = 210;
		this.height = 100;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Pufferfish');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .3,
			y: .1
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;

		//To determine if the fish inflates
		this.inflateTimer = 0;
		this.inflate = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = 0; //sticks to top
		if(this.position.y + this.height > this.maxY) { //will get speed and height if on the bottom
			this.swimUp = true;
			this.speedTimer = 450;
		}
		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//randomly flips the fish
		if(Math.round(Math.random() * 500) == 500) {
			this.faceRight = !this.faceRight;
			this.speed.x = -this.speed.x;
		}

		//determines if the fish gets a speed boost
		if(this.inflate) {

		}
		else if(this.swimUp) {
			if(this.faceRight) this.speed.x = 5;
			else this.speed.x = -5;
			this.speed.y = -.7;
			this.swimUp = false;
		}
		else if(this.speedTimer <= 0) {
			this.speed.y = .1;
			if(this.faceRight) this.speed.x = .3;
			else this.speed.x = -.3;

			if(Math.round(Math.random() * 1000) == 1000) {
				if(this.faceRight) this.speed.x = 5;
				else this.speed.x = -5;
				this.speed.y = -.7;
				this.speedTimer = 450;
			}
		}
		else {
			--this.speedTimer;
			if (this.faceRight) this.speed.x = this.speed.x - .01;
			else this.speed.x = this.speed.x + .01;
			this.speed.y += .001;
		}

		//determines if the fish inflates
		if(this.inflateTimer <= 0) {
			if(this.inflate) {
				this.inflate = false;
			}

			if(Math.round(Math.random() * 1000) == 1000) {
				if (this.faceRight) this.speed.x = .05;
				else this.speed.x = -.05;
				this.inflate = true;
				this.speed.y = -.05;
				this.inflateTimer = 450;
				this.imgPosition.y += 200;
			}
		}
		else {
			--this.inflateTimer;
			if (this.faceRight) this.speed.x = .05;
			else this.speed.x = -.05;
			this.imgPosition.y += 200;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 3.5 || this.speed.x < -3.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class Shark {
	constructor(tankWidth, tankHeight) {
		//To determine where to bounce off of the wall
		this.maxX = tankWidth;
		this.maxY = Math.round(tankHeight * .3);
		this.minY = Math.round(tankHeight * .01);
		//Size of the Fish
		this.width = 620;
		this.height = 180;
		//Sprite sheet for the fish
		this.image = document.getElementById('img_fish_Shark');
		//Used to calculate new postion in the draw function
		this.speed = {
			x: .8,
			y: .04
		};
		//Current coordinates for drawing. This will be the initial starting value
		this.position = {
			x: Math.round(Math.random() * (this.maxX - this.width)),
			y: this.minY + Math.round(Math.random() * (this.maxY - this.height - this.minY))
		};
		//Will determine the animation later right now the fish cannot start facing left this way
		this.faceRight = true;
		//Animation frame for basic movement
		this.frameNum = 0;

		//Coordinates for the sprite sheet
		this.imgPosition = {
			x: 0, //top left corner is 0,0
			y: 0 //Bigger numbers go down
		};
		//To determine if the fish needs to speed up
		this.speedTimer = 0;
		this.swimUp = false;
	}

	//Places the object on the canvas
	draw(ctx) {
		ctx.drawImage(this.image, this.imgPosition.x, this.imgPosition.y, this.width, this.height,//sprite coords and dimensions
			this.position.x, this.position.y, this.width, this.height); //placement coords and dimensions(same)
	}

	//Checks if values need to change and changes accordingly
	//deltaTime (change in time) allows adjustments every frame
	update(deltaTime) {
		if(!deltaTime) return; //Allows the program to not soft lock
		this.position.x += this.speed.x; //Position changes based on current vectors
		this.position.y += this.speed.y; //Position changes based on current vectors
		//Keeps Fish within its horizontal bounds
		if(this.position.x < 0 - this.width * 2) {
			this.speed.x = -this.speed.x; //currently bounces
		}
		if(this.position.x - this.width > this.maxX) {
			this.speed.x = -this.speed.x;
		}
		//Keeps Fish within its vertical bounds
		if(this.position.y < this.minY) this.speed.y = -this.speed.y; //sticks to top
		if(this.position.y + this.height > this.maxY) this.speed.y = -this.speed.y;

		//facing left or right for image flip
		if(this.speed.x < 0) {
			this.faceRight = false;
			this.imgPosition.y = 0;
		}
		else {
			this.faceRight = true;
			this.imgPosition.y = this.height;
		}

		//Moving Animation
		if(this.frameNum < 149) {
			if(this.frameNum % 15 == 0 && this.frameNum != 0) this.imgPosition.x += this.width;
			++this.frameNum;
			if(this.speed.x > 3.5 || this.speed.x < -3.5) this.frameNum += 5;
		}
		else {
			this.imgPosition.x = 0;
			this.frameNum = 0;
		}
	}
}

class InputHandler {
	constructor(aquarium) {
		//For when the user presses a key
		document.addEventListener('keydown', (event) => {
			switch(event.keyCode) {
				case 49: //1 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.tangArray.push(new Tang(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.tangArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;

				case 50: //2 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.surgeonfishArray.push(new Surgeonfish(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.surgeonfishArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;

				case 51: //3 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.triggerfishArray.push(new Triggerfish(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.triggerfishArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;

				case 52: //4 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.clownfishArray.push(new Clownfish(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.clownfishArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;

				case 53: //5 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.cuttlefishArray.push(new Cuttlefish(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.cuttlefishArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;

				case 54: //6 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.sharkArray.push(new Shark(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.sharkArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;

				case 55: //7 key
				if(!aquarium.holdAdd && !aquarium.holdDelete) {
					aquarium.pufferfishArray.push(new Pufferfish(TANKWIDTH, TANKHEIGHT));
					aquarium.holdAdd = true;
					break;
				}
				else if(!aquarium.holdAdd && aquarium.holdDelete) {
					aquarium.pufferfishArray.pop();
					aquarium.holdAdd = true;
					break;
				}
				else {
					aquarium.holdAdd = true; //probably useless
				}
				break;
				
				case 32: //Spacebar
				aquarium.holdDelete = true;
				break;

				//0 key is 48
			}
		});
		//For when the user releases a key
		//Could be simplified?
		document.addEventListener('keyup', (event) => {
			switch(event.keyCode) {
				case 49: //1 key
				aquarium.holdAdd = false;
				break;

				case 50: //2 key
				aquarium.holdAdd = false;
				break;

				case 51: //3 key
				aquarium.holdAdd = false;
				break;

				case 52: //4 key
				aquarium.holdAdd = false;
				break;

				case 53: //5 key
				aquarium.holdAdd = false;
				break;

				case 54: //6 key
				aquarium.holdAdd = false;
				break;

				case 55: //7 key
				aquarium.holdAdd = false;
				break;

				case 32: //Spacebar
				aquarium.holdDelete = false;
				break;
			}
		});
	}
}


class Aquarium {
	constructor() {
		this.tangArray = [];
		this.surgeonfishArray = [];
		this.triggerfishArray = [];
		this.clownfishArray = [];
		this.sharkArray = [];
		this.cuttlefishArray = [];
		this.pufferfishArray = [];
		this.holdDelete = false;
		this.holdAdd = false;
		new InputHandler(this);
	}

	update(deltaTime) {
		//Iterates over all Aquarium objects to update them
		[...this.sharkArray, ...this.triggerfishArray, ...this.tangArray, 
			...this.surgeonfishArray, ...this.clownfishArray, ...this.pufferfishArray,
			...this.cuttlefishArray].forEach(object => object.update(deltaTime));
	}

	draw(ctx) {
		//Iterates over all Aquarium objects to draw them
		//Objects listed first will appear behind
		[...this.sharkArray, ...this.triggerfishArray, ...this.tangArray, 
			...this.surgeonfishArray, ...this.clownfishArray, ...this.pufferfishArray,
			...this.cuttlefishArray].forEach(object => object.draw(ctx));
	}
}

//Instantiate an Aquarium
let aquarium = new Aquarium();

//An active counter for frames
let lastTime = 0;

//The loop
function simulate(timestamp) {
	//Could be expanded on
	this.background = document.getElementById('img_background');
	this.foreground = document.getElementById('img_foreground');

	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	//Clears canvas every frame so new images are not drawn over old ones
	ctx.clearRect(0, 0, TANKWIDTH, TANKHEIGHT);

	//Could be expanded on
	ctx.drawImage(this.background, 0, 0, TANKWIDTH, TANKHEIGHT, //sprite coords and dimensions
		0, 0, TANKWIDTH, TANKHEIGHT); //placement coords and dimensions(same)

	//Updates and draws all elements
	aquarium.update(deltaTime);
	aquarium.draw(ctx);

	//Could be expanded on
	ctx.drawImage(this.foreground, 0, 0, TANKWIDTH, TANKHEIGHT, //sprite coords and dimensions
		0, 0, TANKWIDTH, TANKHEIGHT); //placement coords and dimensions(same)

	//Recursion
	requestAnimationFrame(simulate);
}
//Simulate the tank
simulate();