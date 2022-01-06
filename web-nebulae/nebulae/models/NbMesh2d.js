import { NbMesh } from "./NbMesh"



export class NbModel2d extends NbMesh {

    constructor(){
        super();
    }

    draw() {
		gl.drawElements(gl.LINES, this.indicesLength, gl.UNSIGNED_SHORT, 0);
	}
}