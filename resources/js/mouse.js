let cursorImg;

function preload() {
  cursorImg = loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mouse.png');
}

class Mouse {
  constructor () {
    this.mouseX = 0;
    this.mouseY = 0;
    this.width = 15;
    this.height = this.width * (cursorImg.height / cursorImg.width);
  }
  
  update () {
    if (typeof landmarks == "undefined") {
      this.mouseX = 0;
      this.mouseY = 0;
    } else {
      this.mouseX = ((perlin.simplex3(landmarks[10].x) + 1) / 2) * width;
      this.mouseY = ((perlin.simplex3(landmarks[10].y) + 1) / 2) *  height;
    }
  }
  
  draw () {
    image(cursorImg, this.mouseX, this.mouseY, this.width, this.height);
  }

  updatePosition(x, y) {
    const speedRatio = 1.2;
    const widthOffset = width/4;
    // this.mouseX = ((perlin.simplex3(x) + 100) / 2) * width;
    // this.mouseY = ((perlin.simplex3(y) + 100) / 2) *  height;
    this.mouseX = width - (x * speedRatio * width) - widthOffset;
    this.mouseY = y * height;
  }

  position() {
    console.log(this.mouseX, this.mouseY)
  }
}

