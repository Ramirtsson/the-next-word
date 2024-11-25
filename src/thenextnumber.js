let gameBoardElem;
var arrayActual = [];
let statusgame;
let marcador = 0
var gameBoard = [];
var numbers1 = [];
var level = 2;
var vidas = 3
var tiempo = 60;
let reloj;
let finalBoss;
let comprobarPoder;
let tiempoDragon;
var dragonLife = 0
var typeGame;
let poder_dragon = 0
let dragonVidaFinal = 100
let fin = false
// let cuadrooo
////oruebas


let clas
let classs
let classs2
//poderes

//tiempo congelado
var congelado = false

//una sola vida
var onelife = false
//score se multiplica
var xpuntaje = false

//revienta numero sin importar escudo etc
var all = false

//vida infinita
var lifeInfinite = false



const makeGameBoardElem = (nivel) => {
    gameBoardElem = document.createElement("div");
    gameBoardElem.classList.add("game-board");
    gameBoardElem.style.gridTemplateColumns = "repeat("+nivel+",1fr)";
    gameBoardElem.style.maxWidth = "400px";
    gameBoardElem.style.minHeight = "400px";
    gameBoardElem.style.gap = "1rem"
    return gameBoardElem;
  };

const makeSquareElem = (squareNumber) => {
  
    const squareElement = document.createElement("div");
    const imgsquareElement = document.createElement("div");
    const textsquareElement = document.createElement("h1");
    imgsquareElement.classList.add(`game-square`);
    imgsquareElement.classList.add(`wiggle`);
    if( level<21 && ( level % 5 ) == 0){
      
      document.getElementById("botonCambio").style.display = "none"
      pauseSound("FarOut")
      playSound("arthas")
      if(level <10){
        document.getElementById("dialogos2").style.display = "";
      }
      if(level>=20){
        // document.getElementById("dialogos5").style.display = "";
      }
      document.getElementById("vidavida").style.display = "";
      document.getElementById("tittle").style.display = "none";
      typeGame =1
      document.getElementById("fondoBack").style.background = "radial-gradient(100% 100%, rgb(59, 1, 1), rgb(55, 0, 0) 25%, transparent 25%), radial-gradient(50% 50%, rgb(171, 26, 37), rgb(171, 26, 37) 25%, rgb(38 3 3) 25%)"
      playSound("dragon")
      dragonLife = 4
      imgsquareElement.classList.remove(`game-square`);
      imgsquareElement.classList.remove(`wiggle`);
      imgsquareElement.classList.add(`game-dragon`);
      imgsquareElement.classList.add(`dragon`);
      stopReloj()
    }else if(level>=30 && ( level % 5 ) == 0){
      //niveles para un futuro
    }else{
      document.getElementById("vidavida").style.display = "none";
      document.getElementById("tittle").style.display = "";
      typeGame = 0
      document.getElementById("fondoBack").style.background = "radial-gradient(ellipse  100% 100% , #013440, #013440 25%, transparent 25%),radial-gradient(ellipse  50% 50% , #AB1A25, #AB1A25 25%, #002635 25%)"
      imgsquareElement.classList.remove(`game-dragon`);
      imgsquareElement.classList.remove(`dragon`);
      textsquareElement.classList.add(`numero_cuadro`);
      if(level >5 && level<10){
      document.getElementById("botonCambio").style.display = "none"

        let randNum = Math.floor(Math.random() * 2);
        if(randNum == 1){
          imgsquareElement.classList.add(`bubble`);
          imgsquareElement.classList.add(`ball`);
        }
  
      }else if(level >10  && level<20){
      document.getElementById("botonCambio").style.display = ""

        let randNum = Math.floor(Math.random() * 2);
        if(randNum == 1){
          imgsquareElement.classList.add(`diamond2`);
        }else{
          imgsquareElement.classList.add(`diamond2fake`);
        }
      }
      textsquareElement.style.zIndex = "3";
      textsquareElement.style.position = "absolute";
      textsquareElement.style.margin = "30%";
      textsquareElement.style.fontSize = "7vw";
      var text = document.createTextNode(squareNumber + 1 +marcador);
      textsquareElement.appendChild(text);
    
      squareElement.appendChild(textsquareElement);

    }

    imgsquareElement.classList.add(squareNumber + 1);
    imgsquareElement.id = `game-square-` + (squareNumber + 1);
    squareElement.style.color = "#000000";
    squareElement.style.fontWeight = "800";
    squareElement.style.fontSize = "5rem";
  
    squareElement.style.justifyContent = "center";
    squareElement.style.alignItems = "center";
    squareElement.style.position="relative";
    squareElement.style.display="flex";
  
    imgsquareElement.style.backgroundRepeat = "no-repeat";
    imgsquareElement.style.objectFit = "cover";
    imgsquareElement.style.zIndex = "2";
    imgsquareElement.style.position = "absolute";
    squareElement.appendChild(imgsquareElement);

  
    squareElement.addEventListener(
      "click",
      (event) => {
        if(( level % 5 ) == 0){
           
          if(!squareElement.classList.contains("dragooon") && !squareElement.classList.contains("nospace")){
              if(squareElement.classList.value != ""){
                document.getElementById("contenedor_vidas").classList.remove("animationZoom");
                document.getElementById("contenedor_vidas").classList.add("animationZoom");
                document.getElementById("contenedor_vidas").style.color = "#EC2911"
                setTimeout(() => {
                  document.getElementById("contenedor_vidas").classList.remove("animationZoom");
                  document.getElementById("contenedor_vidas").style.color = "#fff"
                }, 300);
                playSound("glass")
                document.getElementById("animaciones").classList = "firePosion"
                document.getElementById("animaciones").style.display = ""
                setTimeout(() => {
                  document.getElementById("animaciones").style.display = "none"
                  
                }, 1600);
                squareElement.classList.remove("posion")
                vidas--
                document.getElementById("no_vidas").innerHTML = vidas;
                if(vidas <= 0 ){
                  stopRelojBoss()
                  endGame()
                }
              }
          }else{
            if(!squareElement.classList.contains("nospace")){
              squareElement.classList.remove("dragooon")
              // playSound("ok")
              playSound("dragon")
              // document.getElementById("animaciones").style.backgroundImage = "url(/fifire.gif)"
              document.getElementById("animaciones").classList = "fireDragon"
              dragonLife--
              document.getElementById("animaciones").style.display = ""
              setTimeout(() => {
                document.getElementById("animaciones").style.display = "none"
                
              }, 1600);
              let unaVida = (1083 / 4)
              let calculo = (-Math.abs(dragonLife) + 4)
              // console.log(unaVida - (unaVida*calculo))
              document.getElementById("cls-4").style.width = ( 1083 - (unaVida*calculo))
              if(dragonLife <= 0 ){
                document.getElementById("cls-4").style.width = 1083 
                level++
                stopRelojBoss()
                playSound("dragon")
                pauseSound("arthas")
                playSound("FarOut")
                resetGame()
                // if(level == 6){
                  if(level<10){
                    document.getElementById("dialogos3").style.display = "";
                  }else{
                    document.getElementById("dialogos4").style.display = "";
                  }
                // }
                // else{
                //   playSound("dragon")
                //   inicioTiempo()
                // }
                // inicioTiempo()
              }
            }else{
              console.log("moviendoDragon")
              let cuadroDragon =document.getElementsByClassName("game-board")
              for(let i = 0; i<cuadroDragon[0].children.length; i++){
                if(i>5){
                  cuadroDragon[0].children[i].children[0].classList = "stone_final"
                }
              }
              squareElement.children[0].classList = "stone_final_dragon"
            }
            // comPoder();
          }
        }else{
          if (parseInt(secuencia_follow) == parseInt(squareNumber)) {
              let diamond = false
              let cuadrooo = squareElement.childNodes[1].classList
              cuadrooo = Array.prototype.slice.call(cuadrooo)
              for(let i= 0; i<cuadrooo.length; i++){
                  if(cuadrooo[i] == "diamond2fake"){
                    diamond = true
                    break;
                  }
              }

            if (!squareElement.classList.contains("tocado") && !diamond) {
              squareElement.childNodes[1].classList.remove("diamond2")
              diamond = false
              explode(event.pageX, event.pageY);
              console.log("entra primins");
              document.getElementById("tittle").classList.remove("animationZoom");
              document.getElementById("tittle").classList.add("animationZoom");
              document.getElementById("tittle").style.color = "#f9d862"
              setTimeout(() => {
                document.getElementById("tittle").classList.remove("animationZoom");
                document.getElementById("tittle").style.color = "#fff"
              }, 300);
              
              if(!imgsquareElement.classList.contains("ball")){
                imgsquareElement.style.background = "#7C6F5B"
                playSound("ok")
                squareElement.classList.add("tocado");
                secuencia_follow++;
                marcador++
                gameBoard[squareNumber] = squareNumber + 1;
              }else{
                imgsquareElement.classList.remove(`bubble`);
                imgsquareElement.classList.remove(`ball`);
                playSound("bubble")
  
  
              }
              
              document.getElementById("resultado").innerHTML = (marcador+1);
              document.getElementById("resultado2").innerHTML = (marcador);
              document.getElementById("resultado3").innerHTML = (marcador);
  
            }else{
              playSound("error")
            }
          } else { 
            if (!squareElement.classList.contains("tocado") && level>2) {
              // diamond = false
              document.getElementById("contenedor_vidas").classList.remove("animationZoom");
              document.getElementById("contenedor_vidas").classList.add("animationZoom");
              document.getElementById("contenedor_vidas").style.color = "#EC2911"
              setTimeout(() => {
                document.getElementById("contenedor_vidas").classList.remove("animationZoom");
                document.getElementById("contenedor_vidas").style.color = "#fff"
              }, 300);
              
              playSound("wrong")
              vidas--
              document.getElementById("no_vidas").innerHTML = vidas;
              if(vidas <= 0 ){
                playSound("wrong")
                endGame()
              }
            }else{
              playSound("error")
              
            }
            
          }
          comprobarLevel()
        }
        
      },






      { once: false }
    );
  
    return squareElement;
  };

  const resetGame = () => {
    tiempo = tiempo + 2

    if(level ==3){
      inicioTiempo()
    }else if(level == 21){
      document.getElementById("container_menu").style.display = "none";
      document.getElementById("fondoBackPrincipal").style.display = "none";
      document.getElementById("container_pause").style.display = "none";
      document.getElementById("fondoPause").style.display = "none";
      document.getElementById("container_final_ganador").style.display = "";
      document.getElementById("fondoFinalGanador").style.display = "";
      document.getElementById("container_final").style.display = "none";
      document.getElementById("fondoFinal").style.display = "none";
      document.getElementById("container").style.display = "none";
      document.getElementById("fondoBack").style.display = "none";
      document.getElementById("puntajes").style.display = "none";
      playSound("dragonFinal")
      return;
    }

    secuencia_follow = 0;
    $(".game-board").show();
    $(".game-board").remove();
  
    
    if (statusgame == "perdio") {
    } else if (statusgame == "next" && level == 1) {

    } else if (statusgame == "next" && level == 2) {

    } else if (statusgame == "next" && level == 3) {
    }else if (statusgame == "next" && level == 4) {
    }

    // else if (level == 5) {
    //   level++
    // }
    crearTableroNumeros(level)  
    for (let square = 0; square < arrayActual.length; square++) {
      let numeroQuitar = getRandomInt(arraytemporal.length);
      gameBoardElem.appendChild(makeSquareElem(arraytemporal[numeroQuitar] - 1));
      arraytemporal = arraytemporal.filter(
        (numero) => numero != arraytemporal[numeroQuitar]
      );
    }


    $("#elbuenobueno").html(gameBoardElem);

    // if(( level % 5 ) == 0){
    //   bossDragon()
    //   console.log("acaaaaaaaa")
    //   inicioTiempoBoss()
    // }
    if(level< 20 && ( level % 5 ) == 0){
      bossDragon()
      console.log("acaaaaaaaa")
      inicioTiempoBoss()
    }
    else if(level>= 20 && ( level % 5 ) == 0){

      // finalBossDragon()
      document.getElementById("dialogos5").style.display = ""
      console.log("acaaaaaaaaHHHH")
      // inicioTiempoBoss()
    }
  };



