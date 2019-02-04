var presentSeletedItem = null;
var computer = {
  readyToPlay: false,
  itemSelectorIndex: 0,
  itemName: null
};

// ENVIRONMENT SET UP
//==========================\

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  scissors = new Model('scissors');
  paper = new Model('paper');
  rock = new Model('rock');
  winObj = new Model('win');
  loseObj = new Model('lose');
  drawObj = new Model('draw');
  resetState();
  
}

function draw() {
  background(255);
  displayGameResults();
  pointLight(255, 255, 255,   windowWidth/2, windowHeight/1, 1);
  displaySelectedItem();
  computerPlay();

// var fs = require('fs'); <<<<< LOOK IN THIS!
// var files = fs.readdirSync('assets');
// console.log(files);


}

function resetState(){	
  presentSeletedItem = null;
  computer.readyToPlay = false;
  computer.itemSelectorIndex = Math.floor(Math.random() * 3);
  computerNumberToItem(computer.itemSelectorIndex);
  console.log(computer.itemName);
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
    let buttons = document.getElementsByClassName("player-item"); //Doesn't need 'x==true' as if the function is being called then it's going to equal true regardless.
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
  if (computer.readyToPlay) {
	  if (computer.itemName != presentSeletedItem) {
	    if (computer.itemName == rock && presentSeletedItem == scissors) {
	      displayResult('lose');
	    } else if (computer.itemName == paper && presentSeletedItem == rock) {
	      displayResult('lose');
	    } else if (computer.itemName == scissors && presentSeletedItem == paper) {
	      displayResult('lose');
	    } else {
	      displayResult('win');
	    }
	    
	  } else if (computer.itemName == presentSeletedItem) {
	    displayResult('draw');

	  }
  } else {
  	background (255);
  }

}

function displayResult(result){
  if (result == 'win'){
	  winObj.resultPositionRender();
	  winObj.display();
  } else if (result == 'lose') {;
  	  loseObj.resultPositionRender();
  	  loseObj.display();
  } else if (result == 'draw') {
  	  drawObj.resultPositionRender();
  	  drawObj.display();
  }
}

// COMPUTER FUNCTIONS
//===========================

function computerPlay(){
  if (computer.readyToPlay) {
    let i = computer.itemName;	
    i.computerPositionRender();
    i.materialAndRotation();
    i.display();
  }
}

function computerNumberToItem(x) {
  let i = null;
  if (x == 0) {
    i = rock;
    computer.itemName = i;
  } else if (x == 1){
    i = paper;
    computer.itemName = i;
  } else if (x == 2){
    i = scissors;
    computer.itemName = i;
  }
  
}