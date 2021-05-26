// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

let coronaimagem;

function preload() {
  coronaimagem = loadImage('corona.png');
}

function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w + 100; //alterem esses números somados para mudar o grid de posição
  this.y = j * w + 30; //alterem esses números somados para mudar o grid de posição
  this.w = w;
  this.neighborCount = 0;

  this.bee = false;
  this.revealed = false;
}

Cell.prototype.show = function () {
  stroke(60);
  fill(124);
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      coronaimagem.resize(38, 38);
      image(coronaimagem, this.x + 1, this.y + 1);
      //fill('red');
      //ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0 && this.neighborCount < 2) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('green');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      } else if (this.neighborCount > 1 && this.neighborCount < 3) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('blue');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      } else if (this.neighborCount > 2 && this.neighborCount < 4) {

        if (phase == 7) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('blue');
        text(2, this.x + this.w * 0.5, this.y + this.w - 6);

        } else {
          textAlign(CENTER);
          textSize(27);
          textStyle(BOLD);
          noStroke();
          fill('red');
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
          
        }
      } else if (this.neighborCount > 3 && this.neighborCount < 5) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('yellow');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      } else if (this.neighborCount > 4 && this.neighborCount < 6) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('black');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      } else if (this.neighborCount > 5 && this.neighborCount < 7) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('purple');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      } else if (this.neighborCount > 6 && this.neighborCount < 8) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('orange');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      } else if (this.neighborCount > 7 && this.neighborCount < 9) {
        textAlign(CENTER);
        textSize(27);
        textStyle(BOLD);
        noStroke();
        fill('turquoise');
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
};

Cell.prototype.countBees = function () {
  if (this.bee) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (neighbor.bee) {
        total++;
      }
    }
  }
  this.neighborCount = total;
};

Cell.prototype.contains = function (x, y) {
  return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
};

Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.neighborCount == 0) {
    // flood fill time
    this.floodFill();
  }
};

Cell.prototype.floodFill = function () {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      // Note the neighbor.bee check was not required.
      // See issue #184
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
};
