var presentSeletedItem = "";
var computer = {
  readyToPlay: false,
  itemSelectorIndex: 0
};
var bgR = 255;
var bgG = 255;
var bgB = 255;

// ENVIRONMENT SET UP
//==========================

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  computer.itemSelectorIndex = Math.floor(Math.random() * 3);
}

function draw() {
  background(bgR, bgG, bgB);
  pointLight(255, 255, 255,   windowWidth/2, windowHeight/1, 1);
  displaySelectedItem();
  computerPlay();
  if (computer.readyToPlay && presentSeletedItem) {
    displayGameResults();
  }
}

const itemFunctionMap = {
  "rock": () => {box()},
  "paper": () => {plane(100, 80)},
  "scissors": () => {cone()}
}

function displayWin(){
  bgR = 0;
  bgG = 255;
  bgB = 0;
}

function displayLose(){
  bgR = 255;
  bgG = 0;
  bgB = 0;
}

// USER INPUTS
//===========================

function itemHasBeenClicked(item){
  presentSeletedItem = item;
}

function resetGame(reset){
  console.log("I'm being reset");
  if(reset){
    window.location.reload();
  }
}

function playHasBeenClicked(x){
  var computerReady;
  if (x == true && presentSeletedItem != false){
    let buttons = document.getElementsByClassName("player-item");
    for (let i = 0; i < buttons.length; i++){
      buttons[i].setAttribute("onclick", "");
    }
    computer.readyToPlay = true;
  } else {
     alert('Got to pick an item, bro');
  }
}

// GRAPHICS DISPLAY
//===========================


function itemRotateAndFill(){
  normalMaterial();
  noStroke();
  rotateX(frameCount*0.05);
  rotateZ(frameCount*0.05);
}

function playerItemPositionRender(){
  fill(100);
  push();
    translate(windowWidth/4*-1, 0, 0);
    itemRotateAndFill();
}

function computerItemPositionRender(){
  fill(100);
    push();
      translate(windowWidth/4, 0, 0);
      itemRotateAndFill();
}

function displaySelectedItem(){
  if(itemFunctionMap[presentSeletedItem]){
    playerItemPositionRender();
    itemFunctionMap[presentSeletedItem]();
    pop();

  }
}

function displayGameResults() {
  var compReult = computerNumberToItem(computer.itemSelectorIndex);
  if (compReult != presentSeletedItem) {
    if (compReult == "rock" && presentSeletedItem == "scissors") {
      displayLose();
    } else if (compReult == "paper" && presentSeletedItem == "rock") {
      displayLose();
    } else if (compReult == "scissors" && presentSeletedItem == "paper") {
      displayLose();
    } else {
      displayWin();
    }
    
  } else {
    bgR = 100;
    bgG = 100;
    bgB = 100;
  }

}

// COMPUTER FUNCTIONS
//===========================

function computerPlay(){
  if (computer.readyToPlay) {
    computerItemLoader();
  }
}

function computerNumberToItem(x) {
  let i = ""
  if (x == 0) {
    i = "rock";
  } else if (x == 1){
    i = "paper";
  } else if (x == 2){
    i = "scissors";
  }
  return i;
}

function computerItemLoader(){
  let i = computerNumberToItem(computer.itemSelectorIndex);
  if(itemFunctionMap[i]){
    computerItemPositionRender();
    itemFunctionMap[i]();
    pop();
  }
}