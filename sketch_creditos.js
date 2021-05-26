//window.localStorage.setItem('gamePhase', 9);

let bubbles = [];

let coronaBolha;

let font;
let lines;
let txt;

var y;

function preload() {
  coronaBolha = loadImage('corona-bolha.png');
  lines = loadStrings('creditos.txt');
  font = loadFont('GloberSemiBold.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(50, 160);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
  
    txt = join(lines, '\n');
  x = windowWidth / 2;
  y = height;

}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    image(coronaBolha, this.x, this.y, this.r, this.r);
  }
}


function draw() {
    background('#228C30');
  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    } else {
      bubbles[i].changeColor(0);
    }
    bubbles[i].move();
    bubbles[i].show();
  }
  // No translate(): WEBGL mode starts with the origin in the center.

  fill(255);
  textFont(font);
  textSize(60);
  textAlign(CENTER);
  //rotateX(PI / 4);
  let w = width * 0.6;
  text(txt, (windowWidth / 2) - (w / 2), y, w, height * 10);
  
  y -= 2;

 if (y < -200){
 y = windowHeight + 150;
 }
 

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
