// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

let userLost = false;
let userLostAGame = false;
//const alcoolfunciona = document.querySelector('#alcoolfunciona');
//const alcoolnaofunciona = document.querySelector('#alcoolnaofunciona');
//alcoolfunciona.style.display = 'none';
//alcoolnaofunciona.style.display = 'none';

const phaseTwoWin = document.querySelector('#phaseTwoWin');
const phaseTwoLost = document.querySelector('#phaseTwoLost')
const phaseTwoLostOption2 = document.querySelector ('#phaseTwoLostOption2')
const avisoAlcool = document.querySelector('#avisoAlcool');
const closeBar = document.querySelector('#closeBar');
const contP2 = document.querySelector('#contP2');
const tryAgainP2 = document.querySelector('#tryAgainP2');
const tryAgainP2option2 = document.querySelector('#tryAgainP2option2');




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
var alcoolUsado = 0;
var alcoolja = false;
var contaAbertas = 0;
var metaParaGanhar; // armazena quantas células são necessárias para ganhar
var gameOverBlock = false; // estabelece uma variável para o final da fase
var canvas;

var totalBees = 5;


function setup() {
  canvas = createCanvas(700, 600);
  //canvas.style('z-index', '-1');

  cols = floor(501 / w);
  rows = floor(501 / w);
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

function alcoolsucesso() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // grid[i][j].revealed = true;
      //alcoolfunciona.style.display = 'block';

      avisoAlcool.style.display = 'block';
      alcoolja = true;

      closeBar.addEventListener('click', () => {
        avisoAlcool.style.display = 'none'; 
    })

      



    }
  }


}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;
      //alcoolnaofunciona.style.display = 'block';

      if (alcoolja) {
      phaseTwoLostOption2.style.display = 'block';
      tryAgainP2option2.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload(); 
        //phaseOneLostE2.style.display = 'none';
      })
      } else {
      phaseTwoLost.style.display = 'block';
      tryAgainP2.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload(); 
        //phaseOneLostE2.style.display = 'none';
      })
      }

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
            if (alcoolUsado == 0 && !userLostAGame) {
              show = random(1) > 0.5;
              alcoolUsado = 1;
            } else {
              show = 1;
            }

            if (show) {
              userLost = true;
              gameOverBlock = true;
              gameOver();
            } else {
              alcoolsucesso();
            }
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

      phaseTwoWin.style.display = 'block';

      contP2.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 6);
        window.location.reload();
        phaseTwoWin.style.display = 'none';
    })



    } else {
      gameOverBlock = true;
      //text('VOCÊ PERDEU', 333, 550);
    }
  }
}
