window.localStorage.setItem('gamePhase', 1);
const telaTres = document.querySelector('#telaTres');
const backTelaUm = document.querySelector('#backTelaUm');
const telaUm = document.querySelector('#telaUm');
const play = document.querySelector('#play');
const abt = document.querySelector('#abt');
const telaDois = document.querySelector('#telaDois');
const comecar = document.querySelector('#comecar');

var tela = 1;
var largura = 300;
var altura = 50;
var xMenu = 700/2;
var yMenu1 = 185;
var yMenu2 = 245;
var yMenu3 = 305

//let img;
let fonte;

let bubbles = [];
let coronaBolha;

function preload(){
  //img = loadImage('telaverde.png');  
  fonte = loadFont('GloberSemiBold.otf');
  coronaBolha = loadImage('corona-bolha.png');
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
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

function draw() {
  
  if (tela == 1){
    
   tela1();

  }

  else if (tela == 2) {

   tela2();

  }
 
  //Informações
  else if(tela == 3){
    tela3();
  
}



function tela1()  {
  telaTres.style.display = 'none'
  telaDois.style.display = 'none'
  backTelaUm.style.display = 'none'
  //background(14,143,40);
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

  //titulo
  textAlign(CENTER);
  textFont(fonte);
  textSize(60);
  fill(255);
  noStroke();

  text( "Virus Minado", windowWidth/2, windowHeight/5);

  telaUm.style.display = 'block'
  play.style.display = 'block'
  
  play.addEventListener('click', () => {
    tela = 2;
})

  abt.style.display = 'block'
  abt.addEventListener('click', () => {
    tela = 3;
  })
 
  
  }

//tela de aviso

 

function tela2() {
  telaTres.style.display = 'none'
  backTelaUm.style.display = 'none'
  telaUm.style.display = 'none'
  abt.style.display = 'none'
  //background(10, 143, 40);
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


 

  telaDois.style.display = 'block'
  comecar.style.display = 'block'
  
  comecar.addEventListener('click', () => {
    window.localStorage.setItem('gamePhase', 2);
    window.location.reload();
})


  
}

function tela3(){
  telaTres.style.display = 'none'
  backTelaUm.style.display = 'none'
  telaUm.style.display = 'none'
  abt.style.display = 'none'
  telaDois.style.display = 'none'
  comecar.style.display = 'none'
  //background(10, 143, 40);
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

  telaTres.style.display = 'block'
  backTelaUm.style.display = 'block'
  
  backTelaUm.addEventListener('click', () => {
    tela = 1;
})
  


  
  
}
}

//configuração fundo bolhas

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}