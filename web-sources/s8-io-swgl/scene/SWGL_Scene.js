

import { NeObject } from '/s8-io-bohr-neon/NeObject.js';


import { gl, SWGL_CONTEXT } from '/s8-io-swgl/swgl.js';


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
	 */
	initialize() {
		if (!this.isInitialized) {

			// initialize context
			SWGL_CONTEXT.initialize();

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



	/**
	 * 
	 */
	WebGL_render() {

		// unbind picking fbo if active
		//this.picking.unbind();

		// update view
		this.view.updateViewMatrix();

		this.environment.update();

		// render pipes
		let nPipes = this.pipes.length;
		for (let i = 0; i < nPipes; i++) {

			// run render pipe
			this.pipes[i].WebGL_render(this.environment, this.view);
		}
	}


	S8_dispose() {
	}
}