//Particulas
function explode(x, y, circulo) {
    console.log(x);
    console.log(y);
    var particles = 20,
      // explosion container and its reference to be able to delete it on animation end
      explosion = $(
        '<div class="explosion" style="position:absolute; z-index:1000;"></div>'
      );
  
    // put the explosion container into the body to be able to get it's size
    $(`#elbuenobueno`).append(explosion);
  
    // position the container to be centered on click
    explosion.css("left", x - explosion.width() / 2);
    explosion.css("top", y - explosion.height() / 2);
  
    for (var i = 0; i < particles; i++) {
      // positioning x,y of the particle on the circle (little randomized radius)
      var x =
          explosion.width() / 2 +
          rand(80, 150) *
            Math.cos((2 * Math.PI * i) / rand(particles - 10, particles + 10)),
        y =
          explosion.height() / 2 +
          rand(80, 150) *
            Math.sin((2 * Math.PI * i) / rand(particles - 10, particles + 10));
  
      // color = rand(0, 255) + ', ' + rand(0, 255) + ', ' + rand(0, 255) // randomize the color rgb
      var randNum = Math.floor(Math.random() * 2) + 1;
      if (randNum > 1) {
        color = "254,233,45"; // randomize the color rgb
      } else {
        color = "95,81,203"; // randomize the color rgb
      }
      // particle element creation (could be anything other than div)
      elm = $(
        '<div class="particle" style="' +
          "background-color: rgb(" +
          color +
          ") ;" +
          "top: " +
          y +
          "px; " +
          "left: " +
          x +
          'px"></div>'
      );
  
      if (i == 0) {
        // no need to add the listener on all generated elements
        // css3 animation end detection
        elm.one(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend",
          function (e) {
            explosion.remove(); // remove this explosion container when animation ended
          }
        );
      }
      explosion.append(elm);
    }
  }
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }
//End Particulas
function crearTableroNumeros(nivel = 1){
  let numeros=0;
  numbers1=[];
  if(( level % 5 ) == 0){
    nivel = 3
  }else if(nivel >4){
    nivel = Math.floor(Math.random() * 4)+1
    console.log(nivel)
  }
  for(let i=0; i<nivel; i++){
    for(let j=0; j<nivel; j++){
      numeros++
      numbers1.push(numeros)
    }
  }
  arrayActual = numbers1;
  arraytemporal = numbers1;
  numeros=0;
  gameBoardElem = makeGameBoardElem(nivel);

}

