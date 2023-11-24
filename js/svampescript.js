window.addEventListener("load", showTitle);

// deklarerer variablerne point og tid
let point;
let liv;

// deklarerer constanterne carljohan og fluesvamp
const carljohan = document.querySelector("#carljohan_container");
const carljohan2 = document.querySelector("#carljohan_container2");
const carljohan3 = document.querySelector("#carljohan_container3");
const fluesvamp = document.querySelector("#fluesvamp_container");

function showTitle() {
  console.log("showTitle");

  // Skjuler alle skærme
  hideAllScreens();

  // Viser titelskærm
  document.querySelector("#start").classList.remove("hide");

  // Når man klikker på knappen så går man til startGame
  document.querySelector("#play").addEventListener("click", startGame);
}

function startGame() {
  console.log("startGame");

  // Skjuler alle skærme
  hideAllScreens();

  // nulstiller liv og point (sætter til startværdien)
  point = 0;
  liv = 3;

  // opdaterer point på htmlsiden
  document.querySelector("#mine_points").textContent = point;

  // nulstiller liv (hjerter) ved at fjerne klassen gray så de bliver "røde" igen
  document.querySelector("#heart1").classList.remove("gray");
  document.querySelector("#heart2").classList.remove("gray");
  document.querySelector("#heart3").classList.remove("gray");

  // starter timer
  document.querySelector("#sand").classList.add("timer");

  // går til endGame når tiden er gået (når timer-animationen er færdig)
  document.querySelector("#sand").addEventListener("animationend", endGame);

  // starter hoppe-animation på carljohan svamp
  carljohan.classList.add("hop");
  let rnd = generateRandomNumber(10);
  carljohan.classList.add("pos" + rnd);
  rnd = generateRandomNumber(3);
  carljohan.classList.add("speed" + rnd);

  // starter hoppe-animation på carljohan2 svamp
  carljohan2.classList.add("hop");
  rnd = generateRandomNumber(10);
  carljohan2.classList.add("pos" + rnd);
  rnd = generateRandomNumber(3);
  carljohan2.classList.add("speed" + rnd);

  // starter hoppe-animation på carljohan3 svamp
  carljohan3.classList.add("hop");
  rnd = generateRandomNumber(10);
  carljohan3.classList.add("pos" + rnd);
  rnd = generateRandomNumber(3);
  carljohan3.classList.add("speed" + rnd);

  // starter falde-animation på FL svamp
  fluesvamp.classList.add("fald");
  rnd = generateRandomNumber(5);
  fluesvamp.classList.add("posFall" + rnd);
  rnd = generateRandomNumber(2);
  fluesvamp.classList.add("speed" + rnd);
  rnd = generateRandomNumber(4);
  fluesvamp.classList.add("delay" + rnd);

  // lytter efter klik på carljohan, gå til funktionen clicCarlJohan hvis der klikkes
  carljohan.addEventListener("mousedown", clickCarlJohan);
  carljohan2.addEventListener("mousedown", clickCarlJohan);
  carljohan3.addEventListener("mousedown", clickCarlJohan);
  // lytter efter klik på fluesvamp, gå til funktionen clicFlueSvamp hvis der klikkes
  fluesvamp.addEventListener("mousedown", clickFlueSvamp);

  // når carljohan har hoppet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  carljohan.addEventListener("animationiteration", resetCarlJohan);
  carljohan2.addEventListener("animationiteration", resetCarlJohan);
  carljohan3.addEventListener("animationiteration", resetCarlJohan);
  // når fluesvamp har hoppet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  fluesvamp.addEventListener("animationiteration", resetFlueSvamp);
}

function clickCarlJohan() {
  console.log("clickCarlJohan");
  console.log(this);

  // stopper med at lytte efter klik (fjerner eventlistener)
  this.removeEventListener("click", clickCarlJohan);

  // afspiller carljohan lyd

  // Tæller op på point (kan også skrives: point++;)
  point = point + 1;
  // Skriver point ud (vis nyt pointtal på siden)
  document.querySelector("#mine_points").textContent = point;

  // Stopper hoppe-animation på container (sæt på pause ved at tilføje klassen frys)
  this.classList.add("frys");

  // Starter forsvind-animation på sprite
  this.firstElementChild.classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  this.addEventListener("animationend", resetCarlJohan);
}

