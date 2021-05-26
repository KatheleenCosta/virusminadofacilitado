// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

let userLost = false;
let userLostAGame = false;
//const UTIfunciona = document.querySelector('#UTIfunciona');
//const UTInaofunciona = document.querySelector('#UTInaofunciona');
//UTIfunciona.style.display = 'none';
//UTInaofunciona.style.display = 'none';

const phaseFiveWin = document.querySelector('#phaseFiveWin');
const phaseFiveInicio = document.querySelector('#phaseFiveInicio');
const entendi = document.querySelector('#entendi');
const contP5 = document.querySelector('#contP5');
const phaseFiveLost = document.querySelector('#phaseFiveLost');
const tryAgainP5 = document.querySelector('#tryAgainP5');
const avisoUTI = document.querySelector('#avisoUTI');
const closeBarUTI = document.querySelector('#closeBarUTI');
const avisoUTILotada = document.querySelector('#avisoUTILotada');
const closeBarUTILotada = document.querySelector('#closeBarUTILotada');

phaseFiveInicio.style.display = 'block';
entendi.addEventListener('click', () => {
//avisoUTILotada.style.display = 'none';
phaseFiveInicio.remove(); //problema de quando clica interfere no jogo
})


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

var totalBees = 5;


var counter = 0;
var timeLeft = 60;
var interval;


function convertSeconds(s){
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function setup() {
  createCanvas(701, 600);
  var canvasCols = 501;
  var canvasRows = 501;

  //setTimeout(textoP1,1000);
  //setTimeout(textoP2, 2000);
  
  var timer = select('#timer'); 
  timer.html (convertSeconds(timeLeft));
  
  function timeIt(){
    timer.html (convertSeconds(timeLeft));
    
    if (timeLeft > counter) {
    timeLeft --; 
      
    }  else {
        avisoUTILotada.style.display = 'block';
        closeBarUTILotada.addEventListener('click', () => {
        //avisoUTILotada.style.display = 'none';
        avisoUTILotada.remove(); //problema de quando clica interfere no jogo
      })
    }
  }
  
  interval = setInterval (timeIt, 1000);

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


function UTIsucesso() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // grid[i][j].revealed = true;
      UTIfunciona.style.display = 'block';
      clearInterval (interval);
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;
      //UTInaofunciona.style.display = 'block';

      phaseFiveLost.style.display = 'block';

      tryAgainP5.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload();
        phaseFiveLost.style.display = 'none';
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
          // while (timeLeft > counter) {
            //UTIUsado = 0;
              if (UTIUsado == 0 && !userLostAGame && timeLeft > 0) {
              show = 0;
              UTIUsado = 1;
            } else {
              show = 1;
            }
              if (show) {
              userLost = true;
              gameOverBlock = true;
              gameOver();
            } else {
              UTIsucesso();
            }
           //}
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
  //text (metaParaGanhar, 100,120);
  if (contaAbertas == metaParaGanhar) {
    if (!userLost) {
      gameOverBlock = true;
      //text('VOCÊ GANHOU', 333, 550);
      clearInterval(interval);


      phaseFiveWin.style.display = 'block';

      contP5.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 7);
        window.location.reload();
        phaseFiveWin.style.display = 'none';
    })


    } else {
      gameOverBlock = true;
      //text('VOCÊ PERDEU', 333, 550);
      clearInterval(interval);
    }
  }
}
