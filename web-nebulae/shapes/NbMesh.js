

import { S8Orbital } from '../../s8/S8.js';

import { gl } from '../nebulae.js';
import * as M4 from '../maths/NbMatrix4d';
import * as V2 from '../maths/NbVector2d';
import * as V4 from '../maths/NbVector4d';








/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbMesh extends S8Orbital {


	/**
	 * 
	 */
	constructor(id) {
		super(id);

		/**	dimension */
        this.dimension = -1;

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

		/** elements */
		this.elements = null;

		// draw option
		this.drawOption = gl.STATIC_DRAW;

        /** number of vertices */
        this.nVertices = 0;
	}


	/**
	 * 
	 * @param {NbProgram} program 
	 */
	static forProgram(program) {
 		
		/** number of vertices */
 		this.nVertices = 0;

		this.dimension = program.dimension;

		/** vertex attributes */
		if (this.isVertexAttributeEnabled = program.isVertexAttributeEnabled) {
			this.vertexAttributes = new Float32Array();
		}

		/** normal attributes */
		if (this.isNormalAttributeEnabled = program.isNormalAttributeEnabled) {
			this.normalAttributes = new Float32Array();
		}

		/** u-tangent attributes */
		if (this.isUTangentAttributeEnabled = program.isUTangentAttributeEnabled) {
			this.uTangentAttributes = new Float32Array();
		}

		/** v-tangent attributes */
		if (this.isVTangentAttributeEnabled = program.isVTangentAttributeEnabled) {
			this.vTangentAttributes = new Float32Array();
		}

		/** tex-coords */
		if (this.isTexCoordAttributeEnabled = program.isTexCoordAttributeEnabled) {
			this.texCoordAttributes = new Float32Array();
		}

		/** colors */
		if (this.isColorAttributeEnabled = program.isColorAttributeEnabled) {
			this.colorAttributes = new Float32Array();
		}

		// indices
		this.indices = new Uint32Array();
	}



	S8_set(code, value){
		switch(code){

			/* <props> */
		case 0x10: this.dimension = value; break;
		case 0x11: this.nVertices = value; break;
		case 0x12: this.setDrawOption(value); break;

		case 0x16: this.matrix = value; break;
		/* </props> */

		/* <attributes> */
		case 0x20: this.setVertices(value); break;
		case 0x21: this.setNormals(value); break;
		case 0x22: this.setUTangents(value); break;
		case 0x23: this.setVTangents(value); break;
		case 0x24: this.setTexCoords(value); break;
		case 0x25: this.setColors(colors); break;
		/* </attributes> */

		/* <elements> */
		case 0x30: this.indices = value; break;
		/* </elements> */
		
		default: throw "Unsupported code: "+code;
		}
	}


	setDrawOption(flag){
		if(flag==0){
			this.drawOption = gl.STATIC_DRAW;
		}
		else if(flag ==1){
			this.drawOption = gl.DYNAMIC_DRAW;
		}
		else{
			throw "Unsupported code for refreshingStyle";
		}
	}


	/** @param {Float32Array} vertices */
	setVertices(vertices){
		this.isVertexAttributeEnabled = true;
		this.vertexAttributes = vertices;
		let n = vertices.length;
		if(n%3 != 0){ throw "vertices length must be a multiple of 3"; }
		this.nVertices = vertices.length/3;
		this.isCompiled = false;
	}

	/** @param {Float32Array} normals */
	setNormals(normals){
		this.isNormalAttributeEnabled = true;
		this.normalAttributes = normals;
		this.isCompiled = false;
	}

	/** @param {Float32Array} uTangents */
	setUTangents(uTangents){
		this.isUTangentAttributeEnabled = true;
		this.uTangentAttributes = uTangents; 
		this.isCompiled = false;
	}

	/** @param {Float32Array} vTangents */
	setVTangents(vTangents){
		this.isVTangentAttributeEnabled = true;
		this.vTangentAttributes = vTangents; 
		this.isCompiled = false;
	}

	/** @param {Float32Array} texCoords */
	setTexCoords(texCoords){
		this.isTexCoordAttributeEnabled = true;
		this.texCoordAttributes = texCoords; 
		this.isCompiled = false;
	}

	/** @param {Float32Array} colors */
	setColors(colors){
		this.isColorAttributeEnabled = true;
		this.colorAttributes = colors; 
		this.isCompiled = false;
	}

	/**
	 * 
	 */
	S8_render(){
	}


    /**
     * 
     * @param {Float32Array} matrix 
     * @param {NbMesh} mesh 
     */
    append(matrix, mesh){

        let nMeshVertices = mesh.nVertices;

		

		if (this.isVertexAttributeEnabled) {
			let v = mesh.vertexAttributes, w = this.vertexAttributes;
			let vOffset = 0, wOffset = w.length;
			w.length += 3*nMeshVertices;
			for(let i=0; i<nMeshVertices; i++){
				M4.transformPoint3d(matrix, v, w, vOffset, wOffset); vOffset+=3; wOffset+=3;
			}
		}

		if (this.isNormalAttributeEnabled) {
			let v = mesh.normalAttributes, w = this.normalAttributes;
			let vOffset = 0, wOffset = w.length;
			w.length += 3*nMeshVertices;
			let tim = M4.create();
			M4.transposeInverse(matrix, tim);
			for(let i=0; i<nMeshVertices; i++){
				M4.transformVector3d(tim, v, w, vOffset, wOffset); vOffset+=3; wOffset+=3;
			}
		}

		if (this.isUTangentAttributeEnabled) {
			let v = mesh.uTangentAttributes, w = this.uTangentAttributes;
			let vOffset = 0, wOffset = w.length;
			w.length += 3*nMeshVertices;
			for(let i=0; i<nMeshVertices; i++){
				M4.transformVector3d(matrix, v, w, vOffset, wOffset); vOffset+=3; wOffset+=3;
			}
		}

		if (this.isVTangentAttributeEnabled) {
			let v = mesh.vTangentAttributes, w = this.vTangentAttributes;
			let vOffset = 0, wOffset = w.length;
			w.length += 3*nMeshVertices;
			for(let i=0; i<nMeshVertices; i++){
				M4.transformVector3d(matrix, v, w, vOffset, wOffset); vOffset+=3; wOffset+=3;
			}
		}

		if (this.isTexCoordAttributeEnabled) {
			let v = mesh.texCoordAttributes, w = this.texCoordAttributes;
			let vOffset = 0, wOffset = w.length;
			w.length += 2*nMeshVertices;
			for(let i=0; i<nMeshVertices; i++){
				V2.copy(v, w, vOffset, wOffset); vOffset+=2; wOffset+=2;
			}
		}

		if (this.isColorAttributeEnabled) {
			let v = mesh.colorAttributes, w = this.colorAttributes;
			let vOffset = 0, wOffset = w.length;
			w.length += 4*nMeshVertices;
			for(let i=0; i<nMeshVertices; i++){
				V4.copy(v, w, vOffset, wOffset); vOffset+=4; wOffset+=4;
			}
		}

        /* <elements> */
        let v = mesh.indices, w = this.indices, n = v.length;
		let wOffset = w.length;
		this.indices.length+=n;
        let iOffset = this.nVertices;
		for(let i=0; i<n; i++){
			w[wOffset+i] = iOffset + v[i];
		}
        /* </elements> */

        this.nVertices += nMeshVertices;
	}

	compileAttributes(array){

		// Create buffer handle
		let bufferHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, bufferHandle);
	
		// store data in GPU
		gl.bufferData(gl.ARRAY_BUFFER, array, this.drawOption);
	
		return bufferHandle;
	}

	compileElements(){
		// create and populate array
		this.indicesLength = this.indices.length;

		// Create buffer handle
		let elementsHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementsHandle);

		// bind buffer data
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, drawOption);

        return elementsHandle;
	}



	/**
	 * 
	 * @returns {NbModel}
	 */
	buildModel(){

        /* <dimension> */
		let model = null;
        if(this.dimension == 2){
            model = new NbModel2d();
        }
        else if(this.dimension == 3){
            model = new NbModel3d();
        }
        else{
            throw "Dimension is not defined!"
        }
        /* </dimension> */
		

        /* <attributes> */
		if(this.isVertexAttributeEnabled){
			model.verticesHandle = this.compileBuffer(this.vertexAttributes);
		}
	
		if(this.isNormalAttributeEnabled){
			model.normalsHandle = this.compileBuffer(this.normalAttributes);
		}
	
		if(this.isUTangentAttributeEnabled){
			model.uTangentsHandle = this.compileBuffer(this.uTangentAttributes);
		}
	
		if(this.isVTangentAttributeEnabled){
			model.vTangentsHandle = this.compileBuffer(this.vTangentAttributes);
		}
	
		if(this.isTexCoordAttributeEnabled){
		    model.texCoordsHandle = this.compileBuffer(this.texCoordAttributes);
		}
	
		if(this.isColorAttributeEnabled){
			model.colorsHandle = this.compileBuffer(this.colorAttributes);
		}
        /* <attributes> */

		model.elementsHandle = this.compileElements();
        model.indicesLength = this.indices.length;

        return model;
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

