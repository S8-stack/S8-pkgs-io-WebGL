
import { Control } from "./Control.js";




/**
 * 
 */
export class Rotate extends Control {

	/** @type {number} mouseTrackballSensitity */
	mouseTrackballSensitity = 0.3;

	/** @type {number} lastMouseX */
	lastMouseX = 0.0;

	/** @type {number} lastMouseY */
	lastMouseY = 0.0;

	/** @type {boolean} isMouseDown */
	isMouseDown = false;


	/**
	 * 
	 * @param {StdViewController} controller 
	 */
	constructor() { super(); }

	/**
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseDown(event) {
		this.isMouseDown = true;
		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
		return true; // taking over
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseUp() {
		this.isMouseDown = false;
		return false; // not taking over
	}

	/**
	 * 
	 * @param {*} event
	 * @returns {boolean} is taking over
	 */
	onMouseWheel() {
		return false; // not taking over
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns {boolean} is taking over
	 */
	onMouseMove(event) {
		if (this.isMouseDown) {
			// TODO implement throttle her

			this.controller.phi -= (event.clientX - this.lastMouseX) * this.mouseTrackballSensitity;
			this.lastMouseX = event.clientX;
			this.controller.theta += (event.clientY - this.lastMouseY) * this.mouseTrackballSensitity;
			this.lastMouseY = event.clientY;
			if (this.controller.theta > 180.0) {
				this.controller.theta = 180.0;
			}
			if (this.controller.theta < 1.0) {
				this.controller.theta = 1.0;
			}

			//log.nodeValue = "phi="+this.phi.toFixed(2)+" theta="+this.theta.toFixed(2)+" r="+this.r.toFixed(2)+"\n";
			//log.nodeValue+= "x="+event.clientX+" y="+event.clientY+"\n";

			//this.updateView();

			this.controller.refresh();
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns 
	 */
	onKeyDown(event) {
		return false; // nothing to do 
	}

	/**
	 * 
	 * @param {*} event 
	 * @returns 
	 */
	onKeyUp(event) {
		return false; // nothing to do 
	}
}
