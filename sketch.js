var presentSeletedItem = "";
var computer = {
  readyToPlay: false,
  itemSelectorIndex: 0
};

// ENVIRONMENT SET UP
//==========================

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  scissors = new Model('scissors');
  paper = new Model('paper');
  rock = new Model('rock');
  computer.itemSelectorIndex = Math.floor(Math.random() * 3);
  background(255);
}

function draw() {
  displayGameResults();
  pointLight(255, 255, 255,   windowWidth/2, windowHeight/1, 1);
  displaySelectedItem();
  computerPlay();
  
  // if (computer.readyToPlay && presentSeletedItem) {
  //   displayGameResults();
  // }

}


const itemFunctionMap = {
  "rock": () => {
  	// rock.playerPositionRender();
 	rock.materialAndRotation();
  	rock.display();
},
  "paper": () => {
  	// paper.playerPositionRender();
 	paper.materialAndRotation();
  	paper.display()
  },
  "scissors": () => {
  	// scissors.playerPositionRender();
 	scissors.materialAndRotation();
  	scissors.display()}
}


function displayWin(){
  background(46, 211, 74);
}

function displayLose(){
  background(221, 35, 63);
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

function displaySelectedItem(){
  if(itemFunctionMap[presentSeletedItem]){
  	rock.playerPositionRender();
    itemFunctionMap[presentSeletedItem]();
  }
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

// COMPUTER FUNCTIONS
//===========================

function computerPlay(){
  if (computer.readyToPlay) {
    let i = computerNumberToItem(computer.itemSelectorIndex);

  	if(itemFunctionMap[i]){
  	rock.computerPositionRender();
    itemFunctionMap[i]();
  	}
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