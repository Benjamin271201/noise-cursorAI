/*
Interactive logos

jasonlabbe3d.com
twitter.com/russetPotato
*/

const SPIN_MULTIPLIER = 45;
const MIN_PARTICLE_COUNT = 1500;
const MAX_PARTICLE_COUNT = 1499;
const MIN_PARTICLE_SIZE = 2;
const MAX_PARTICLE_SIZE = 10;
const MIN_FORCE = 0.75;
const MAX_FORCE = 0.95;
const REPULSION_RADIUS = 125;
const REPULSION_STRENGTH = 0.325;
const IMG_RESIZED_WIDTH = 500;
const IMG_SCAN_STEPS = 2;
const NUM_OF_MOUSES = 1;

const DrawTypes = {
  Rect: 0,
  Ellipse: 1,
  Triangle: 2,
  Plus: 3,
};

const mouses = [];
const particlesArray = [];
let mouse = "";
var particles = [];
var indices = [];
var imgIndex = 0;
var drawType = 0;
var particleCount = 1500;
var maxSize = 0;
var img;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  preloadBatchImages();
  mouse = new Mouse();
}

function draw() {
  background("#000000");

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

  particles.forEach((particle) => {
    particle.move();

    push();
    translate(particle.pos.x, particle.pos.y);

    let spin = particle.vel.mag() * SPIN_MULTIPLIER;
    rotate(radians(particle.mapped_angle + spin));

    fill(particle.color);

    switch (drawType) {
      case DrawTypes.Ellipse:
        ellipse(0, 0, particle.size, particle.size);
        break;
      case DrawTypes.Rect:
        rect(0, 0, particle.size, particle.size);
        break;
      case DrawTypes.Triangle:
        triangle(
          particle.size * -0.5,
          particle.size * -0.5,
          0,
          particle.size,
          particle.size * 0.5,
          particle.size * -0.5
        );
        break;
      case DrawTypes.Plus: //Rect will now make plus signs
        rect(0, 0, particle.size * 0.25, particle.size);
        rect(0, 0, particle.size, particle.size * 0.25);
        break;

        /////////////////this next section is taken from https://openprocessing.org/sketch/1695925 and then modified to avoid freezing.
        let p = [];
        f = frameCount;
        for (y = 100; y < 200; y += 20) {
          //I lowered the number of loops to prevent extreme lag
          beginShape();
          for (x = 0; x < 36; x += 6) {
            //I lowered the number of loops here as well. the result of this is a cool particle field effect around the arrows
            dy =
              (80 / (1 + pow(x - 150, 4) / 8e6)) * noise(x / 30 + f / 50 + y);
            p.push({ x, y: y - dy });
            vertex(x, y - dy);
          }
          endShape();
        } /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    pop();
  });

  rectMode(CORNER);
  pop();
}

function keyPressed() {
  if (key == "f") {
    loadNextImg();
  }
  if (key == " ") {
    nextDrawType();
  }
}
