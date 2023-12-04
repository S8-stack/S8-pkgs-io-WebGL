



/**
 * Root Build Controller
 * @returns
 */
function SceneHandlingBdControlMode(scene, view){
	
	this.scene = scene;
	this.view = view;

	this.mouseDown = false;
	this.lastMouseX = null;
	this.lastMouseY = null;

	this.mouseTrackballSensitity = 0.3;
	this.mouseWheelSensitivity = 0.8*1e-3;
	this.newRotationMatrix = new WebGL_Matrix4();
	
	// Eye
	this.eyeVector = new MathVector3d();
	this.eyePosition = view.eyePosition;
	this.eyeTarget = view.eyeTarget;
	
	// setup eye
	this.phi = 135;
	this.theta = 135;
	this.r = 20;
	this.eyeVector.eyeVector(20, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);
	this.eyeTarget_Speed = new MathVector3d(0.0, 0.0, 0.0);
	this.eyeTarget_Acceleration = new MathVector3d(0.0, 0.0, 0.0);
	
	this.acquiredHoveredObject = null;
}


// DEBUG
var hc = 0;


WebGL_MouseControl.prototype = {
		
		start : function(){

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
		},

		/* Animation */

		/** called on mouse down @param event */
		handleMouseDown : function(event){
			this.mouseDown = true;
			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;
			this.refresh();
		},


		/** called on mouse up @param event */
		handleMouseUp : function(event){
			this.mouseDown = false;
			this.refresh();
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

				this.refresh();
			}
			else{
				var currentHoveredObject = scene.picking.pick(event.clientX, event.clientY);
				if(currentHoveredObject!=this.acquiredHoveredObject){
					var isRenderingRequired = false;
					if(this.acquiredHoveredObject!=null){
						this.acquiredHoveredObject.display(0);
						isRenderingRequired = true;
					}
					this.acquiredHoveredObject = currentHoveredObject;
					if(this.acquiredHoveredObject!=null){
						this.acquiredHoveredObject.display(1);
						isRenderingRequired = true;
					}
					
					if(isRenderingRequired){
						scene.render();	
					}
				}
				logNode.innerHTML = "Now hovering "+this.acquiredHoveredObject+ " ["+hc+"]";
				hc++;
			}
		},
		
		/** called on mouse move @param event */
		handleMouseMoveEnd : function(event) {
			this.refresh();
		},

		handleMouseWheel : function(event) {
			this.r += -this.r*event.wheelDelta * this.mouseWheelSensitivity;
			if(this.r < 1.0){
				this.r = 1.0;
			}
			//this.updateView();
			this.refresh();
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
			this.refresh();
		},

		handleKeyUp : function(event) {
			this.eyeTarget_Acceleration.x = 0;
			this.eyeTarget_Acceleration.y = 0;
			this.eyeTarget_Acceleration.z = 0;

			this.eyeTarget_Speed.x = 0;
			this.eyeTarget_Speed.y = 0;
			this.eyeTarget_Speed.z = 0;

			this.refresh();
		},


		/**
		 * Normalize vector 
		 */
		refresh : function(){
			
			// compute new eye target position
			this.eyeTarget.add(this.eyeTarget_Speed, this.eyeTarget);
			this.eyeTarget_Speed.add(this.eyeTarget_Acceleration, this.eyeTarget_Speed);

			// compute new eye position
			this.eyeVector.eyeVector(this.r, this.phi*Math.PI/180.0, this.theta*Math.PI/180.0);
			this.eyeVector.add(this.eyeTarget, this.eyePosition);
			
			// update view
			this.view.update();
			
			// redraw
			this.scene.render();
		}
};
