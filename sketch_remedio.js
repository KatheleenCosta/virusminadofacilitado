// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E


//const remedionaofunciona = document.querySelector('#remedionaofunciona');
//remedionaofunciona.style.display = 'none';

const phaseFourWin = document.querySelector('#phaseFourWin')
const contP4 = document.querySelector('#contP4')
const phaseFourLost = document.querySelector('#phaseFourLost')
const tryAgainP4 = document.querySelector('#tryAgainP4')

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
var contaAbertas = 0;
var metaParaGanhar; // armazena quantas células são necessárias para ganhar
var gameOverBlock = false; // estabelece uma variável para o final da fase

var totalBees = 5;

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

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;
      
      phaseFourLost.style.display = 'block';
      
      tryAgainP4.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload();
        phaseFourLost.style.display = 'none';
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

      phaseFourWin.style.display = 'block';
      
      contP4.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 6);
        window.location.reload();
        phaseFourWin.style.display = 'none';
    })

      //let buttonContinue3 = createButton('Continuar');

      //buttonContinue3.position(250, 300);
      //buttonContinue3.size(250, 30);
      //buttonContinue3.mousePressed(() => {
        //setup();
        //contaAbertas = 0;
        //gameOverBlock = false;
        //userLost = false;
        //window.localStorage.setItem('gamePhase', 6);
        //window.location.reload();
      
      //});
      
    } else {
        gameOverBlock = true;
        //text('VOCÊ PERDEU', 333, 550);



    }
  }
}