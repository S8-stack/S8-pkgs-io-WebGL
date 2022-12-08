


import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { NeObject } from '/s8-io-bohr/neon/NeObject.js';
import { gl } from '/s8-io-swgl/swgl.js';
import { SWGL_Mesh } from '/s8-io-swgl/models/SWGL_Mesh.js';





/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Model extends NeObject {



	/** @type {Float32Array}  predefine matrix */
	matrix = M4.createIdentity();


	/**
	 * @type{boolean}
	 */
	isMeshDefined = false;

	/** @type {Array} */
	udpaters = []; // no updaters

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
		this.setMesh(mesh);
	}

	/** @param {SWGL_Mesh} mesh */
	setMesh(mesh){
		if(mesh == null) { throw "SWGL: Forbidden to set null mesh"; }
		this.mesh = mesh;
		this.isMeshDefined = true;
	}

	/**
	 * 
	 * @param {*} matrixUpdater 
	 */
	S8_set_updaters(updaters){
		this.updaters = updaters;
	}
	

	/**
	 * 
	 */
	update(){

		/* update */
		let nUpdaters = this.udpaters.length;
		for(let i=0; i<nUpdaters; i++){
			let updater = this.updaters[i];
			if(updater.hasUpdate()){ updater.update(this); }
		}


		if(this.isMeshDefined) {

			/* load mesh to GPU (if not already done) */
			this.mesh.load();
		}

	}


	draw(){
		if(this.isMeshDefined) {

			/* load mesh to GPU (if not already done) */
			this.mesh.load();

			// load mesh to GPU (if not already done)
			this.mesh.draw();
		}
	}

	S8_render() { /* do nothing */ }


	S8_dispose() {
		if(this.isMeshDefined) { 
			this.mesh.dispose(); 
			this.isMeshDefined = false;
		}
	}

}




