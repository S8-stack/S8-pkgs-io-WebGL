

import { gl, NbContext } from '../nebulae.js';

import { NbEnvironment } from '../environment/NbEnvironment.js';
import { NbView } from "../view/NbView.js";
import { StdNbViewController } from "../view/StdNbViewController.js";
import { NbRenderer } from '../appearances/NbRenderer.js';
import { NeObject } from '/s8-io-bohr/neon/NeObject.js';


/**
 * 
 */
export class NbScene extends NeObject {

	/** 
	 * @type {NbRenderer[]} the rendering pipes (performance-section) 
	 */
	renderers = new Array();

	/**
	 * @type {NbEnvironment} the view 
	 */
	environment = new NbEnvironment();


	/** 
	 * @type {NbView} the view 
	 */
	view;


	/**
	 * @type {NbViewController} the centralized controller
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
	 * @param {NbRenderer[]} renderers 
	 */
	S8_set_renderers(renderers) {
		this.renderers = renderers;
	}


	/**
	 * 
	 * @param {NbEnvironment} environment 
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

			NbContext.initialize();



			// <initialize rendering>

			// </initialize rendering>

			this.totalRenderingTime = 0;
			this.nbRenderings = 0;

			// create picking module and link it
			//this.picking = new WebGL_PickingModule(this);

			/* <start> */

			// initialize view and bind scene to view
			this.view = new NbView(this);

			// environment
			this.environment.view = this.view;


			// start controller
			this.controller = new StdNbViewController(this.view);
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

