

import { S8 } from "/S8-api/S8Context.js";

import { SWGL_View } from "/S8-pkgs-io-WebGL/scene/view/SWGL_View.js";

import * as V3 from "/S8-pkgs-io-WebGL/maths/SWGL_Vector3d.js";
import { SWGL_CONTEXT } from "/S8-pkgs-io-WebGL/swgl.js";


/* controls */
import { SWGL_Screen } from "/S8-pkgs-io-WebGL/render/SWGL_Screen.js";
import { StdPicker } from "/S8-pkgs-io-WebGL/render/StdPicker.js";




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



const DEG_to_RAD = Math.PI / 180.0;

/**
 * 
 */
export class StdViewController {


	/** @type {SWGL_Screen} screen (Bound by screen) */
	screen;

	/** @type {number} r distance [m] of view vector */
	r = 20;

	/** @type {number} phi angle [degree] of view vector */
	phi = 135;

	/** @type {number} theta angle [degree] of view vector */
	theta = 135;

	/** @type {number} min radius */
	SETTINGS_min_approach_r = 0.2;



	/**
	 * @type{Control[]}
	 */
	controls;


	/**
	 * @type{boolean} activate / deactivate the controller
	 */
	isActive = false;



	/**
	 * 
	 * @param {Function} index 
	 */
	onPickFaceCallback = function (index) { console.log("Element #" + index + " has been picked."); };


	/**
	 * 
	 * @param {Function} index 
	 */
	onHoverFaceCallback = function (index) { console.log("Element #" + index + " has been hovered."); };



	/**
	 * 
	 * @param {SWGL_View} view 
	 */
	constructor() {
	}



	/**
	 * 
	 * @param {SWGL_Screen} screen 
	 */
	link(screen) {
		this.screen = screen;
	}


	/**
	 * 
	 * @param {NbView} view 
	 */
	start() {


		// define modes
		this.controls = [
			new Rotate(), new Zoom(), new Highlight(), new Pick()
		];

		/* link */
		const _this = this;
		const n = this.controls.length;
		for (let i = 0; i < n; i++) { this.controls[i].link(this); }


		// retrieve view
		const view = this.getView();
		view.updateProjectionMatrix();
		view.updateViewMatrix();

		// set default mode
		this.mode = this.zoomMode;

		const targetNode = SWGL_CONTEXT.canvasNode;


		/** @param{Event} event */
		this.onMouseDownLambda = function (event) {
			_this.activate();
			let isCaptured = false, i = 0;
			while (!isCaptured && i < n) {
				isCaptured = _this.controls[i].onMouseDown(event);
				i++;
			}
			event.stopPropagation();
		};
		targetNode.addEventListener('mousedown', this.onMouseDownLambda, false);

		/** @param{Event} event */
		this.onMouseUpLambda = function (event) {
			_this.activate();
			let isCaptured = false, i = 0;
			while (!isCaptured && i < n) {
				isCaptured = _this.controls[i].onMouseUp(event);
				i++;
			}

			event.stopPropagation();
		};
		targetNode.addEventListener('mouseup', this.onMouseUpLambda, false);

		/** @param{Event} event */
		this.onMouseMoveLambda = function (event) {
			_this.activate();
			let isCaptured = false, i = 0;
			while (!isCaptured && i < n) {
				isCaptured = _this.controls[i].onMouseMove(event);
				i++;
			}

			event.stopPropagation();
		};
		targetNode.addEventListener('mousemove', this.onMouseMoveLambda, false);

		/** @param{Event} event */
		this.onMouseWheelLambda = function (event) {
			if (event.ctrlKey) {
				_this.activate();
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onMouseWheel(event);
					i++;
				}

				event.preventDefault();
				event.stopPropagation();
				return false;
			}
		};
		/* option {passive: false} on the event listener. 
		This is actually because we have to tell browsers that, eventually, 
		we might call preventDefault and cancel the default behavior. */
		targetNode.addEventListener('wheel', this.onMouseWheelLambda, { passive: false });

