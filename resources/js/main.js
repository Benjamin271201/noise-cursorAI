/*
Interactive logos

jasonlabbe3d.com
twitter.com/russetPotato
*/

const SPIN_MULTIPLIER = 45;
const MIN_PARTICLE_COUNT = 1900;
const MAX_PARTICLE_COUNT = 2000;
const MIN_PARTICLE_SIZE = 5;
const MAX_PARTICLE_SIZE = 20;
const MIN_FORCE = 0.75;
const MAX_FORCE = 0.95;
const REPULSION_RADIUS = 125;
const REPULSION_STRENGTH = 0.325;
const IMG_RESIZED_WIDTH = 1600;
const IMG_SCAN_STEPS = 2;
const NUM_OF_MOUSES = 1;

const DrawTypes = {
	Rect: 0,
	Ellipse: 1,
	Triangle: 2,
};

const mouses = [];
let mouse = "";
var imgNames = ["resources/images/noise.png", "resources/images/fptlogo.png", "resources/images/fptsqux.png"];
var particles = [];
var indices = [];
var imgIndex = 0;
var drawType = 0;
var particleCount = 1900;
var maxSize = 0;
var img;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	loadImg(imgNames[0]);
	mouse = new Mouse();
}

function draw() {	
	
	background(255);
	
	fill(0);
	noStroke();
	
	if (img == null) {
		return;
	}
	
	push();
	translate(width / 2 - img.width / 2, height / 2 - img.height / 2);
	
	fill(0);
	noStroke();
	
	rectMode(CENTER);

	mouse.draw();
	
	particles.forEach(particle => {
		particle.move();
		
		push();
		translate(particle.pos.x, particle.pos.y);
		
		let spin = particle.vel.mag() * SPIN_MULTIPLIER;
		rotate(radians(particle.mapped_angle + spin));
		
		fill(particle.color);
		
		switch(drawType) {
			case DrawTypes.Ellipse:
				ellipse(0, 0, particle.size, particle.size);
				break;
			case DrawTypes.Rect:
				rect(0, 0, particle.size, particle.size);
				break;
			case DrawTypes.Triangle:
				triangle(
					particle.size * -0.5, particle.size * -0.5, 
					0, particle.size, 
					particle.size * 0.5, particle.size * -0.5);
				break;
		}
		
		pop();
	});
	
	rectMode(CORNER);
	pop();
}

function keyPressed() {
	if (key == "q") {
		loadNextImg();	
	}
	if (key == ' ') {
		nextDrawType();
	}
}
