
import { NbAppearance, NbProgram, NbPrograms } from './NbProgram.js';


export class NbRenderingPipe {

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

	BOHR_render() {
		// do nothing
	}


	render() {
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
				appearance.render(this.program);
			}

			// disable program
			this.program.disable();
		}
	}
}