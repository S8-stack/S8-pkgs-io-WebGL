
import { NbMesh } from '../models/NbMesh.js';
import { NbProgram } from '/s8-ng-geo/nebulae/appearances/NbProgram.js';
import { NeObject } from '/s8-io-bohr/neon/NeObject.js';





/**
 * appearance
 */
export class NbAppearance extends NeObject {

	/**
	 * @type {NbProgram}
	 */
	program;

	/**
	 * @type {NbMesh[]}
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
	 * @param {NbMesh[]} models 
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

			/** @type {NbMesh} model */
			let model = this.models[i];

			if (model.GPU_isLoaded) {

				// bind model
				this.program.bindModel(view, model);

				// draw it!
				model.draw();
			}
		}
	}
}