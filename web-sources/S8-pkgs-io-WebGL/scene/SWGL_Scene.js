

import { NeObject } from '/S8-core-bohr-neon/NeObject.js';


import { SWGL_Environment } from './environment/SWGL_Environment.js';
import { SWGL_View } from "./view/SWGL_View.js";
import { SWGL_Pipe } from './pipes/SWGL_Pipe.js';



/**
 * 
 */
export class SWGL_Scene extends NeObject {


	/** 
	 * @type {SWGL_Pipe[]} the rendering pipes (performance-section) 
	 */
	pipes = new Array();

	/**
	 * @type {SWGL_Environment} the environment 
	 */
	environment = new SWGL_Environment();

	/** 
	 * @type {SWGL_View} the view 
	 * (Always readily available)
	 */
	view = null;


	isInitialized = false;


	constructor() {
		super();
	}



	activate() {

	}

	/**
	 * 
	 * @param {SWGL_Pipe[]} renderers 
	 */
	S8_set_pipes(renderers) {
		this.pipes = renderers;
	}


	/**
	 * 
	 * @param {SWGL_Environment} environment 
	 */
	S8_set_environment(environment) {
		this.environment = environment;
	}


	/**
	 * 
	 * @param {SWGL_View} view 
	 */
	S8_set_view(view) {
		this.view = view;
	}


	S8_render() {
		/* do nothing */
	}


	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 */
	initialize(gl) {
		if (!this.isInitialized) {

				//OpenGL initialization
			gl.clearStencil(128);
	
				/* Set-up canvas parameters */
				gl.enable(gl.DEPTH_TEST);
	
				/* enabled blending parameters */
	
				// Turn on rendering to alpha
				gl.colorMask(true, true, true, true);
				gl.enable(gl.BLEND);
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	

			// environment
			this.environment.view = this.view;

			this.isInitialized = true;
		}
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
	 * 
	 * @param {number} width 
	 * @param {number} height 
	 */
	resize(width, height){
		if(this.view != null){
			this.view.resize(width, height);
		}
	}



	
	/** @param {WebGL2RenderingContext} gl */
	WebGL_render(gl) {

		/* initialize if not already done */
		this.initialize(gl);

		/* load environment if necessary */
		this.environment.load(gl);

		// unbind picking fbo if active
		//this.picking.unbind();

		// update view
		this.view.updateViewMatrix();

		this.environment.update();

		// render pipes
		let nPipes = this.pipes.length;
		for (let i = 0; i < nPipes; i++) {

			// run render pipe
			this.pipes[i].WebGL_render(gl, this.environment, this.view);
		}
	}


	S8_dispose() {
	}
}

