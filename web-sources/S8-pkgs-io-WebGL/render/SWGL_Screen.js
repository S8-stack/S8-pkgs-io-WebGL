

import { S8Object } from '/S8-api/S8Object.js';

import { gl, SWGL_CONTEXT } from '/S8-pkgs-io-WebGL/swgl.js';

import { StdViewController } from '/S8-pkgs-io-WebGL/control/StdViewController.js';
import { SWGL_Scene } from '/S8-pkgs-io-WebGL/scene/SWGL_Scene.js';
import { StdPicker } from './StdPicker.js';


/**
 * screen
 */
export class SWGL_Screen extends S8Object {


	/**
	 * @type {SWGL_Scene}
	 */
	scene = null;


	/**
	 * @type {StdPicker}
	 */
	picker;


	/**
	 * @type {StdViewController} the centralized controller
	 */
	controller = null;


	isRunning = false;


	/**
	 * @type {number} in [ms]
	 */
	t_then = 0;



	isInitialized = false;


	/** @type {Function} */
	sizeListener;

	/** @type {number[]} */
	clearColor = [1.0, 1.0, 1.0, 1.0];

	constructor() {
		super();
		this.fpsDisplay = document.querySelector("#fps-display");

		/* initialize controller */
		this.controller = new StdViewController();

		this.picker = new StdPicker(this);
	}



	S8_render() {
		if (this.scene != null && this.controller != null) {
			/* re-attach view (in case has been changed) */
			this.controller.link(this);
		}
		

		// update
		if (!this.isInitialized) {
			/* listen screen size */
			let _this = this;
			this.sizeListener = function (width, height) { _this.resize(width, height); };
			SWGL_CONTEXT.appendSizeListener(this.sizeListener);
			this.isInitialized = true;
		}
	}


	start() {
		if (!this.isRunning) {

			this.isRunning = true;

			this.totalRenderingTime = 0;
			this.nbRenderings = 0;

			this.scene.initialize();

			// <initialize rendering>

			// </initialize rendering>


			// create picking module and link it
			//this.picking = new WebGL_PickingModule(this);

			/* <start> */
			// start controller
			this.controller.link(this);
			this.controller.start();

			// render
			let _this = this;
			window.requestAnimationFrame(function (t) { _this.WebGL_render(t); });
			/* </start> */
		}
	}

	/**
		* [WebGL_Scene API method]
		* setPickingCallback allows to specify a behaviour if the event of a picking click.
		* The shape id is passed to the callback function when a picking click occurs.
		*/
	setOnPickedCallback(callback) {
		this.picker.onPickedCallback = callback;
	}



	/**
	 * 
	 * @param {number} width 
	 * @param {number} height 
	 */
	resize(width, height) {
		if (this.scene != null) {
			this.scene.resize(width, height);
		}

		if (this.pickingScene != null) {
			this.pickingScene.resize(width, height);
		}


		// resize picker
		this.picker.resize(width, height);
	}



	/**
	 * @param {number} t_now render time in ms 
	 */
	WebGL_render(t_now) {

		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

		// render pipes
		this.scene.WebGL_render();

		// Recommended pattern for frame animation
		let _this = this;
		window.requestAnimationFrame(function (t) { _this.WebGL_render(t); });


		// FPS computations
		/*
		t_now *= 0.001; // convert to seconds
		let deltaTime = t_now - this.t_then;  // compute time since last frame
		this.t_then = t_now; // remember time for next frame
		let fps = 1 / deltaTime; // compute frames per second
		this.fpsDisplay.textContent = fps.toFixed(1); // update fps display
		*/
	}



	/**
	 * 
	 * @param {SWGL_Scene} scene 
	 */
	S8_set_scene(scene) {
		this.scene = scene;
		this.scene.initialize();
	}

	/**
	 * 
	 * @param {SWGL_Scene} scene 
	 */
	S8_set_pickingScene(scene) {
		this.picker.setScene(scene);
	}


	/**
	 * 
	 * @param {number[]} color 
	 */
	S8_set_clearColor(color) {
		this.clearColor = new Array(4);
		for(let i = 0; i<4; i++) { this.clearColor[i] = color[i] / 255.0; }
	}

	/**
	 * 
	 * @param {number[]} params 
	 */
	S8_set_eyeVector(params){
		this.controller.setEyeVector(
			params[0], /* r */
			params[1], /* theta */
			params[2] /* phi */
		)
	}


	S8_unfocus(){
		this.controller.deactivate();
	}


	S8_dispose() {
		if (this.scene) { this.scene.S8_dispose(); }
	}

}