function comprobarLevel(){
  if (gameBoard.length == arrayActual.length && statusgame != "perdio") {
    if (level == 1) {
      // stopIntervalff();
      level = 2;
      statusgame = "next";
    } else if (level == 2) {
      // stopIntervalff();
      level = 3;
      statusgame = "next";
    }
    else if (level == 3) {
      level = 4;
      statusgame = "has ganado";
    }else if(level >=4){
      level++
    }



    $(".game-board").hide();
    // $("#bubble_check").show();
    // document.getElementById("bubble_check").play();
    // playSound("next-level");
    // console("estrella1")
      console.log("aquiii super tranqui");
      setTimeout(() => {
        // $("#bubble_check").hide();
        // console.log("aqui mero")
        gameBoard = [];
        resetGame();
      }, 200);

  }
}

// crearTableroNumeros(1)
resetGame()
async function playSound(name) {
  let sound = document.getElementById("sound-" + name);
  sound.load()
  await sound.pause();
  sound.currentTime = 0;
  await sound.play();
}
async function pauseSound(name) {
  let sound = document.getElementById("sound-" + name);
  await sound.pause();

}
//reloj

// variable to store our intervalID
// let reloj;

function inicioTiempo() {
  document.getElementById("contenedor_tiempo").style.animation = "zoom-in-zoom-out 1s ease infinite";
  
  // check if an interval has already been set up
  if (!reloj) {
    reloj = setInterval(disminuirTimepo, 1000);
  }
}

