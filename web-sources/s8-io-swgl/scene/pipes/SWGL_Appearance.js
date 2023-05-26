

import { SWGL_Model } from '/s8-io-swgl/scene/models/SWGL_Model.js';
import { SWGL_Program } from './SWGL_Program.js';
import { NeObject } from '/s8-io-bohr-neon/NeObject.js';



/**
 * appearance
 */
export class SWGL_Appearance extends NeObject {

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


	/**
	 * @param {NbView} view
	 * 
	 */
	WebGL_render(view) {
		let nModels = this.models.length;
		for (let i = 0; i < nModels; i++) {

			/** @type {SWGL_Model} model */
			let model = this.models[i];

			if (model.isReady) {

				// model load it!
				model.load();

				// bind model
				this.program.bindModel(view, model);

				// draw it!
				model.draw();
			}

		}
	}
}