		/** @param{Event} event */
		this.onKeyUpLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onKeyUp(event);
					i++;
				}
			}
			event.stopPropagation();
		};
		targetNode.addEventListener('keyup', this.onKeyUpLambda, false);


		/** @param{Event} event */
		this.onKeyDownLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onKeyDown(event);
					i++;
				}
			}
			event.stopPropagation();
		};
		targetNode.addEventListener('keydown', this.onKeyDownLambda, false);

		/** @param{Event} event */
		this.onClickLambda = function (event) {
			_this.activate();

			let isCaptured = false, i = 0;
			while (!isCaptured && i < n) {
				isCaptured = _this.controls[i].onClick(event);
				i++;
			}
			event.stopPropagation();
		};
		targetNode.addEventListener('click', this.onClickLambda, false);


		/*
		targetNode.addEventListener('scroll', function(event){
			event.stopPropagation();
		}, false);
		*/

		/*
		targetNode.addEventListener('DOMMouseScroll', function(event){
			event.stopPropagation();
		}, false);
		*/






		// start refresh
		this.refresh();
	}

	/**
	 * 
	 * @returns {SWGL_View}
	 */
	getView() {
		return this.screen.scene.view;
	}


	activate() {
		if (!this.isActive) {
			this.isActive = true;
			S8.page.setFocusOn(this.screen);
		}
	}


	deactivate() {
		this.isActive = false;
	}



	setSphericEyeVector(r, theta, phi) {
		this.r = r;
		this.theta = theta;
		this.phi = phi;
	}


	refresh() {

		// retrieve view
		const view = this.getView();

		// compute new eye position
		V3.eyeVector(this.r, this.phi * DEG_to_RAD, this.theta * DEG_to_RAD, view.eyeVector);
		view.updateViewMatrix();

		//this.scene.WebGL_render();
	}


	stop() {
		const targetNode = SWGL_CONTEXT.canvasNode;
		targetNode.removeEventListener('mousedown', this.onMouseDownLambda, false);
		targetNode.removeEventListener('mouseup', this.onMouseUpLambda, false);
		targetNode.removeEventListener('mousemove', this.onMouseMoveLambda, false);
		targetNode.removeEventListener('mousewheel', this.onMouseWheelLambda, false);
		targetNode.removeEventListener('keyup', this.onKeyUpLambda, false);
		targetNode.removeEventListener('keydown', this.onKeyDownLambda, false);
	}
};





/**
 * 
 */
export class Control {

	/** @type { StdViewController } the view attached to this control */
	controller;


	constructor() {
	}


	link(controller) { this.controller = controller; }

	onMouseDown() {
		/* to be overridden */
		return false;
	}

	onMouseUp() {
		/* to be overridden */
		return false;
	}

	onMouseMove(event) {
		/* to be overridden */
		return false;
	}

	onMouseWheel() {
		/* to be overridden */
		return false;
	}

	onKeyDown() {
		/* to be overridden */
		return false;
	}

	onKeyUp() {
		/* to be overridden */
		return false;
	}

	onClick() {
		/* to be overridden */
		return false;
	}

}



export class Pick extends Control {

	isClickEngaged = false;

	constructor() { super(); }


	onMouseDown(event) {
		this.isClickEngaged = true;
		return true; // let flow
	}

	onMouseMove(event) {

		/** @type{StdPicker} */
		const picker = this.controller.screen.picker;


		const x = event.clientX;
		const y = event.clientY;

		/** picker has its own callback*/
		const index = picker.pick(x, y);

		this.controller.onHoverFaceCallback(index);


		this.isClickEngaged = false;
		return false; // let flow
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseUp(event) {
		if (this.isClickEngaged) {
			this.isClickEngaged = false; /* clear*/


			const x = event.clientX;
			const y = event.clientY;

			/** picker has its own callback*/
			const index = this.controller.screen.picker.pick(x, y);
			this.controller.onPickFaceCallback(index);

			return true; // captured
		}
		else {
			return false; // not taking over
		}
	}

	onClick() {
		return false;
	}
}





/**
 * 
 */
export class Rotate extends Control {

	/** @type {number} mouseTrackballSensitity */
	mouseTrackballSensitity = 0.3;