function disminuirTimepo() {
  tiempo--
  document.getElementById("no_tiempo").innerHTML = tiempo;

  if(tiempo <= 0){
    stopReloj()
    endGame()
  }
}

function stopReloj() {
  clearInterval(reloj);
  // release our intervalID from the variable
  reloj = null;
}

function bossDragon(){

  if(typeGame == 1){
    let numeros_escogidos = [];
    let cuadroboss =document.getElementsByClassName("game-board")
    let el_random= getRandomInt(cuadroboss[0].children.length)
    let dragonVisto = cuadroboss[0].children[el_random]
    let posions
    for(let i = 0; i<(level/5); i++){
      posions  = getRandomInt(cuadroboss[0].children.length)
      while (posions == el_random) {
        posions  = getRandomInt(cuadroboss[0].children.length)
      }
      numeros_escogidos.push(posions);
    }
    for(let i = 0; i<cuadroboss[0].children.length; i++){
      if(numeros_escogidos.includes(i)){
        cuadroboss[0].children[i].children[0].classList = "stone_broke"
        cuadroboss[0].children[i].classList = "posion"
      }else if(el_random == i){
        if(getRandomInt(4)>=1){
          dragonVisto.children[0].classList = "stone_broke_dragon";
          dragonVisto.classList = "dragooon";
        }else{
          cuadroboss[0].children[i].children[0].classList = "stone_broke"
          cuadroboss[0].children[i].classList = "posion"
        }
        
      }else{
        cuadroboss[0].children[i].children[0].classList = "stone"
      }
    }

    setTimeout(() => {
      if(typeGame == 1){
        for(let i = 0; i<cuadroboss[0].children.length; i++){
          if(numeros_escogidos.includes(i)){
            cuadroboss[0].children[i].children[0].classList = "stone_broke_out"
          }else if(el_random == i){
            dragonVisto.children[0].classList = "stone_broke_out";
          }
          else{
            cuadroboss[0].children[i].children[0].classList = "stone2"
          }

        }
      }
    }, 3000);
  }
}


function inicioTiempoBoss() {
  // check if an interval has already been set up
  if (!tiempoDragon) {
    if(level<20 && ( level % 5 ) == 0){
      
      tiempoDragon = setInterval(resetDragon, 5000);
    }else if(level>=20 && ( level % 5 ) == 0){
      tiempoDragon = setInterval(resetDragon, 5000);

    }
    else{
      stopRelojBoss()
    }
  }
}

function resetDragon() {
  playSound("fire")
  if(level<20 && ( level % 5 ) == 0){
    console.log("aquiii")
    bossDragon()
  }else if(level>=20 && ( level % 5 ) == 0){
    console.log("aquiii x2")
    finalBossDragon()
  }
}

function stopRelojBoss() {
  clearInterval(tiempoDragon);
  tiempoDragon = null;
}

//funcion reinicioJuego

function newGame(){
  level = 2
  marcador = 0
  resetGame()
  gameBoard = [];
  numbers1 = [];
  level = 2;
  vidas = 3
  tiempo = 60
  document.getElementById("no_vidas").innerHTML = vidas;
  document.getElementById("no_tiempo").innerHTML = tiempo;
  document.getElementById("resultado").innerHTML = (marcador+1);
  document.getElementById("resultado2").innerHTML = (marcador);
  document.getElementById("resultado3").innerHTML = (marcador);
}

