let cursorImg;
function preload() {
  cursorImg = loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mouse.png');
}

class Mouse {
  constructor () {
    this.mouseX = 0;
    this.mouseY = 0;
    this.randomX = Math.random() * 300;
    this.randomY = Math.random() * 300;
    this.speed = Math.random() * 0.00015 + 0.00001;
    this.width = 15;
    this.height = this.width * (cursorImg.height / cursorImg.width);
  }
  
  update () {
    this.mouseX = ((perlin.simplex3(this.randomX, 0, millis() * this.speed) + 1) / 2) * width;
    this.mouseY = ((perlin.simplex3(this.randomY, 0, millis() * this.speed) + 1) / 2) *  height;
  }
  
  draw () {
    image(cursorImg, this.mouseX, this.mouseY, this.width, this.height);
  }

  position () {
    console.log(this.mouseX, this.mouseY);
  }
}


function draw() {
  clear();
  var mouse = new Mouse();
    mouse.update();
    mouse.draw();
}
