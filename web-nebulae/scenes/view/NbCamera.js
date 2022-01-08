

export class NbCamera {

	constructor(scene){
		this.scene = scene;
		this.view = scene.view;
	
		// setup eye
		this.phi = 135;
		this.theta = 135;
		this.r = 20;
	
		//	eye vector
		this.eyeVector = new MathVector3d();
		this.eyeVector.eyeVector(this.r, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);
	
		this.eyePosition = this.view.eyePosition;
		this.eyeTarget = this.view.eyeTarget;
	
		this.eyeTarget_Speed = new MathVector3d(0.0, 0.0, 0.0);
		this.eyeTarget_Acceleration = new MathVector3d(0.0, 0.0, 0.0);
	}

	refresh(){

		// compute new eye target position
		this.eyeTarget_Speed.add(this.eyeTarget_Acceleration, this.eyeTarget_Speed);
		this.eyeTarget.add(this.eyeTarget_Speed, this.eyeTarget);

		// compute new eye position
		this.eyeVector.eyeVector(this.r, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);
		this.eyeTarget.add(this.eyeVector, this.eyePosition);

		// update view
		this.view.update();

		// render scene again
		this.scene.render();
	}
}