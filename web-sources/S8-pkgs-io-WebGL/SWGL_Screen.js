

import { S8Object } from '/S8-api/S8Object.js';

import { GL } from '/S8-pkgs-io-WebGL/swgl.js';

import { StdViewController } from '/S8-pkgs-io-WebGL/control/StdViewController.js';
import { SWGL_Scene } from '/S8-pkgs-io-WebGL/scene/SWGL_Scene.js';
import { StdPicker } from './render/StdPicker.js';


/**
 * screen
 */
export class SWGL_Screen extends S8Object {


	/** @type {HTMLCanvasElement} */
	canvasNode;

	/** @type{WebGL2RenderingContext} */
	gl;

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



	/**
	 * @type {Set<Function>}
	 */
	sizeListeners = new Set();

	constructor() {
		super();


		this.canvasNode = document.createElement("canvas");

		try {
			/**
			 * {}
			 */
			this.gl = this.canvasNode.getContext("webgl2", {
				stencil: true,
				alpha: true,
				premultipliedAlpha: false  // Ask for non-premultiplied alpha 
			});

			/* Initialize with default HD params, resized later with actual parameters */
			this.gl.viewport(0, 0, 1920, 1080);

			/*
			var ext = gl.getExtension("OES_element_index_uint");
			if(ext==null){
				alert("Do not support OES UINT");
			}
			 */

		} catch (e) {
			alert("Could not initialise WebGL, sorry :-(" + e);
		}


		this.fpsDisplay = document.querySelector("#fps-display");

		/* initialize controller */
		this.controller = new StdViewController(this.canvasNode);

		/* picker */
		this.picker = new StdPicker(this.gl);
	}



	S8_render() {
		if (this.scene != null && this.controller != null) {
			/* re-attach view (in case has been changed) */
			this.controller.link(this);
		}
		

		// update
		/*
		if (!this.isInitialized) {
			// listen screen size 
			let _this = this;
			this.sizeListener = function (width, height) { _this.resize(width, height); };
			SWGL_CONTEXT.appendSizeListener(this.sizeListener);
			this.isInitialized = true;
		}
		*/
	}


	start() {
		if (!this.isRunning) {

			this.isRunning = true;

			this.totalRenderingTime = 0;
			this.nbRenderings = 0;

			this.scene.initialize(this.gl);

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
		this.picker.onPickFaceCallback = callback;
	}




	/**
	 * @param {number} t_now render time in ms 
	 */
	WebGL_render(t_now) {

		const gl = this.gl;

		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
		gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);

		// render pipes
		this.scene.WebGL_render(gl);

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
	S8_set_clearColor_RGBA_UInt8(color) {
		this.clearColor = new Array(4);
		for(let i = 0; i<4; i++) { this.clearColor[i] = color[i] / 255.0; }
	}

	/**
	 * 
	 * @param {number[]} coordinates 
	 */
	S8_set_sphericEyeVector(coordinates){
		this.controller.setSphericEyeVector(
			coordinates[0], /* r */
			coordinates[1], /* theta */
			coordinates[2] /* phi */
		);
		this.WebGL_render(0);
	}


	S8_unfocus(){
		this.controller.deactivate();
	}


	S8_dispose() {
		if (this.scene) { this.scene.S8_dispose(); }
	}



	/**
	 * 
	 */
	static VIEWPORT_OVERSAMPLING_FACTOR = 1.4;


	/**
	 * 
	 * @param {number} width 
	 * @param {number} height 
	 */
	resize(width, height) {


		/* device pixel ratio */
		let pixelRatio = window.devicePixelRatio || SWGL_Screen.VIEWPORT_OVERSAMPLING_FACTOR;

		// resize canavs drawing buffer
		let drawingBufferWidth = Math.round(pixelRatio * width);
		let drawingBufferHeight = Math.round(pixelRatio * height);

		// resize canvas
		this.canvasNode.width = drawingBufferWidth;
		this.canvasNode.height = drawingBufferHeight;

		// and set viewport accordingly
		this.gl.viewport(0, 0, drawingBufferWidth, drawingBufferHeight);
      
	  if (this.isVerbose) {
		  console.log(`WebGL Canvas dimensions are now: width = ${this.canvasWidth}, height = ${this.canvasHeight}`);
	  }

		if (this.scene != null) { this.scene.resize(width, height); }

		// resize picker
		this.picker.resize(width, height);
	}


}

