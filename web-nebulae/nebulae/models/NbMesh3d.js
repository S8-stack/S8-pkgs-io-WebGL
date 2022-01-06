import { NbMesh } from "./NbMesh"

/**
 * 
 */
export class NbModel3d extends NbMesh {

    constructor(){
        super();
    }

	/**
	 * 
	 */
    draw() {
		gl.drawElements(gl.TRIANGLES, this.indicesLength, gl.UNSIGNED_SHORT, 0);
	}
}