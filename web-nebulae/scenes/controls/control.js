
/**
 * CONTROLLER general philosophy
 * 
 * the controller is organizing the good orchestration of different sub-controller, each of the sub-controllers
 * being responsible for one specific task (zooming camera, highlighting objects, etc.).
 * The general underlying principle is that sub-controllers are sorted by priority. This notion of priority comes
 * from the feeling of "must be readily available" at any moment. 
 * 
 * It appears that this notion of "readiness" is exactly opposite to the complexity of the operation.
 * 
 * For instance: rotating camera is far less complex (and far more common) than inserting a new object in the scene.
 * From this observation, it follows that, although it seems obvious that rotating camera must be made available while 
 * inserting a new object in the scene, it does not seem appropriate to allow object insertion when a 
 * simple camera rotation has been initiated ("simple" = not in the context of a more complex action).
 * 
 * @param scene
 */
function WebGL_Controller(scene){

	this.scene = scene;

	// define camera
	this.camera = new WebGL_Camera(scene);

	// define modes
	this.modes = [
		new WebGL_RotateViewController(this.camera),
		new WebGL_ZoomViewController(this.camera),
		new WebGL_HighlightController(this.camera)];

	this.nModes = this.modes.length;

	this.camera.refresh();
};

WebGL_Controller.prototype = {

		start : function(){

			// set default mode
			this.mode = this.zoomMode;

			var that = this;


			this.onMouseDown = function(event) { 
				var isCaptured = false, i=0;
				while(!isCaptured && i<that.nModes){
					isCaptured = that.modes[i].onMouseDown(event);
					i++;
				}
			};
			canvas.addEventListener('mousedown', this.onMouseDown, false);


			this.onMouseUp = function(event) { 
				var isCaptured = false, i=0;
				while(!isCaptured && i<that.nModes){
					isCaptured = that.modes[i].onMouseUp(event);
					i++;
				}
			};
			document.addEventListener('mouseup', this.onMouseUp, false);


			this.onMouseMove = function(event) { 
				var isCaptured = false, i=0;
				while(!isCaptured && i<that.nModes){
					isCaptured = that.modes[i].onMouseMove(event);
					i++;
				}
			};
			document.addEventListener('mousemove', this.onMouseMove, false);


			this.onMouseWheel = function(event) { 
				var isCaptured = false, i=0;
				while(!isCaptured && i<that.nModes){
					isCaptured = that.modes[i].onMouseWheel(event);
					i++;
				}
			};
			document.addEventListener('mousewheel', this.onMouseWheel, false);


			this.onKeyUp = function(event) { 
				var isCaptured = false, i=0;
				while(!isCaptured && i<that.nModes){
					isCaptured = that.modes[i].onKeyUp(event);
					i++;
				}
			};
			document.addEventListener('keyup', this.onKeyUp, false);


			this.onKeyDown = function(event) { 
				var isCaptured = false, i=0;
				while(!isCaptured && i<that.nModes){
					isCaptured = that.modes[i].onKeyDown(event);
					i++;
				}
			};
			document.addEventListener('keydown', this.onKeyDown, false);
		},

		stop : function(){
			canvas.removeEventListener('mousedown', this.onMouseDown, false);
			document.removeEventListener('mouseup', this.onMouseUp, false);
			document.removeEventListener('mousemove', this.onMouseMove, false);
			document.removeEventListener('mousewheel', this.onMouseWheel, false);
			document.removeEventListener('keyup', this.onKeyUp, false);
			document.removeEventListener('keydown', this.onKeyDown, false);
		}
};



/**
 * basic mode for rotating view
 */
function WebGL_RotateViewController(camera) {
	this.camera = camera;
	this.mouseTrackballSensitity = 0.3;
	this.lastMouseX = 0.0;
	this.lastMouseY = 0.0;
	this.isMouseDown = false;
};

WebGL_RotateViewController.prototype = {

		isTakingover : function(isMouseDown, isShiftKeyPressed, isInsertEnabled, is){

		},

		/** on mouse move */
		onMouseDown : function(event){
			this.isMouseDown = true;
			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;
			return true; // taking over
		},

		onMouseUp : function(event){
			this.isMouseDown = false;
			return false; // not taking over
		},

		onMouseWheel : function(event){
			return false; // not taking over
		},

		onMouseMove : function(event) {
			if(this.isMouseDown){
				// TODO implement throttle her

				this.camera.phi -= (event.clientX - this.lastMouseX)*this.mouseTrackballSensitity;
				this.lastMouseX = event.clientX;
				this.camera.theta += (event.clientY - this.lastMouseY)*this.mouseTrackballSensitity;
				this.lastMouseY = event.clientY;
				if(this.camera.theta > 180.0){
					this.camera.theta = 180.0;
				}
				if(this.camera.theta < 1.0){
					this.camera.theta = 1.0;
				}

				//log.nodeValue = "phi="+this.phi.toFixed(2)+" theta="+this.theta.toFixed(2)+" r="+this.r.toFixed(2)+"\n";
				//log.nodeValue+= "x="+event.clientX+" y="+event.clientY+"\n";

				//this.updateView();

				this.camera.refresh();	
				return true;
			}
			else{
				return false;
			}
		},

		onKeyDown : function(event) { 
			return false; // nothing to do 
		},

		onKeyUp : function(event) { 
			return false; // nothing to do 
		}
};


/**
 * basic mode for zooming
 */
function WebGL_ZoomViewController(camera){
	this.camera = camera;
	this.mouseWheelSensitivity = 0.8*1e-3;
}

WebGL_ZoomViewController.prototype = {

		onMouseDown : function(event){
			return false;
		},

		onMouseUp : function(event){
			return false;
		},

		onMouseMove : function(event) { 
			return false; // nothing to do 
		},

		onMouseWheel : function(event) {
			this.camera.r += -this.camera.r*event.wheelDelta * this.mouseWheelSensitivity;
			if(this.camera.r < 0.2){
				this.camera.r = 0.2;
			}
			//this.updateView();
			this.camera.refresh();	
			return true;
		},

		onKeyDown : function(event) {
			return false;
		},

		onKeyUp : function(event) {
			return false;
		}
};


function WebGL_HighlightController(camera){
	this.camera = camera;
	this.acquiredHoveredObject = null;
}



WebGL_HighlightController.prototype = {

		onMouseDown : function(event){
			this.terminate(); // cleaning-up
			return false;
		},

		onMouseUp : function(event){
			this.terminate(); // cleaning-up
			return false;
		},

		onMouseMove : function(event) { 
			if(event.shiftKey){
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
				logNode.innerHTML = "Now hovering "+this.acquiredHoveredObject;
				return true;
			}
			else{
				this.terminate(); // cleaning-up
				return false;
			}
		},

		onMouseWheel : function(event) {
			this.terminate(); // cleaning-up
			return false;
		},

		onKeyDown : function(event) {
			this.terminate(); // cleaning-up
			return false;
		},

		onKeyUp : function(event) {
			this.terminate(); // cleaning-up
			return false;
		},
		
		terminate : function(event){
			if(this.acquiredHoveredObject!=null){
				this.acquiredHoveredObject.display(0);
				this.acquiredHoveredObject = null;
				scene.render();	
			}
		}
};