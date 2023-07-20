
import { SWGL_View } from "/s8-io-swgl/scene/view/SWGL_View.js";

import * as V3 from "/s8-io-swgl/maths/SWGL_Vector3d.js";
import { SWGL_CONTEXT } from "/s8-io-swgl/swgl.js";


/* controls */
import { Rotate } from "/s8-io-swgl/control/Rotate.js";
import { Zoom } from "/s8-io-swgl/control/Zoom.js";
import { Highlight } from "/s8-io-swgl/control/Highlight.js";
import { Pick } from "/s8-io-swgl/control/Pick.js";
import { SWGL_Screen } from "/s8-io-swgl/render/SWGL_Screen.js";
import { S8 } from "/s8-io-bohr-atom/S8.js";










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
	 * @type{boolean} activate / deactivate the controller
	 */
	isActive = false;


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

		// retrieve view
		const view = this.getView();
		view.updateProjectionMatrix();
		view.updateViewMatrix();

		// set default mode
		this.mode = this.zoomMode;

		let _this = this;

		const n = this.controls.length;

		for (let i = 0; i < n; i++) {
			this.controls[i].link(this);
		}


		this.onMouseDownLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onMouseDown(event);
					i++;
				}
			}
		};
		SWGL_CONTEXT.canvasNode.addEventListener('mousedown', this.onMouseDownLambda, false);


		this.onMouseUpLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onMouseUp(event);
					i++;
				}
			}
		};
		document.addEventListener('mouseup', this.onMouseUpLambda, false);


		this.onMouseMoveLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onMouseMove(event);
					i++;
				}
			}
		};
		document.addEventListener('mousemove', this.onMouseMoveLambda, false);


		this.onMouseWheelLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onMouseWheel(event);
					i++;
				}
			}
		};
		document.addEventListener('mousewheel', this.onMouseWheelLambda, false);


		this.onKeyUpLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onKeyUp(event);
					i++;
				}
			}
		};
		document.addEventListener('keyup', this.onKeyUpLambda, false);


		this.onKeyDownLambda = function (event) {
			if (_this.isActive) {
				let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onKeyDown(event);
					i++;
				}
			}
		};
		document.addEventListener('keydown', this.onKeyDownLambda, false);


		this.onClickLambda = function (event) {
			if (!_this.isActive) { 
				_this.activate();
			};
			
			let isCaptured = false, i = 0;
				while (!isCaptured && i < n) {
					isCaptured = _this.controls[i].onClick(event);
					i++;
				}
			
		};
		document.addEventListener('click', this.onClickLambda, false);

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
		this.isActive = true;
		S8.branch.setFocusOn(this.screen);
	}


	deactivate() {
		this.isActive = false;
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
		SWGL_CONTEXT.canvasNode.removeEventListener('mousedown', this.onMouseDownLambda, false);
		document.removeEventListener('mouseup', this.onMouseUpLambda, false);
		document.removeEventListener('mousemove', this.onMouseMoveLambda, false);
		document.removeEventListener('mousewheel', this.onMouseWheelLambda, false);
		document.removeEventListener('keyup', this.onKeyUpLambda, false);
		document.removeEventListener('keydown', this.onKeyDownLambda, false);
	}
};


