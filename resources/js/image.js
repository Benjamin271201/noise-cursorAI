class DisplayImage {
  constructor(path, backgroundColor, particleColor, index) {
    this.path = path;
    this.backgroundColor = backgroundColor;
    this.particleColor = particleColor;
    this.index = index;
  }
}

let whiteHexColor = "#FFFFFF";
let orangeHexColor = "#F27126";
let blackHexColor = "#000000";
let imagePath = "resources/images";

// Set up an image gallery
var imageCollection = [
  new DisplayImage(imagePath + "/nologo.png", orangeHexColor, whiteHexColor, 0),
  new DisplayImage(imagePath + "/fptonlylogo.png", orangeHexColor, whiteHexColor, 1),
  new DisplayImage(imagePath + "/noise.png", blackHexColor, whiteHexColor, 2),
];