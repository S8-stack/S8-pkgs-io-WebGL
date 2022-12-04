

import { gl, SWGL_CONTEXT } from '/s8-io-swgl/swgl.js';

import { SWGL_Environment } from '/s8-io-swgl/environment/SWGL_Environment.js';
import { SWGL_View } from "/s8-io-swgl/view/SWGL_View.js";
import { StdViewController } from "../view/StdViewController.js";
import { SWGL_Renderer } from '/s8-io-swgl/appearances/SWGL_Renderer.js';
import { NeObject } from '/s8-io-bohr/neon/NeObject.js';


/**
 * 
 */
export class SWGL_Scene extends NeObject {

	/** 
	 * @type {SWGL_Renderer[]} the rendering pipes (performance-section) 
	 */
	renderers = new Array();

	/**
	 * @type {SWGL_Environment} the view 
	 */
	environment = new SWGL_Environment();


	/** 
	 * @type {SWGL_View} the view 
	 */
	view;


	/**
	 * @type {ViewController} the centralized controller
	 */
	controller = null;


	isRunning = false;

	isInitialized = false;

	/**
	 * @type {number} in [ms]
	 */
	t_then = 0;


	constructor() {
		super();

		this.fpsDisplay = document.querySelector("#fps-display");
	}



	activate() {

	}

	/**
	 * 
	 * @param {SWGL_Renderer[]} renderers 
	 */
	S8_set_renderers(renderers) {
		this.renderers = renderers;
	}


	/**
	 * 
	 * @param {SWGL_Environment} environment 
	 */
	S8_set_environment(environment) {
		this.environment = environment;
	}


	S8_render() {
		/* do nothing */
	}


	start() {
		if (!this.isRunning) {

			this.isRunning = true;

			SWGL_CONTEXT.initialize();



			// <initialize rendering>

			// </initialize rendering>

			this.totalRenderingTime = 0;
			this.nbRenderings = 0;

			// create picking module and link it
			//this.picking = new WebGL_PickingModule(this);

			/* <start> */

			// initialize view and bind scene to view
			this.view = new SWGL_View(this);

			// environment
			this.environment.view = this.view;


			// start controller
			this.controller = new StdViewController(this.view);
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
	 * [WebGL_Scene API method]
	 * clear scene by deleting all shapes
	 */
	clear() {

		// remove all instances, keep programs, styles and models
		this.shapeInstances.clear();

		// do a rendering pass to apply changes
		this.render();
	}


	/**
	 * @param {number} t_now render time in ms 
	 */
	WebGL_render(t_now) {

		// unbind picking fbo if active
		//this.picking.unbind();

		// update view
		this.view.updateViewMatrix();

		this.environment.update();


		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);


		// render pipes
		let nPipes = this.renderers.length;
		for (let i = 0; i < nPipes; i++) {
			this.renderers[i].WebGL_render(this.environment, this.view);
		}


		// Recommended pattern for frame animation
		let _this = this;
		window.requestAnimationFrame(function (t) { _this.WebGL_render(t); });


		// FPS computations

	
		t_now *= 0.001; // convert to seconds
		let deltaTime = t_now - this.t_then;  // compute time since last frame
		this.t_then = t_now; // remember time for next frame
		let fps = 1 / deltaTime; // compute frames per second
		this.fpsDisplay.textContent = fps.toFixed(1); // update fps display
	}

	S8_dispose() {
	}
}

