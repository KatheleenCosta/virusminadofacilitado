// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

const phaseSixWin = document.querySelector('#phaseSixWin');
const contP6 = document.querySelector('#contP6');
const phaseSixLost = document.querySelector('#phaseSixLost')
const tryAgainP6 = document.querySelector('#tryAgainP6')
const fakeNews1 = document.querySelector('#fakeNews1')
const fakeNews2 = document.querySelector('#fakeNews2')

fakeNews1.style.display = 'block';
fakeNews2.style.display = 'block';

let userLost = false;
let userLostAGame = false;

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 40;
var show;
var UTIUsado = 0;
var contaAbertas = 0;
var metaParaGanhar; // armazena quantas células são necessárias para ganhar
var gameOverBlock = false; // estabelece uma variável para o final da fase

var totalBees = 30;



function setup() {
  createCanvas(701, 600);
  var canvasCols = 501;
  var canvasRows = 501;

  cols = floor(canvasCols / w);
  rows = floor(canvasRows / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  metaParaGanhar = cols * rows - totalBees; //calcula total de células é necessário abrir para ganhar

  // Pick totalBees spots
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}

function clearCanvas(){
   for (var i = 0; i < cols; i++) {
   for (var j = 0; j < rows; j++) {
     grid.splice([i], [j]);
      //remove();
      //noCanvas();
      
  }
 }
} 

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;

      phaseSixLost.style.display = 'block'

      tryAgainP6.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 8);
        window.location.reload();
        phaseSixLost.style.display = 'none';
    })
      

    }
  }
}

function mousePressed() {
  if (gameOverBlock == false) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();

          if (grid[i][j].bee) {
              userLost = true;
              gameOverBlock = true;
              gameOver();
            }
          }
        }
      }
    }
}

function draw() {
  contaAbertas = 0;
  //background(10, 143, 40)
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
      if (grid[i][j].revealed && grid[i][j].bee == false) contaAbertas++; // na contagem, adcionei uma condição para ele contar somente células reveladas que noã soã bees
    }
  }
  //text (contaAbertas, 100,100);
  // text (metaParaGanhar, 100,120);
  if (contaAbertas == metaParaGanhar) {
    if (!userLost) {
      gameOverBlock = true;
      //text('VOCÊ GANHOU', 333, 550);

      phaseSixWin.style.display = 'block';

      contP6.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 9);
        window.location.reload();
        phaseSixWin.style.display = 'none';
    })

    } else {
      gameOverBlock = true;
      //text('VOCÊ PERDEU', 333, 550);
    }
  }
}