	/** @type {number} lastMouseX */
	lastMouseX = 0.0;

	/** @type {number} lastMouseY */
	lastMouseY = 0.0;

	/** @type {boolean} isMouseDown */
	isMouseDown = false;

	constructor() { super(); }

	/**
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseDown(event) {
		this.isMouseDown = true;
		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
		return false; /* let flow */
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseUp() {
		this.isMouseDown = false;
		return false; // not taking over
	}

	/**
	 * 
	 * @param {*} event
	 * @returns {boolean} is taking over
	 */
	onMouseWheel() {
		return false; // not taking over
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseMove(event) {
		if (this.isMouseDown) {
			// TODO implement throttle her

			this.controller.phi -= (event.clientX - this.lastMouseX) * this.mouseTrackballSensitity;
			this.lastMouseX = event.clientX;
			this.controller.theta -= (event.clientY - this.lastMouseY) * this.mouseTrackballSensitity;
			this.lastMouseY = event.clientY;
			if (this.controller.theta > 180.0) {
				this.controller.theta = 180.0;
			}
			if (this.controller.theta < 1.0) {
				this.controller.theta = 1.0;
			}

			//log.nodeValue = "phi="+this.phi.toFixed(2)+" theta="+this.theta.toFixed(2)+" r="+this.r.toFixed(2)+"\n";
			//log.nodeValue+= "x="+event.clientX+" y="+event.clientY+"\n";

			//this.updateView();

			this.controller.screen.picker.clear();

			this.controller.refresh();


		}
		return false;
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns 
	 */
	onKeyDown(event) {
		return false; // nothing to do 
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns 
	 */
	onKeyUp(event) {
		return false; // nothing to do 
	}
}



export class Highlight extends Control {

	acquiredHoveredObject = null;


	constructor() {
		super();
	}

	onMouseDown() {
		this.terminate(); // cleaning-up
		return false;
	}

	onMouseUp() {
		this.terminate(); // cleaning-up
		return false;
	}

	onMouseMove(event) {
		/*
		if (event.shiftKey) {
		   
			var currentHoveredObject = scene.picking.pick(event.clientX, event.clientY);
			if (currentHoveredObject != this.acquiredHoveredObject) {
				var isRenderingRequired = false;
				if (this.acquiredHoveredObject != null) {
					this.acquiredHoveredObject.display(0);
					isRenderingRequired = true;
				}
				this.acquiredHoveredObject = currentHoveredObject;
				if (this.acquiredHoveredObject != null) {
					this.acquiredHoveredObject.display(1);
					isRenderingRequired = true;
				}

				if (isRenderingRequired) {
					scene.render();
				}
			}
			logNode.innerHTML = "Now hovering " + this.acquiredHoveredObject;
			return true;
		}
		else {
			this.terminate(); // cleaning-up
			return false;
		}
		*/
		return false;
	}

	onMouseWheel() {
		this.terminate(); // cleaning-up
		return false;
	}

	onKeyDown() {
		this.terminate(); // cleaning-up
		return false;
	}

	onKeyUp() {
		this.terminate(); // cleaning-up
		return false;
	}

	terminate() {
		if (this.acquiredHoveredObject != null) {
			this.acquiredHoveredObject.display(0);
			this.acquiredHoveredObject = null;
			this.controller.refresh();
		}
	}
}




/**
 * basic mode for zooming
 */
export class Zoom extends Control {

	/** @type {number} mouse wheel sensitivity */
	mouseWheelSensitivity = 0.8 * 1e-3;

	constructor() { super(); }

	onMouseDown() { return false; }
	onMouseUp() { return false; }
	onMouseMove() { return false; /* nothing to do*/ }

	onMouseWheel(event) {
		this.controller.r += -this.controller.r * event.wheelDelta * this.mouseWheelSensitivity;
		if (this.controller.r < this.controller.SETTINGS_min_approach_r) {
			this.controller.r = this.controller.SETTINGS_min_approach_r;
		}
		//this.updateView();

		this.controller.screen.picker.clear();

		this.controller.refresh();

		return true;
	}

	onKeyDown() { return false; }
	onKeyUp() { return false; }
};