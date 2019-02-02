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

	display(){
		model(this.itemModel);
		pop();
	}

}