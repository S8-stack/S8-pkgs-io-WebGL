import { Control } from "./Control.js";





export class Highlight extends Control {

	acquiredHoveredObject = null;

	
	constructor() { 
        super(); 
    }

	onMouseDown() {
		this.terminate(); // cleaning-up
		return false;
	}

	onMouseUp() {
		this.terminate(); // cleaning-up
		return false;
	}

	onMouseMove(event) {
        /*
		if (event.shiftKey) {
           
			var currentHoveredObject = scene.picking.pick(event.clientX, event.clientY);
			if (currentHoveredObject != this.acquiredHoveredObject) {
				var isRenderingRequired = false;
				if (this.acquiredHoveredObject != null) {
					this.acquiredHoveredObject.display(0);
					isRenderingRequired = true;
				}
				this.acquiredHoveredObject = currentHoveredObject;
				if (this.acquiredHoveredObject != null) {
					this.acquiredHoveredObject.display(1);
					isRenderingRequired = true;
				}

				if (isRenderingRequired) {
					scene.render();
				}
			}
			logNode.innerHTML = "Now hovering " + this.acquiredHoveredObject;
			return true;
		}
		else {
			this.terminate(); // cleaning-up
			return false;
		}
        */
       return false;
	}

	onMouseWheel() {
		this.terminate(); // cleaning-up
		return false;
	}

	onKeyDown() {
		this.terminate(); // cleaning-up
		return false;
	}

	onKeyUp() {
		this.terminate(); // cleaning-up
		return false;
	}

	terminate() {
		if (this.acquiredHoveredObject != null) {
			this.acquiredHoveredObject.display(0);
			this.acquiredHoveredObject = null;
			this.controller.refresh();
		}
	}
}
