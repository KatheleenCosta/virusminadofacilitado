// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

let userLost = false;
let userLostAGame = false;
//const maskfunciona = document.querySelector('#maskfunciona');
//const masknaofunciona = document.querySelector('#masknaofunciona');
//maskfunciona.style.display = 'none';
//masknaofunciona.style.display = 'none';
const phaseThreeWin = document.querySelector('#phaseThreeWin');
const contP3 = document.querySelector('#contP3');
const avisoMascara = document.querySelector('#avisoMascara');
const closeBarMascara = document.querySelector('#closeBarMascara');
const phaseThreeLost = document.querySelector('#phaseThreeLost');
const phaseThreeLostOption2 = document.querySelector('#phaseThreeLostOption2');
const tryAgainP3 = document.querySelector('#tryAgainP3');
const tryAgainP3option2 = document.querySelector('#tryAgainP3option2');

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
var maskUsado = 0;
var mascaraja = false;
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

function masksucesso() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // grid[i][j].revealed = true;
      //maskfunciona.style.display = 'block';

        avisoMascara.style.display = 'block';
        mascaraja = true;

        closeBarMascara.addEventListener('click', () => {
          avisoMascara.style.display = 'none'; 
          //probleminha, quando clicamos pra fechar a barra clica num quadradinho do campo
      })
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;
      //masknaofunciona.style.display = 'block';

     if (mascaraja) {
      phaseThreeLostOption2.style.display = 'block';
      tryAgainP3option2.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload(); 
        //phaseThreeLostOption2.style.display = 'none';
    })
      } else{
      phaseThreeLost.style.display = 'block';
      tryAgainP3.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload(); 
        //phaseThreeLost.style.display = 'none';
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
            if (maskUsado == 0 && !userLostAGame) {
              show = random(1) > 0.8;
              maskUsado = 1;
            } else {
              show = 1;
            }

            if (show) {
              userLost = true;
              gameOverBlock = true;
              gameOver();
            } else {
              masksucesso();
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
      //text('VOCÊ GANHOU', 333, 550);

      phaseThreeWin.style.display = 'block';

      contP3.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 6);
        window.location.reload();
        phaseThreeWin.style.display = 'none';
    })


      //let buttonContinue2 = createButton('Continuar');

      //buttonContinue2.position(250, 300);
      //buttonContinue2.size(250, 30);
      //buttonContinue2.mousePressed(() => {
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