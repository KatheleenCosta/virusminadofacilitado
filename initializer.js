let firstScript = document.createElement('script');
let secondScript = document.createElement('script');
let thirdScript = document.createElement('script');
let fourthScript = document.createElement('script');
let fifthScript = document.createElement('script');
let sixthScript = document.createElement('script');
let seventhPhase = document.createElement ('script');
let eighthScript = document.createElement('script');
let ninthScript = document.createElement('script');

let phase = window.localStorage.getItem('gamePhase');

window.localStorage.setItem('gamePhase', 1);

//menu
function startFirstPhase() {
  firstScript.src = 'menu.js';

  document.head.insertAdjacentElement('afterbegin', firstScript);
}

//inicio
function startSecondPhase() {
  let secondScript = document.createElement('script');
  secondScript.src = 'sketch_inicio.js';

  document.head.insertAdjacentElement('afterbegin', secondScript);
}

//alcool
function startThirdPhase() {
  let thirdScript = document.createElement('script');
  thirdScript.src = 'sketch_alcool.js';

document.head.insertAdjacentElement('afterbegin', thirdScript);
}

//mascara
function startFourthPhase() {
  let fourthScript = document.createElement('script');
  fourthScript.src = 'sketch_mascara.js';

document.head.insertAdjacentElement('afterbegin', fourthScript);
}

//remedio
function startFifthPhase() {
  let fifthScript = document.createElement('script');
  fifthScript.src = 'sketch_remedio.js';

document.head.insertAdjacentElement('afterbegin', fifthScript);
}

//uti
function startSixthPhase() {
  let sixthScript = document.createElement('script');
  sixthScript.src = 'sketch_uti.js';

document.head.insertAdjacentElement('afterbegin', sixthScript);
}

//fake news
function startSeventhPhase() {
  let seventhScript = document.createElement('script');
  seventhScript.src = 'sketch_fakenews.js';

document.head.insertAdjacentElement('afterbegin', seventhScript);
}

//fake news parte 2
function startEighthPhase() {
  let eighthScript = document.createElement('script');
  eighthScript.src = 'sketch_final.js';

document.head.insertAdjacentElement('afterbegin', eighthScript);
}

//tela final
function startNinthPhase() {
  let ninthScript = document.createElement('script');
  ninthScript.src = 'sketch_creditos.js';

document.head.insertAdjacentElement('afterbegin', ninthScript);
}

(() => {
  console.log(phase);

  if (phase == 1) {
  startFirstPhase();
  } else if (phase == 2) {
  startSecondPhase();
  } else if (phase == 3) {
  startThirdPhase();
  } else if (phase == 4) {
  startFourthPhase();  
  } else if (phase == 5) {
  startFifthPhase();
  } else if (phase == 6) {
  startSixthPhase();  
  } else if (phase == 7) {
  startSeventhPhase();
  } else if (phase ==8){
  startEighthPhase();
  } else {
  startNinthPhase();  
  }

  //} else if (phase === 3) {
  //   startThirdPhase();
  // } else {

  // }

 // if (phase != 2) {
 //   startFirstPhase();
 // } else {
 //   startSecondPhase();
 // }
})();
