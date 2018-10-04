

/**
 * view for the scene
 */
function WebGL_View(scene){
	
	this.scene = scene;

	this.mouseDown = false;
	this.lastMouseX = null;
	this.lastMouseY = null;

	this.mouseTrackballSensitity = 0.3;
	this.mouseWheelSensitivity = 0.8*1e-3;
	this.newRotationMatrix = new WebGL_Matrix4();

	
	// Eye
	this.eyePosition = new MathVector3(0.0, 0.0, 0.0);
	this.phi = 135;
	this.theta = 135;
	this.r = 20;
	this.eyePosition.eyeVector(20, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);

	this.eyeTarget = new MathVector3(0.0, 0.0, 0.0);
	this.eyeTarget_Speed = new MathVector3(0.0, 0.0, 0.0);
	this.eyeTarget_Acceleration = new MathVector3(0.0, 0.0, 0.0);
	
	// Projection matrix
	this.matrix_Projection = new WebGL_Matrix4();
	this.matrix_Projection.perspectiveProjection(45, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);
	
	// View matrix 
	this.matrix_View = new WebGL_Matrix4();
	this.matrix_View.lookAt(this.eyePosition, this.eyeTarget, new MathVector3(0.0, 0.0, 1.0));

	// Projection * View Matrix
	this.matrix_ProjectionView = new WebGL_Matrix4();
	this.matrix_ProjectionView.multiply(this.matrix_Projection, this.matrix_View);

	
	var _this = this;
	
	//register event listener to take control of the canvas
	canvas.addEventListener('mousedown', function(event) { _this.handleMouseDown(event);}, false);
	document.addEventListener('mousemove', function(event){ _this.handleMouseMove(event);}, false);

	//to allow mouse movement ending outside of the canvas
	document.addEventListener('mouseup', function(event) { _this.handleMouseUp(event);}, false);
	document.addEventListener('mousewheel', function(event) { _this.handleMouseWheel(event);}, false);

	document.addEventListener('keyup', function(event) { _this.handleKeyUp(event);}, false);
	document.addEventListener('keydown', function(event) { _this.handleKeyDown(event);}, false);
}


WebGL_View.prototype = {

		/* Animation */

		/** called on mouse down @param event */
		handleMouseDown : function(event){
			this.mouseDown = true;
			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;

			this.scene.render();
		},


		/** called on mouse up @param event */
		handleMouseUp : function(event){
			this.mouseDown = false;

			this.scene.render();
		},


		/** called on mouse move @param event */
		handleMouseMove : function(event) {
			if(this.mouseDown){

				this.newRotationMatrix.identity();

				this.phi -= (event.clientX - this.lastMouseX)*this.mouseTrackballSensitity;
				this.lastMouseX = event.clientX;
				this.theta += (event.clientY - this.lastMouseY)*this.mouseTrackballSensitity;
				this.lastMouseY = event.clientY;
				if(this.theta > 179){
					this.theta = 179;
				}
				if(this.theta < 1){
					this.theta = 1;
				}

				//log.nodeValue = "phi="+this.phi.toFixed(2)+" theta="+this.theta.toFixed(2)+" r="+this.r.toFixed(2)+"\n";
				//log.nodeValue+= "x="+event.clientX+" y="+event.clientY+"\n";

				//this.updateView();

				this.scene.render();
			}
		},

		handleMouseWheel : function(event) {
			this.r += -this.r*event.wheelDelta * this.mouseWheelSensitivity;
			if(this.r < 1.0){
				this.r = 1.0;
			}
			//this.updateView();

			this.scene.render();
		},



		handleKeyDown : function(event) {
			switch(event.keyCode){

			// left arrow	 
			case 37 :
				this.eyeTarget_Acceleration.y -= 0.001;
				break;

				// right arrow
			case 39 :
				this.eyeTarget_Acceleration.y += 0.001;
				break;

				// up arrow
			case 38 :
				this.eyeTarget_Acceleration.x += 0.001;
				break;

				// down arrow
			case 40 :
				this.eyeTarget_Acceleration.x -= 0.001;
				break;

			}

			this.scene.render();
		},

		handleKeyUp : function(event) {
			this.eyeTarget_Acceleration.x = 0;
			this.eyeTarget_Acceleration.y = 0;
			this.eyeTarget_Acceleration.z = 0;

			this.eyeTarget_Speed.x = 0;
			this.eyeTarget_Speed.y = 0;
			this.eyeTarget_Speed.z = 0;

			this.scene.render();
		},


		/**
		 * Normalize vector 
		 */
		update : function(){
			// compute new eye target position
			this.eyeTarget.add(this.eyeTarget_Speed);
			this.eyeTarget_Speed.add(this.eyeTarget_Acceleration);

			// update view matrices
			this.eyePosition.eyeVector(this.r, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);
			this.eyePosition.add(this.eyeTarget);
			this.matrix_View.lookAt(this.eyePosition, this.eyeTarget, new MathVector3(0,0,1));
			this.matrix_ProjectionView.multiply(this.matrix_Projection, this.matrix_View);
		}
};

