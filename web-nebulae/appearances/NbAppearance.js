
import { S8Orbital } from '../../s8/S8.js';
import { NbPrograms } from './NbProgram.js';


/**
 * appearance
 */
export class NbAppearance extends S8Orbital {

	/**
	 * To be overridden...
	 * @param {*} id 
	 */
	constructor(id, programId) {
        super(id);

		// auto-bind to program
		this.program = NbPrograms.get(programId);

		this.models = [];
	}


	/**
	 * To be overridden
	 * @param {*} code 
	 * @param {*} value 
	 */
	BOHR_set(code, value) {
		switch (code) {
			case 0x02: this.name = value; break;
			default : throw "Unsupported code: "+code;
		}
	}


	/**
	 * 
	 */
	BOHR_render() {
		// render...
	}


	setProgram(programPathname){
		
	}


	/**
	 * 
	 * @param {Array} models 
	 */
	setModels(models){
		this.models = models;
	}


	/**
	 * 
	 * @param {NbView} view 
	 * @param {NbProgram} program 
	 */
	render(view, program){
		let nModels = this.models.length;
		for(let i=0; i<nModels; i++){
	
			/** @type {NbMesh} model */ 
			let model = this.models[i];

			// bind model
			program.bindModel(view, model);

			// draw it!
			model.draw();
		}
	}
}