//funciones para menus
function startGame(){
  playSound("FarOut")

  console.log("startGame")
  document.getElementById("container_menu").style.display = "none";
  document.getElementById("dialogos").style.display = "";
  document.getElementById("fondoBackPrincipal").style.display = "none";
  document.getElementById("container_pause").style.display = "none";
  document.getElementById("container_final").style.display = "none";
  document.getElementById("fondoFinal").style.display = "none";
  document.getElementById("fondoPause").style.display = "none";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
  document.getElementById("container").style.display = "block";
  document.getElementById("fondoBack").style.display = "block";
  document.getElementById("puntajes").style.display = "";
}

function pauseGame(){
  document.getElementById("botonCambio").style.display = "none"

  console.log("pauseGame")
  if(typeGame == 1){
    stopRelojBoss()
  }else{
    stopReloj()
  }
  document.getElementById("container_menu").style.display = "none";
  document.getElementById("fondoBackPrincipal").style.display = "none";
  document.getElementById("container_pause").style.display = "";
  document.getElementById("fondoPause").style.display = "";
  document.getElementById("container").style.display = "none";
  document.getElementById("container_final").style.display = "none";
  document.getElementById("fondoFinal").style.display = "none";
  document.getElementById("fondoBack").style.display = "none";
  document.getElementById("puntajes").style.display = "none";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
}

function reanudeGame(){
  if(level>10 && level<20 && !( level % 5 ) == 0){
    document.getElementById("botonCambio").style.display = ""
  }
  console.log("reanudeGame")
  if(typeGame == 1){
    inicioTiempoBoss()
  }else if(level > 2){
    inicioTiempo()
  }
  document.getElementById("container_menu").style.display = "none";
  document.getElementById("fondoBackPrincipal").style.display = "none";
  document.getElementById("container_pause").style.display = "none";
  document.getElementById("fondoPause").style.display = "none";
  document.getElementById("container_final").style.display = "none";
  document.getElementById("fondoFinal").style.display = "none";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
  document.getElementById("container").style.display = "";
  document.getElementById("fondoBack").style.display = "";
  document.getElementById("puntajes").style.display = "";
}

function endGame(){
  document.getElementById("botonCambio").style.display = "none"
  pauseSound("FarOut")
  pauseSound("arthas")
  level = 2
  marcador = 0
  dragonVidaFinal = 100
  fin = false
  resetGame()
  gameBoard = [];
  numbers1 = [];
  level = 2;
  vidas = 3
  tiempo = 60
  document.getElementById("no_vidas").innerHTML = vidas;
  document.getElementById("no_tiempo").innerHTML = tiempo;
  document.getElementById("resultado").innerHTML = marcador;
  // document.getElementById("resultado2").innerHTML = (marcador+1);
  console.log("endGame")
  if(typeGame == 1){
    stopRelojBoss()
    stopPoder()
  }else{
    stopReloj()
    stopPoder()
  }
  document.getElementById("container_menu").style.display = "none";
  document.getElementById("fondoBackPrincipal").style.display = "none";
  document.getElementById("container_pause").style.display = "none";
  document.getElementById("fondoPause").style.display = "none";
  document.getElementById("container_final").style.display = "";
  document.getElementById("fondoFinal").style.display = "";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("fondoBack").style.display = "none";
  document.getElementById("puntajes").style.display = "none";
}

function home(){
  pauseSound("FarOut")
  pauseSound("arthas")
  level = 2
  marcador = 0
  resetGame()
  gameBoard = [];
  numbers1 = [];
  level = 2;
  vidas = 3
  tiempo = 60
  document.getElementById("no_vidas").innerHTML = vidas;
  document.getElementById("no_tiempo").innerHTML = tiempo;
  document.getElementById("resultado").innerHTML = (marcador+1);
  document.getElementById("resultado2").innerHTML = (marcador);
  document.getElementById("resultado3").innerHTML = (marcador);
  console.log("endGame")
  if(typeGame == 1){
    stopRelojBoss()
  }else{
    stopReloj()
  }
  document.getElementById("container_menu").style.display = "";
  document.getElementById("fondoBackPrincipal").style.display = "";
  document.getElementById("container_pause").style.display = "none";
  document.getElementById("fondoPause").style.display = "none";
  document.getElementById("container_final").style.display = "none";
  document.getElementById("fondoFinal").style.display = "none";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("fondoBack").style.display = "none";
  document.getElementById("puntajes").style.display = "none";
}

function viewRecords(){
  console.log("viewRecords")

}

function viewConfig(){
  console.log("viewConfig")

}

function viewAbout(){
  console.log("viewAbout")

}


function viewResults(){
  console.log("viewResults")
  console.log("backMenu")
  document.getElementById("container_menu").style.display = "none";
  document.getElementById("fondoBackPrincipal").style.display = "none";
  document.getElementById("container_pause").style.display = "none";
  document.getElementById("fondoPause").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("fondoFinal").style.display = "";
  document.getElementById("container_final").style.display = "";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
  document.getElementById("fondoBack").style.display = "none";
  document.getElementById("puntajes").style.display = "none";

}

