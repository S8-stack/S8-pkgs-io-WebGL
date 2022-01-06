
import { gl } from '../nebular.js';
import *  as M4 from "../maths/NbMatrix4d";






/**
 * IMMUTABLE
 */
export class NbMeshProperties {

	/**
	 * 
	 */
	constructor() {

		/** wire: dimension=2, surface: dimension=3 */
		this.dimension = 3;

		/** surface normal */
		this.isVertexAttributeEnabled = true;

		/** surface normal */
		this.isNormalAttributeEnabled = true;

		/** surface tex coord */
		this.isTexCoordAttributeEnabled = false;

		/** surface color */
		this.isColorAttributeEnabled = false;

		/** surface {U,V}-tangents */
		this.isUTangentAttributeEnabled = false;

		/** surface {U,V}-tangents */
		this.isVTangentAttributeEnabled = false;

	}

}


/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbMesh {


	/**
	 * 
	 * @param {GkMeshProperties} props 
	 * @param {GkVertexAttributes} attributes 
	 * @param {Array} indices 
	 */
	constructor() {

		/** vertex attributes */
		this.isVertexAttributeEnabled = false;

		/** normal attributes */
		this.isNormalAttributeEnabled = false;

		/** u-tangent attributes */
		this.isUTangentAttributeEnabled = false;

		/** v-tangent attributes */
		this.isVTangentAttributeEnabled = false;

		/** tex-coords */
		this.isTexCoordAttributeEnabled = false;
		
		/** colors */
		this.isColorAttributeEnabled = false;

		/** dimension */
		this.dimension = -1;

		/** elements */
		this.elements = null;


		// set model matrix as identity
		this.matrix = M4.create();
		M4.identity(this.matrix);
	
		this.isBufferDataDisposed = false;

		// refreshing style
		this.refreshingStyle = gl.STATIC_DRAW;


		this.isCompiled = false;
	}


	BOHR_set(code, value){
		switch(code){

			/* <props> */
		case 0x10: 
			if(value==0){
				this.refreshingStyle = gl.STATIC_DRAW;
			}
			else if(value ==1){
				this.refreshingStyle = gl.DYNAMIC_DRAW;
			}
			else{
				throw "Unsupported code for refreshingStyle";
			}
			break;

		case 0x12: this.modelMatrix = value; break;
		case 0x13: this.isBufferDataDisposed = value; break;
		/* </props> */

		/* <attributes> */
		case 0x20: 
			this.isVertexAttributeEnabled = true;
			this.vertexAttributes = value; 
			break;

		case 0x21: 
			this.isNormalAttributeEnabled = true;
			this.normalAttributes = value; 
			break;

		case 0x22:
			this.isUTangentAttributeEnabled = true;
			this.uTangentAttributes = value;
			break;

		case 0x23: 
			this.isVTangentAttributeEnabled = true;
			this.vTangentAttributes = value; 
			break;
			
		case 0x24: 
			this.isTexCoordAttributeEnabled = true;
			this.texCoordAttributes = value; 
			break;

		case 0x25: 
			this.isColorAttributeEnabled = true;
			this.colorAttributes = value; 
			break;
		/* </attributes> */

		/* <elements> */
		case 0x30: this.dimension = value; break;
		case 0x32: this.indices = value; break;
		/* </elements> */
		
		default: throw "Unsupported code: "+code;
		}
	}

	
	BOHR_render(){
		this.compile();
	
	}

	compile(){
		if(!this.isCompiled){
			if(this.isVertexAttributeEnabled){
				this.verticesHandle = this.compileBuffer(this.vertexAttributes);
			}
	
			if(this.isNormalAttributeEnabled){
				this.normalsHandle = this.compileBuffer(this.normalAttributes);
			}
	
			if(this.isUTangentAttributeEnabled){
				this.uTangentsHandle = this.compileBuffer(this.uTangentAttributes);
			}
	
			if(this.isVTangentAttributeEnabled){
				this.vTangentsHandle = this.compileBuffer(this.vTangentAttributes);
			}
	
			if(this.isTexCoordAttributeEnabled){
				this.texCoordsHandle = this.compileBuffer(this.texCoordAttributes);
			}
	
			if(this.isColorAttributeEnabled){
				this.colorsHandle = this.compileBuffer(this.colorAttributes);
			}
	
			this.compileElements();

			// is compiled
			this.isCompiled = true;
		}
	}

	compileAttributes(array){

			// Create buffer handle
			let bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferHandle);
	
			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, array, this.refreshingStyle);
	
			// dispose data
			/*
			if(this.isBufferDataDisposed){ delete this.array; }
			*/
			return bufferHandle;
	}

	compileElements(){
		// create and populate array
		this.indicesLength = this.indices.length;

		// Create buffer handle
		this.elementsHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementsHandle);

		// bind buffer data
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, this.refreshingStyle);
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

	draw() {
		if(this.dimension == 2){
			gl.drawElements(gl.LINES, this.indicesLength, gl.UNSIGNED_SHORT, 0);
		}
		else if(this.dimension == 3) {
			gl.drawElements(gl.TRIANGLES, this.indicesLength, gl.UNSIGNED_SHORT, 0);
		}
		else{
			throw "Drawing elements impossible: Wrong dimension";
		}
	}
	

	dispose() {
		if (this.isVertexAttributeEnabled) {
			gl.deleteBuffer(this.verticesHandle);
		}

		if (this.isNormalAttributeEnabled) {
			gl.deleteBuffer(this.normalsHandle);
		}

		if (this.isUTangentAttributeEnabled) {
			gl.deleteBuffer(this.uTangentsHandle);
		}

		if (this.isVTangentAttributeEnabled) {
			gl.deleteBuffer(this.vTangentsHandle);
		}

		if (this.isTexCoordAttributeEnabled) {
			gl.deleteBuffer(this.texCoordsHandle);
		}

		if (this.isColorAttributeEnabled) {
			gl.deleteBuffer(this.colorsHandle);
		}

		// delete handler buffer
		gl.deleteBuffer(this.elementsHandle);
	}

};


/*
 * VBO objects
 */

export class Vector2dNbBuffer {

	constructor(nbVectors) {
		this.array = new Float32Array(2 * nbVectors);
	}

	set(index, vector) {
		this.array[2 * index + 0] = vector.x;
		this.array[2 * index + 1] = vector.y;
	}

	compile() {

		// Create buffer handle
		this.bufferHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// store data in GPU
		gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		delete this.array;
	}

	bind(location) {

		// bind vertices
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// set to vertex attributes location
		gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
	}

	dispose() {
		gl.deleteBuffer(this.bufferHandle);
	}
};



export class Vector3dNbBufferAttributes {

	constructor(bufferData) {
		this.bufferData = bufferData;
	}

	compile(isBufferDataDisposed = true) {

		// Create buffer handle
		this.bufferHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// store data in GPU
		gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		// dispose data
		if(isBufferDataDisposed){ delete this.array; }
	}


	bind(location) {

		// bind vertices
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// set to vertex attributes location
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	}
};


export class ElementNbBuffer {

	constructor(indices) {
		
	}

	bind() {

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
	}

	dispose() {
		
	}
}


export class LineNbBuffer extends ElementNbBuffer {

	constructor(indices) {
		super(indices);
	}


};

