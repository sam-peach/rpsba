class Model {
	constructor(objectName){
		this.itemModel = loadModel('assets/'+objectName+'.obj', true);
	}

	materialAndRotation(){
	  normalMaterial();
	  noStroke();
	  rotateX(frameCount*0.05);
	  rotateZ(frameCount*0.05);
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
	  normalMaterial();
	  
	  push();
	  	translate(0, windowHeight/4*-1, 0);
	  	rotateX(frameCount*0.05);

	}

	display(){
		model(this.itemModel);
		pop();
	}

}