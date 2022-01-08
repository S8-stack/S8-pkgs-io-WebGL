
import { S8Orbital } from '../../s8/S8.js';

import { NbView } from '../scenes/view/NbView.js';
import { NbAppearance, NbProgram, NbPrograms } from './NbProgram.js';



export class NbRenderingPipe extends S8Orbital {

	constructor() {
	}

	BOHR_set(code, value) {
		switch (code) {
			case 0x02:
				/** @type {NbProgram} program */
				this.program = NbPrograms.get(value);
				break;

			case 0x04:
				this.appearances = value;
				break;

			default: "Unsupported code: " + code;
		}
	}


	/**
	 * 
	 * @param {Map} apperancesByName 
	 */
	explore(apperancesByName){
		this.appearances.forEach(appearance => {
			let name = appearance.name;
			if(apperancesByName.has(name)){
				throw "Collision is appearance naming: "+name;
			}
			apperancesByName.set(name, appearance);
		});
	}

	BOHR_render() {
		// do nothing
	}


	/**
	 * 
	 * @param {NbView} view 
	 */
	render(view) {
		if (this.program.isReady) {
			// enable program
			this.program.enable();

			// render appearnce
			let nAppearances = this.appearances.length;
			for (let i = 0; i < nAppearances; i++) {

				/** @type {NbAppearance} appearance */
				let appearance = this.appearances[i];

				// bind appearance
				this.program.bindAppearance(appearance);

				// render the appearance
				appearance.render(view, this.program);
			}

			// disable program
			this.program.disable();
		}
	}
}