function backMenu(){
  console.log("backMenu")
  document.getElementById("container_menu").style.display = "";
  document.getElementById("fondoBackPrincipal").style.display = "";
  document.getElementById("container_pause").style.display = "none";
  document.getElementById("fondoPause").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("container_final_ganador").style.display = "none";
  document.getElementById("fondoFinalGanador").style.display = "none";
  document.getElementById("fondoFinal").style.display = "none";
  document.getElementById("container_final").style.display = "none";
  document.getElementById("fondoBack").style.display = "none";
  document.getElementById("puntajes").style.display = "none";
}

function mensaje(){
  let clases = document.getElementById("dialogos").classList
  let numero = clases[1].split("-")[1]
  document.getElementById("dialogos").classList.remove(clases[1]);

  if(numero == 0){
    numero++
    document.getElementById("dialogos").classList.add("mensaje-"+numero);
  }else if(numero == 1){
    document.getElementById("text_dragon").innerHTML= "Sabia que vendrias!!, solo tu nos podras salvar de este problema, hay un dragon que amenaza con destruir este lugar, mi hogar :(";
    numero++
    document.getElementById("dialogos").classList.add("mensaje-"+numero);

  }else if(numero == 2){
    document.getElementById("text_dragon").innerHTML= "para encontrarlo necesitaremos eliminar los paneles de acuerdo a la numeracion ascendente, confio en ti, ya que yo no se contar :)";
    numero++

  document.getElementById("dialogos").classList.add("mensaje-"+numero);

  }else if(numero == 3){
    document.getElementById("text_dragon").innerHTML= "Suerte!! la necesitaremos!!:)";
    numero++
    document.getElementById("dialogos").classList.add("mensaje-"+numero);
  }else if(numero == 4){
    numero=1
    document.getElementById("dialogos").classList.add("mensaje-"+numero);
    document.getElementById("text_dragon").innerHTML= "HEYYYY!!! HOLAAAA!!!!!!!";
    document.getElementById("dialogos").style.display = "none";
    playSound("dragon")
    if(level !=2)inicioTiempo()
  }
}

function mensaje2(){
  let clases = document.getElementById("dialogos2").classList
  let numero = clases[1].split("-")[1]
  document.getElementById("dialogos2").classList.remove(clases[1]);

  if(numero == 0){
    numero++
    document.getElementById("dialogos2").classList.add("mensaje-"+numero);
  }else if(numero == 1){
    document.getElementById("text_dragon2").innerHTML= "Por ahora no lo podemos vencer, necesitamos de ayuda magica que esperemos encontrar...";
    numero++
    document.getElementById("dialogos2").classList.add("mensaje-"+numero);

  }else if(numero == 2){
    document.getElementById("text_dragon2").innerHTML= "Pero si podemos hacerle daño!, golpealo cuando se asome!, lo reconoceras por el brillo en sus ojos";
    numero++

  document.getElementById("dialogos2").classList.add("mensaje-"+numero);

  }else if(numero == 3){
    document.getElementById("text_dragon2").innerHTML= "Cuidado con las posiones! VAMOOOOOS!!!!";
    numero++
    document.getElementById("dialogos2").classList.add("mensaje-"+numero);
  }else if(numero == 4){
    numero=1
    document.getElementById("dialogos2").classList.add("mensaje-"+numero);
    document.getElementById("text_dragon2").innerHTML= "EEEL DRAGOOOONNN!!! :O";
    document.getElementById("dialogos2").style.display = "none";
    playSound("dragon")
    // inicioTiempo()
  }
}

function mensaje3(){
  let clases = document.getElementById("dialogos3").classList
  let numero = clases[1].split("-")[1]
  document.getElementById("dialogos3").classList.remove(clases[1]);

  if(numero == 0){
    numero++
    document.getElementById("dialogos3").classList.add("mensaje-"+numero);
  }else if(numero == 1){
    document.getElementById("text_dragon3").innerHTML= "Nos estamos acercando, estos paneles estan protegidos con burbujas";
    numero++
    document.getElementById("dialogos3").classList.add("mensaje-"+numero);

  }else if(numero == 2){
    document.getElementById("text_dragon3").innerHTML= "Basatara con darle click una vez para liberar al panel y ahora si seleccionarlo";
    numero++

  document.getElementById("dialogos3").classList.add("mensaje-"+numero);

  }else if(numero == 3){
    document.getElementById("text_dragon3").innerHTML= "Cuidado no puedes reventar todas las burbujas primero y luego los paneles! es peligroso!!";
    numero++
    document.getElementById("dialogos3").classList.add("mensaje-"+numero);
  }else if(numero == 4){
    numero=1
    document.getElementById("dialogos3").classList.add("mensaje-"+numero);
    document.getElementById("text_dragon3").innerHTML= "POR AQUIII!!";
    document.getElementById("dialogos3").style.display = "none";
    playSound("dragon")
    inicioTiempo()
  }
}

