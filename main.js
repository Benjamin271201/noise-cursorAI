/*
Interactive logos

jasonlabbe3d.com
twitter.com/russetPotato
*/

const SPIN_MULTIPLIER = 30;
const MIN_PARTICLE_COUNT = 800;
const MAX_PARTICLE_COUNT = 1000;
const MIN_PARTICLE_SIZE = 25;
const MAX_PARTICLE_SIZE = 50;
const MIN_FORCE = 0.4;
const MAX_FORCE = 0.6;
const REPULSION_RADIUS = 75;
const REPULSION_STRENGTH = 0.25;
const IMG_RESIZED_WIDTH = 750;
const IMG_SCAN_STEPS = 2;
const NUM_OF_MOUSES = 10;

const DrawTypes = {
	Rect: 0,
	Ellipse: 1,
	Triangle: 2,
	Arc: 3,
	Quad: 4
};

const mouses = [];
var imgNames = ["noise.png"];
var particles = [];
var indices = [];
var imgIndex = 0;
var drawType = 0;
var particleCount = 1000;
var maxSize = 0;
var img;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	loadImg(imgNames[0]);
	for (let i = 0; i < NUM_OF_MOUSES; i++) {
		mouses.push(new Mouse());
	  }
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
	mouses.forEach(mouse => {
		mouse.update();
		mouse.draw();
		mouse.position();
	})
	
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
			case DrawTypes.Arc:
				arc(0, 0, particle.size * 2, particle.size * 2, PI, TWO_PI);
				break;
			case DrawTypes.Quad:
				quad(particle.size * -1, 0, 
					0, particle.size, 
					particle.size, 0,
					0, particle.size * -1);
				break;
		}
		
		pop();
	});
	
	rectMode(CORNER);
	
	if (mouseIsPressed && mouseButton == RIGHT) {
		image(img, 0, 0);
	}
	
	pop();
}

function keyPressed() {
	if (key == "m") {
	
	}
	if (key == '+') {
		particleCount = min(particleCount + 500, MAX_PARTICLE_COUNT);
		spawnParticles();
	}
	
	if (key == '-') {
		particleCount = max(particleCount - 500, MIN_PARTICLE_COUNT);
		spawnParticles();
	}
	
	if (key == ' ') {
		nextDrawType();
	}
}
