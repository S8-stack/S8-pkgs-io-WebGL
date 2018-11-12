

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
	this.eyePosition = new MathVector3d(0.0, 0.0, 0.0);
	this.phi = 135;
	this.theta = 135;
	this.r = 20;
	this.eyePosition.eyeVector(20, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);

	this.eyeTarget = new MathVector3d(0.0, 0.0, 0.0);
	this.eyeTarget_Speed = new MathVector3d(0.0, 0.0, 0.0);
	this.eyeTarget_Acceleration = new MathVector3d(0.0, 0.0, 0.0);
	
	// Projection matrix
	this.matrix_Projection = new WebGL_Matrix4();
	this.matrix_Projection.perspectiveProjection(45, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);
	
	// View matrix 
	this.matrix_View = new WebGL_Matrix4();
	this.matrix_View.lookAt(this.eyePosition, this.eyeTarget, new MathVector3d(0.0, 0.0, 1.0));

	// Projection * View Matrix
	this.matrix_ProjectionView = new WebGL_Matrix4();
	this.matrix_ProjectionView.multiply(this.matrix_Projection, this.matrix_View);

	
	var that = this;
	
	//register event listener to take control of the canvas
	canvas.addEventListener('mousedown', function(event) { that.handleMouseDown(event);}, false);
	document.addEventListener('mousemove', function(event){ that.handleMouseMove(event);}, false);
	document.addEventListener('mousemoveend', function(event){ that.handleMouseMoveEnd(event);}, false);

	//to allow mouse movement ending outside of the canvas
	document.addEventListener('mouseup', function(event) { that.handleMouseUp(event);}, false);
	document.addEventListener('mousewheel', function(event) { that.handleMouseWheel(event);}, false);

	document.addEventListener('keyup', function(event) { that.handleKeyUp(event);}, false);
	document.addEventListener('keydown', function(event) { that.handleKeyDown(event);}, false);
}


WebGL_View.prototype = {

		/* Animation */

		/** called on mouse down @param event */
		handleMouseDown : function(event){
			this.mouseDown = true;
			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;

			this.scene.render(0);
		},


		/** called on mouse up @param event */
		handleMouseUp : function(event){
			this.mouseDown = false;

			this.scene.render(0);
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

				this.scene.render(1);
			}
		},
		
		/** called on mouse move @param event */
		handleMouseMoveEnd : function(event) {
			this.scene.render(0);
		},

		handleMouseWheel : function(event) {
			this.r += -this.r*event.wheelDelta * this.mouseWheelSensitivity;
			if(this.r < 1.0){
				this.r = 1.0;
			}
			//this.updateView();

			this.scene.render(1);
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

			this.scene.render(1);
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
			this.eyeTarget.add(this.eyeTarget_Speed, this.eyeTarget);
			this.eyeTarget_Speed.add(this.eyeTarget_Acceleration, this.eyeTarget_Speed);

			// update view matrices
			this.eyePosition.eyeVector(this.r, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);
			this.eyePosition.add(this.eyeTarget, this.eyePosition);
			
			this.matrix_View.lookAt(this.eyePosition, this.eyeTarget, new MathVector3d(0,0,1));
			this.matrix_ProjectionView.multiply(this.matrix_Projection, this.matrix_View);
		}
};




/** Scene */
function WebGL_MatrixStack(view){
	
	// keep pointer
	this.matrix_View = view.matrix_View;

	// view model matrix
	this.matrix_ViewModel = new WebGL_Matrix4();

	// keep pointer
	this.matrix_ProjectionView = view.matrix_ProjectionView;

	// projection view matrix
	this.matrix_ProjectionViewModel = new WebGL_Matrix4();
	
	// normal matrix (for shader rendering of normals)
	this.matrix_Normal = new WebGL_Matrix3();
	
	// model matrix
	this.matrix_Model = new WebGL_Matrix4();
	
}

WebGL_MatrixStack.prototype = {
		
		setModel : function(modelAffine){
			// update model
			this.matrix_Model.setAffine(modelAffine);
			
			// re-compute everything...
			this.matrix_ProjectionViewModel.multiply(this.matrix_ProjectionView, this.matrix_Model);
			this.matrix_ViewModel.multiply(this.matrix_View, this.matrix_Model);
			this.matrix_Normal.transposeInverse4(this.matrix_ViewModel);
		}
};



