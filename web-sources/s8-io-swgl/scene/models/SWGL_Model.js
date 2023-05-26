


import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { NeObject } from '/s8-io-bohr-neon/NeObject.js';
import { gl } from '/s8-io-swgl/swgl.js';
import { SWGL_Mesh } from './SWGL_Mesh.js';





/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Model extends NeObject {



	/** @type {Float32Array}  predefine matrix */
	matrix = M4.createIdentity();


	/**
	 * @type{boolean}
	 */
	isReady = false;

	
	/** @type {SWGL_Mesh} vertex attributes enabling flage */
	mesh = null;


	/**
	 * 
	 */
	constructor() {
		super();
	}

	setDrawOption(flag) {
		if (flag == 0) {
			this.drawOption = gl.STATIC_DRAW;
		}
		else if (flag == 1) {
			this.drawOption = gl.DYNAMIC_DRAW;
		}
		else {
			throw "Unsupported code for refreshingStyle";
		}
	}


	/** @param {Float32Array} coefficients */
	S8_set_matrix(coefficients) {
		this.matrix = coefficients;
	}


	/** @param {SWGL_Mesh} mesh */
	S8_set_mesh(mesh) {
		if(mesh == null) { throw "SWGL: Forbidden to set null mesh"; }
		this.mesh = mesh;
		this.isReady = true;
	}


	load(){
		/* load mesh to GPU (if not already done) */
		this.mesh.load();
	}


	draw(){
		/* trigger draw */
		this.mesh.draw();
	}

	S8_render() { /* do nothing */ }


	S8_dispose() {
		if(this.isReady) { 
			this.mesh.dispose(); 
			this.isReady = false;
		}
	}

}




