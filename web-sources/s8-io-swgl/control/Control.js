import { StdViewController } from "./StdViewController.js";



/**
 * 
 */
export class Control {

	/** @type { StdViewController } the view attached to this control */
	controller;


	constructor() { 
    }


    link(controller){   
        this.controller = controller;
    }

    onMouseDown() {
		/* to be overridden */
		return false;
	}

	onMouseUp() {
		/* to be overridden */
		return false;
	}

	onMouseMove(event) {
		/* to be overridden */
		return false;
	}

	onMouseWheel() {
		/* to be overridden */
		return false;
	}

	onKeyDown() {
		/* to be overridden */
		return false;
	}

	onKeyUp() {
		/* to be overridden */
		return false;
	}

    onClick() {
		/* to be overridden */
		return false;
	}

}