function mensaje4(){
  let clases = document.getElementById("dialogos4").classList
  let numero = clases[1].split("-")[1]
  document.getElementById("dialogos4").classList.remove(clases[1]);

  if(numero == 0){
    numero++
    document.getElementById("dialogos4").classList.add("mensaje-"+numero);
  }else if(numero == 1){
    document.getElementById("text_dragon4").innerHTML= "Poe aqui debe de estar el dragon... no nos falta mucho para encontrarlo";
    numero++
    document.getElementById("dialogos4").classList.add("mensaje-"+numero);

  }else if(numero == 2){
    document.getElementById("text_dragon4").innerHTML= "Dejame ayudarte con estos paneles, presiona la tecla 'Q' o el boton en pantalla, para activar los paneles y seleccionarlos";
    numero++

  document.getElementById("dialogos4").classList.add("mensaje-"+numero);

  }else if(numero == 3){
    document.getElementById("text_dragon4").innerHTML= "Esto fue lo unico que aprendi en la escuela jeje, cuidado... estamos cerca del dragon!";
    numero++
    document.getElementById("dialogos4").classList.add("mensaje-"+numero);
  }else if(numero == 4){
    numero=1
    document.getElementById("dialogos4").classList.add("mensaje-"+numero);
    document.getElementById("text_dragon4").innerHTML= "MAGIIAAAAA!!!";
    document.getElementById("dialogos4").style.display = "none";
    playSound("dragon")
    inicioTiempo()
  }
}

function mensaje5(){
  let clases = document.getElementById("dialogos5").classList
  let numero = clases[1].split("-")[1]
  document.getElementById("dialogos5").classList.remove(clases[1]);

  if(numero == 0){
    numero++
    document.getElementById("dialogos5").classList.add("mensaje-"+numero);
  }else if(numero == 1){
    document.getElementById("text_dragon5").innerHTML= "Vamos por ese dragon!!! >:)";
    numero++
    document.getElementById("dialogos5").classList.add("mensaje-"+numero);

  }else if(numero == 2){
    document.getElementById("text_dragon5").innerHTML= "Lo distraere!, ayudame a esquibar el fuego para cansarlo y cuando este enfrente de ti, pegale con todo!!";
    numero++

  document.getElementById("dialogos5").classList.add("mensaje-"+numero);

  }else if(numero == 3){
    document.getElementById("text_dragon5").innerHTML= "mientras mas clics des, mas rapido acabaremos con el, o al menos eso pasa en las peliculas:), confio en ti por que yo toi chiquito:) VAMOS!!!";
    numero++
    document.getElementById("dialogos5").classList.add("mensaje-"+numero);
  }else if(numero == 4){
    numero=1
    document.getElementById("dialogos5").classList.add("mensaje-"+numero);
    document.getElementById("text_dragon5").innerHTML= "El MOMENTO HA LLEGADO!!";
    document.getElementById("dialogos5").style.display = "none";
    playSound("dragon")
    // document.getElementById("dialogos5").style.display = "";
    finalBossDragon()
    
  }
}

function cambio(){
  document.getElementById("botonCambio").classList = "botonAnimacion"
  setTimeout(() => {
  document.getElementById("botonCambio").classList = ""
    
  }, 100);
  let prueba = document.getElementsByClassName("diamond2fake")
  prueba = Array.prototype.slice.call(prueba)
  let prueba2 = document.getElementsByClassName("diamond2")
  prueba2 = Array.prototype.slice.call(prueba2)

  if(document.getElementsByClassName("diamond2fake")){
    console.log(prueba)
    
    for(let i = 0; i<prueba.length; i++){
      prueba[i].classList.add("diamond2")
    }
    for(let j = 0; j<prueba.length; j++){
      prueba[j].classList.remove("diamond2fake")
    }
  }

  if(document.getElementsByClassName("diamond2")){
    console.log(prueba2)
    
    for(let i = 0; i<prueba2.length; i++){
      prueba2[i].classList.add("diamond2fake")
    }
    for(let j = 0; j<prueba2.length; j++){
      prueba2[j].classList.remove("diamond2")
    }
  }
  // if(document.getElementsByClassName("diamond2")){
  //   let prueba2 = document.getElementsByClassName("diamond2")
  //   for(let i = 0; i<prueba2.length; i++){
  //     prueba2[i].classList.add("diamond2fake")
  //     prueba2[i].classList.remove("diamond2")
  //   }

  // }
}

window.addEventListener('beforeunload', function (e) {
  // e.preventDefault(); 

  pauseGame()
}); 

