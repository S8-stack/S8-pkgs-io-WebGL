

import { gl } from '../nebulae.js';

import * as M4 from '../maths/NbMatrix4d';



/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbModelBuilder {


};




/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbModel {

    constructor(){
        super();

        // predefine matrix
        this.matrix = M4.create();
        M4.identity(this.matrix);

        // predefine attributes handles
        this.verticesHandle = null;
        this.normalsHandle = null;
        this.uTangentsHandle = null;
        this.vTangentsHandle = null;
        this.texCoordsHandle = null;
        this.colorsHandle = null;
    }


	/**
	 * 
	 * @param {*} location 
	 */
	bindVertexAttributes(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesHandle);
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	}


	/**
	 * 
	 * @param {*} location 
	 */
	bindNormalAttributes(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsHandle);
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	}


	/**
	 * 
	 * @param {*} location 
	 */
	bindUTangentAttributes(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.uTangentsHandle);
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	}

	
	/**
	 * 
	 * @param {*} location 
	 */
	bindVTangentAttributes(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vTangentsHandle);
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	}


	/**
	 * 
	 * @param {*} location 
	 */
	bindTexCoordAttributes(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordsHandle);
		gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
	}


	/**
	 * 
	 * @param {*} location 
	 */
	bindColorAttributes(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsHandle);
		gl.vertexAttribPointer(location, 4, gl.FLOAT, false, 0, 0);
	}


    /**
     * 
     */
	dispose() {
		if (this.verticesHandle) {
			gl.deleteBuffer(this.verticesHandle);
		}

		if (this.normalsHandle) {
			gl.deleteBuffer(this.normalsHandle);
		}

		if (this.uTangentsHandle) {
			gl.deleteBuffer(this.uTangentsHandle);
		}

		if (this.vTangentsHandle) {
			gl.deleteBuffer(this.vTangentsHandle);
		}

		if (this.texCoordsHandle) {
			gl.deleteBuffer(this.texCoordsHandle);
		}

		if (this.colorsHandle) {
			gl.deleteBuffer(this.colorsHandle);
		}

		// delete handler buffer
		gl.deleteBuffer(this.elementsHandle);
	}

}


export class NbModel2d extends NbModel {

	draw() {
		gl.drawElements(gl.LINES, this.indicesLength, gl.UNSIGNED_INT, 0);
	}
}



export class NbModel3d extends NbModel {

	draw() {
		gl.drawElements(gl.TRIANGLES, this.indicesLength, gl.UNSIGNED_INT, 0);
	}
}

