
import { NeObject } from '/S8-core-bohr-neon/NeObject.js';

import { gl, SWGL_CONTEXT } from '/S8-pkgs-io-WebGL/swgl.js';

import { SWGL_Picker } from '/S8-pkgs-io-WebGL/render/SWGL_Picker.js';
import { StdViewController } from '/S8-pkgs-io-WebGL/control/StdViewController.js';
import { SWGL_Scene } from '/S8-pkgs-io-WebGL/scene/SWGL_Scene.js';


/**
 * 
 */
export class SWGL_Screen extends NeObject {


	/**
	 * @type {SWGL_Scene}
	 */
	scene = null;


	/**
	 * @type {SWGL_Scene}
	 */
	pickingScene = null;



	/**
	 * @type {SWGL_Picker}
	 */
	picker = new SWGL_Picker();


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
		this.fpsDisplay = document.querySelector("#fps-display")
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
			this.controller = new StdViewController();
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
	setPickingCallback(callback) {
		this.picking.callback = callback;

		// do a rendering pass to apply changes
		this.render();
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
		this.pickingScene = scene;
		this.pickingScene.initialize();
	}


	/**
	 * 
	 * @param {number[]} color 
	 */
	S8_set_clearColor(color) {
		this.clearColor = new Array(4);
		for(let i = 0; i<4; i++) { this.clearColor[i] = color[i] / 255.0; }
	}


	S8_unfocus(){
		this.controller.deactivate();
	}


	S8_dispose() {
		if (this.scene) { this.scene.S8_dispose(); }
	}

}