function finalBossDragon(){
  if(typeGame == 1){
    console.log("si llega")
    
      let cuadroboss =document.getElementsByClassName("game-board")
      for(let i = 0; i<cuadroboss[0].children.length; i++){
        if(i>5){
          if(cuadroboss[0].children[i].children[0].classList == "stone_final_dragon"){

          }else{
            if(i == 7){
              cuadroboss[0].children[i].children[0].classList = "stone_final_dragon"
              cuadroboss[0].children[i].classList = "nospace"
            }else{
              cuadroboss[0].children[i].children[0].classList = "stone_final"
              cuadroboss[0].children[i].classList = "nospace"
            }
          }
        }

      }
      setTimeout(() => {
        dragonVidaFinal = 100
        inicioJefe()
      }, 2000);
    }
}




function inicioJefe() {
  document.getElementById("animacionesboss").style.display = ""
  
  // document.getElementById("contenedor_tiempo").style.animation = "zoom-in-zoom-out 1s ease infinite";
  
  // check if an interval has already been set up
  if (!finalBoss && !comprobarPoder) {
    finalBoss = setInterval(lanzarPoder, 3000);
    // comprobarPoder = setInterval(comPoder, 1000);
  }
}

function lanzarPoder() {
  playSound("fireFinal")
  playSound("dragon")
  poder_dragon ++
  console.log("ejecuta")
  let cuadroDragonPoder =document.getElementsByClassName("game-board2")
      for(let i = 0; i<cuadroDragonPoder[0].children.length; i++){
            cuadroDragonPoder[0].children[i].children[0].classList = "stone_final_dragon_static"
      }
      cuadroDragonPoder[0].children[getRandomInt(cuadroDragonPoder[0].children.length)].children[0].classList = "stone_final_dragon_fire"

  setTimeout(() => {
    comPoder();
  }, 700);

  if(poder_dragon >=5){
    stopPoder()
    document.getElementById("dragonGolpes").style.display = ""
    poder_dragon = 0
    setTimeout(() => {
    document.getElementById("dragonGolpes").style.display = "none"
      if(dragonVidaFinal>0){
        inicioJefe()
      }
    }, 3000);
  }
}

function stopPoder() {
  let cuadroDragonPoder =document.getElementsByClassName("game-board2")
      for(let i = 0; i<cuadroDragonPoder[0].children.length; i++){
            cuadroDragonPoder[0].children[i].children[0].classList = "stone_final_dragon_static"
      }
  stopCom()
  document.getElementById("animacionesboss").style.display = "none"
  clearInterval(finalBoss);
  // release our intervalID from the variable
  finalBoss = null;
}

function inicioComprobacion() {
  // document.getElementById("contenedor_tiempo").style.animation = "zoom-in-zoom-out 1s ease infinite";
  
  // check if an interval has already been set up
  if (!finalBoss && !comprobarPoder) {
    comprobarPoder = setInterval(comPoder, 2000);
  }
}

function comPoder() {
  // poder_dragon++
  console.log("ejecuta")
  let cuadroDragonPoder2 =document.getElementsByClassName("game-board2")
  let posicionPoder
  let posicionDragon
  let cuadroDragonPoder3 =document.getElementsByClassName("game-board")
      for(let i = 0; i<cuadroDragonPoder2[0].children.length; i++){
            if(cuadroDragonPoder2[0].children[i].children[0].classList == "stone_final_dragon_fire"){
              posicionPoder = i+1;
              break;
            }
      }
      for(let i = 0; i<cuadroDragonPoder3[0].children.length; i++){
        if(i>5){

          if(cuadroDragonPoder3[0].children[i].children[0].classList == "stone_final_dragon"){
            posicionDragon = i-5;
            break;
          }
        } 
      }
      console.log(posicionDragon)
      console.log(posicionPoder)
      if(posicionDragon == posicionPoder){
        vidas--
        playSound("glass")
        document.getElementById("no_vidas").innerHTML = vidas;
        if(vidas <= 0 ){
          playSound("wrong")
          endGame()
        }
      }
}

function stopCom() {
  clearInterval(comprobarPoder);
  // release our intervalID from the variable
  comprobarPoder = null;
}

function goldeDragon(){
  playSound("golpe")
  dragonVidaFinal --
  let unaVida = (1083 / 100)
  let calculo = (-Math.abs(dragonVidaFinal) + 100)
  // console.log(unaVida - (unaVida*calculo))
  document.getElementById("cls-4").style.width = ( 1083 - (unaVida*calculo))
  console.log(dragonVidaFinal)
  if(dragonVidaFinal<=0){
    
    document.getElementById("dragonGolpes").style.display = "none"
    finGame()
  }
}
function finGame(){
  if(!fin && level==20){
    fin =true
      console.log("final de juego, ganaste!!!!!")
    level++
    console.log(level)
    resetGame()
  }else{
    endGame()
  }
// stopPoder()
// stopRelojBoss()
// endGame()
}

window.addEventListener("keydown", (event) => {
  
  let key = event.key
  if (key == "q") 
  {
    cambio()
  } 
})