function clickFlueSvamp() {
  console.log("clickFlueSvamp");

  // stopper med at lytte efter klik (fjerner eventlistener)
  fluesvamp.removeEventListener("click", clickFlueSvamp);

  // afspiller fluesvamp lyd

  // Tæller ned på liv (kan også skrives: liv--;)
  // liv = liv - 1;
  // Viser opdateret antal liv på siden
  // document.querySelector("#mine_liv").textContent = liv;
  // Hvis der ikke er flere liv tilbage (hvis liv er mindre eller lig med 0)
  // => så stopper spillet (vi går til endGame)
  // if (liv <= 0) {
  //   endGame();
  // }

  // Vores hjerter hedder #heart1, #heart2, #heart3
  // Hvis der er mere end 1 liv tilbage (liv > 1), så skal det (aktuelle) hjerte have effekten "gray"
  // Det aktuelle hjerte er det hjerte der svarer til det antal liv vi har tilbage (variablen: antalLiv)
  // Vi finder det aktuelle hjerte ved at sige "#liv" + antalliv
  // Ellers går vi til funktionen gameover
  if (liv > 1) {
    document.querySelector("#heart" + liv).classList.add("gray");
    liv = liv - 1;
    console.log(liv);
  } else {
    document.querySelector("#heart" + liv).classList.add("gray");
    endGame();
  }

  // Stopper falde-animation på container (sæt på pause ved at tilføje klassen frys)
  fluesvamp.classList.add("frys");

  // Starter forsvind-animation på sprite
  document.querySelector("#fluesvamp_sprite").classList.add("forsvind");

  // Går til reset funktionen når forsvind-animationen er færdig
  fluesvamp.addEventListener("animationend", resetFlueSvamp);
}

function resetCarlJohan() {
  console.log("carlJohanReset");

  //fjerner alle klasser fra carljohans container (hop, frys og pos)
  this.classList = "";
  //fjerner alle klasser fra carljohans sprite (forsvind)
  this.firstElementChild.classList = "";

  // gør det muligt at sætte hoppeanimationen på igen med det samme
  this.offsetHeight;
  // genstarter hoppe-animation (hoppeanimation sættes på igen)
  this.classList.add("hop");

  // ny random position til svampen
  let rnd = generateRandomNumber(10);
  this.classList.add("pos" + rnd);
  // ny random speed
  rnd = generateRandomNumber(3);
  this.classList.add("speed" + rnd);

  // lytter efter klik på CarlJohan, går til funktionen clicCarlJohan hvis der klikkes
  this.addEventListener("mousedown", clickCarlJohan);
}

function resetFlueSvamp() {
  console.log("flueSvampReset");

  //fjerner alle klasser fra carljohans container (hop, frys og pos)
  document.querySelector("#fluesvamp_container").classList = "";
  //fjerner alle klasser fra carljohans sprite (forsvind)
  document.querySelector("#fluesvamp_sprite").classList = "";

  // Giver containeren en ny random position/speed/delay
  let rnd = generateRandomNumber(5);
  document.querySelector("#fluesvamp_container").classList.add("posFall" + rnd);
  rnd = generateRandomNumber(2);
  document.querySelector("#fluesvamp_container").classList.add("speed" + rnd);
  rnd = generateRandomNumber(4);
  // document.querySelector("#fluesvamp_container").classList.add("delay" + rnd);

  // genstarter hoppe-animation (hoppeanimation sættes på igen)
  document.querySelector("#fluesvamp_container").offsetHeight;
  document.querySelector("#fluesvamp_container").classList.add("fald");

  // lytter efter klik på CarlJohan, gå til funktionen clicCarlJohan hvis der klikkes
  document.querySelector("#fluesvamp_container").addEventListener("mousedown", clickFlueSvamp);
}

function endGame() {
  console.log("endGame");

  if (liv <= 0) {
    gameOver();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameOver();
  }

  // stop timer og fjern eventlistener
  document.querySelector("#sand").classList.remove("timer");
  document.querySelector("#sand").removeEventListener("animationend", endGame);

  // Fjerner alle eventlistnere fra elementerne
  carljohan.removeEventListener("animationend", resetCarlJohan);
  carljohan.removeEventListener("animationiteration", resetCarlJohan);
  carljohan.removeEventListener("mousedown", clickCarlJohan);

  fluesvamp.removeEventListener("mousedown", clickFlueSvamp);
  fluesvamp.removeEventListener("animationend", resetFlueSvamp);
  fluesvamp.removeEventListener("animationiteration", resetFlueSvamp);

  // Fjerner alle klasser fra elementerne
  carljohan.classList = "";
  document.querySelector("#carljohan_sprite").classList = "";
  fluesvamp.classList = "";
  document.querySelector("#fluesvamp_sprite").classList = "";
}

function gameOver() {
  console.log("gameOver");

  document.querySelector("#carljohan_container").classList = "";

  // skjuler alle skærme
  hideAllScreens();

  // viser gameover skærm
  document.querySelector("#game_over").classList.remove("hide");

  // når der klikkes på knappen spil-igen går vi til startGame
  document.querySelector("#play_again_1").addEventListener("click", startGame);
}

function levelComplete() {
  console.log("levelComplete");

  // skjuler alle skærme
  hideAllScreens();

  // viser levelcomplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  // når der klikkes på knappen spil-igen går vi til startGame
  document.querySelector("#play_again_2").addEventListener("click", startGame);
}

function generateRandomNumber(num) {
  let rndNumber = Math.random();
  rndNumber = rndNumber * num;
  rndNumber = Math.floor(rndNumber);
  rndNumber = rndNumber + 1;

  return rndNumber;

  // return Math.floor(Math.random()*num)+1;
}

function hideAllScreens() {
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
}
