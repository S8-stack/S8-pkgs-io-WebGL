
import { S8Object } from '/S8-api/S8Object.js';

import { SWGL_Model } from '/S8-pkgs-io-WebGL/scene/models/SWGL_Model.js';
import { SWGL_Program } from './SWGL_Program.js';



/**
 * appearance
 */
export class SWGL_Appearance extends S8Object {

	/**
	 * @type{WebGL2RenderingContext}
	 */
	gl;

	/**
	 * @type {SWGL_Program}
	 */
	program;

	/**
	 * @type {SWGL_Model[]}
	 */
	models;


	/**
	 * @type {boolean}
	 */
	GPU_isLoaded = false;

	/**
 * @type{Function[]} array of update functions
 */
	updates = new Array();

	/** @type{boolean} */
	hasUpdates = false;


	/**
	 * To be overridden...
	 * @param {*} id 
	 */
	constructor() {
		super();
	}


	/**
	 * 
	 * @param {SWGL_Model[]} models 
	 */
	S8_set_models(models) {
		this.models = models;

		if (this.models != null) {
			// if models are appended to an appearance, they MUST be flagged as rendered
			this.models.forEach(model => {
				model.WebGL_isRendered = true;
			});
		}
	}

	/**
	 * 
	 */
	S8_render() {
		this.GPU_initialize();
	}


	/**
 * @param {WebGL2RenderingContext} gl 
 */
	WebGL_relink(gl) {
		this.gl = gl;
		if (this.program) { this.program.WebGL_relink(gl); }
		let nModels = this.models.length;
		for (let i = 0; i < nModels; i++) { this.models[i].WebGL_relink(gl); }
	}



	/**
	 * 
	 */
	GPU_initialize() {
		if (!this.GPU_isLoaded) {

			// load resources
			let _this = this;
			this.loadResources(function () { _this.GPU_isLoaded = true; });
		}
	}


	/**
	 * Returns immediately (to be overridden)
	 * @param {Function} onLoaded 
	 */
	loadResources(onLoaded) {
		onLoaded();
	}



	pushUpdate(updateFunc) {
		this.updates.push(updateFunc);
		this.hasUpdates = true;
	}


	/**
	 * @param{WebGL2RenderingContext} gl
	 * @param {NbView} view
	 * 
	 */
	WebGL_render(view) {

		/* first run updates */
		let nModels = this.models.length;

		/** @type {SWGL_Model} model */
		let model;

		for (let i = 0; i < nModels; i++) {

			model = this.models[i];

			if (model.isReady) {

				/* model load it! */
				model.load();

				/* bind model */
				this.program.bindModel(view, model);

				/* draw it! */
				model.draw();
			}
		}
	}
}
