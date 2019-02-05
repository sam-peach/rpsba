class Model {
	constructor(objectName){
		this.itemModel = loadModel('assets/'+objectName+'.obj', true);
	}

	materialAndRotation(){	
	  this.material();
	  noStroke();
	  rotateX(frameCount*0.05);
	  rotateZ(frameCount*0.05);
	}

	material(){
	  ambientMaterial(69, 189, 193);
	}

	playerPositionRender(){
	  push();
	    translate(windowWidth/4*-1, 0, 0);
	}

	computerPositionRender(){
	  push();
	    translate(windowWidth/4, 0, 0);
	}

	resultPositionRender(){
	  noStroke();
	  push();
	  	translate(0, windowHeight/4*-1, 0);
	  	rotateX(frameCount*0.05);

	}

	display(){
		model(this.itemModel);
		pop();
	}

}