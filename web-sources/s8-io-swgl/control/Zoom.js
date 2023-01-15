
import { Control } from "./Control.js";



/**
 * basic mode for zooming
 */
export class Zoom extends Control {

	/** @type {number} mouse wheel sensitivity */
	mouseWheelSensitivity = 0.8 * 1e-3;

	constructor() { super(); }

	onMouseDown() { return false; }
	onMouseUp() { return false; }
	onMouseMove() { return false; /* nothing to do*/ }

	onMouseWheel(event) {
		this.controller.r += -this.controller.r * event.wheelDelta * this.mouseWheelSensitivity;
		if (this.controller.r < this.controller.SETTINGS_min_approach_r) {
			this.controller.r = this.controller.SETTINGS_min_approach_r;
		}
		//this.updateView();
		this.controller.refresh();

		return true;
	}

	onKeyDown() { return false; }
	onKeyUp() { return false; }
};