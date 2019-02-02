var presentSeletedItem = null;
var computer = {
  readyToPlay: false,
  itemSelectorIndex: 0
};

// ENVIRONMENT SET UP
//==========================\

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  scissors = new Model('scissors');
  paper = new Model('paper');
  rock = new Model('rock');
  resetState();
  
}

function draw() {
  displayGameResults();
  pointLight(255, 255, 255,   windowWidth/2, windowHeight/1, 1);
  displaySelectedItem();
  computerPlay();
}

function resetState(){	
  presentSeletedItem = null;
  computer.readyToPlay = false;
  computer.itemSelectorIndex = Math.floor(Math.random() * 3);
  let buttons = document.getElementsByClassName("player-item");
  for (let i = 0; i < buttons.length-1; i++){
  let value = buttons[i].innerHTML
  buttons[i].setAttribute("onclick", "itemHasBeenClicked("+value+")");
  }
  let playBtn = document.getElementsByClassName("play");
  playBtn[0].setAttribute("onclick", "playHasBeenClicked(true)")
  background(255);
}

// USER INPUTS
//===========================

function itemHasBeenClicked(item){
  presentSeletedItem = item;
}

function resetGame(reset){
  if(reset){
  	resetState();
  }
}

function playHasBeenClicked(x){
  if (x == true && presentSeletedItem != null){
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

function displaySelectedItem(){
  if (presentSeletedItem) {
  	presentSeletedItem.playerPositionRender();
  	presentSeletedItem.materialAndRotation();
  	presentSeletedItem.display();
  } else{}
}

function displayGameResults() {

  let compReult = computerNumberToItem(computer.itemSelectorIndex);

  if (computer.readyToPlay) {
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
	    
	  } else if (compReult == presentSeletedItem) {
	    background(169, 218, 229);
	  }
  } else {
  	background (255);
  }

}

function displayWin(){
  background(46, 211, 74);
}

function displayLose(){
  background(221, 35, 63);
}

// COMPUTER FUNCTIONS
//===========================

function computerPlay(){
  if (computer.readyToPlay) {
    let i = computerNumberToItem(computer.itemSelectorIndex);
    i.computerPositionRender();
    i.materialAndRotation();
    i.display();
  }
}

function computerNumberToItem(x) {
  let i = null;
  if (x == 0) {
    i = rock;
  } else if (x == 1){
    i = paper;
  } else if (x == 2){
    i = scissors;
  }
  return i;
}