


import { StdViewController } from '/s8-io-swgl/view/StdViewController.js';
import { SWGL_Scene } from './SWGL_Scene.js';
import { NeObject } from '/s8-io-bohr/neon/NeObject.js';
import { gl } from '/s8-io-swgl/swgl.js';


/**
 * 
 */
export class SWGL_Screen extends NeObject {


	/**
	 * @type {SWGL_Scene}
	 */
	scene;


	/**
	 * @type {ViewController} the centralized controller
	 */
	controller = null;


	isRunning = false;


	/**
	 * @type {number} in [ms]
	 */
	t_then = 0;


	constructor(){
		super();
		this.fpsDisplay = document.querySelector("#fps-display");
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
			this.controller = new StdViewController(this.scene.view);
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


	S8_render() { /* nothing */ }

	/**
	 * @param {number} t_now render time in ms 
	 */
	WebGL_render(t_now) {

		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

		// render pipes
		this.scene.WebGL_render();

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



	/**
	 * 
	 * @param {SWGL_Scene} scene 
	 */
	S8_set_scene(scene){
		this.scene = scene;
		this.scene.initialize();
	}



	S8_dispose(){
		if(this.scene){ this.scene.S8_dispose(); }
	}
	
}

