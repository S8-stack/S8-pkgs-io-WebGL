
import { NbMesh } from '../shapes/NbMesh.js';
import { gl } from '../nebulae.js';
import * as M4 from '../maths/NbMatrix4d.js';
import { ColorNbProgram } from './color/program.js';
import { Color2NbProgram } from './color2/program.js';
import { Mat01NbProgram } from './mat01/program.js';
import { NbView } from '../scenes/view/NbView.js';


class NbProgramLibrary {

	constructor() {
		this.map = new Map();
	}

	/**
	 * 
	 * @param {string} prgmId 
	 * @returns {NbProgram}
	 */
	get(prgmId) {
		let program = this.map.get(prgmId);
		if(program == undefined){
			program = this.retrieve(prgmId);
			program.load();
			this.map.set(prgmId, program);
		}
		return program;
	}

	retrieve(id){
		switch(id){
			case "color": return new ColorNbProgram();
			case "color2" : return new Color2NbProgram();
			case "mat01" : return new Mat01NbProgram();
			default : throw "Unsupported program: "+id;
		}
	}
}

export const NbPrograms = new NbProgramLibrary();




/**
 * At the very lowest level (in the hardware), yes, ifs are expensive. In order to understand why, you have to understand how pipelines work.
The current instruction to be executed is stored in something typically called the instruction pointer (IP) or program counter (PC); these terms are synonymous, but different terms are used with different architectures. For most instructions, the PC of the next instruction is just the current PC plus the length of the current instruction. For most RISC architectures, instructions are all a constant length, so the PC can be incremented by a constant amount. For CISC architectures such as x86, instructions can be variable-length, so the logic that decodes the instruction has to figure out how long the current instruction is to find the location of the next instruction.
For branch instructions, however, the next instruction to be executed is not the next location after the current instruction. Branches are gotos - they tell the processor where the next instruction is. Branches can either be conditional or unconditional, and the target location can be either fixed or computed.

Conditional vs. unconditional is easy to understand - a conditional branch is only taken if a certain condition holds (such as whether one number equals another); if the branch is not taken, control proceeds to the next instruction after the branch like normal. For unconditional branches, the branch is always taken. Conditional branches show up in if statements and the control tests of for and while loops. Unconditional branches show up in infinite loops, function calls, function returns, break and continue statements, the infamous goto statement, and many more (these lists are far from exhaustive).
The branch target is another important issue. Most branches have a fixed branch target - they go to a specific location in code that is fixed at compile time. This includes if statements, loops of all sorts, regular function calls, and many more. Computed branches compute the target of the branch at runtime. This includes switch statements (sometimes), returning from a function, virtual function calls, and function pointer calls.
So what does this all mean for performance? When the processor sees a branch instruction appear in its pipeline, it needs to figure out how to continue to fill up its pipeline. In order to figure out what instructions come after the branch in the program stream, it needs to know two things: (1) if the branch will be taken and (2) the target of the branch. Figuring this out is called branch prediction, and it's a challenging problem. If the processor guesses correctly, the program continues at full speed. If instead the processor guesses incorrectly, it just spent some time computing the wrong thing. It now has to flush its pipeline and reload it with instructions from the correct execution path. Bottom line: a big performance hit.
Thus, the reason why if statements are expensive is due to branch mispredictions. This is only at the lowest level. If you're writing high-level code, you don't need to worry about these details at all. You should only care about this if you're writing extremely performance-critical code in C or assembly. If that is the case, writing branch-free code can often be superior to code that branches, even if several more instructions are needed. There are some cool bit-twiddling tricks you can do to compute things such as abs(), min(), and max() without branching.
 */
export class NbProgram {


	/*
	 * an id is required to build the program
	 */
	constructor(pathname) {

		// pathname
		this.pathname = pathname;

		// pass index for rendering sort (default is 1)
		this.pass = 1;

		// matrices
		this.isModelViewProjectionMatrixUniformEnabled = false;
		this.isModelViewMatrixUniformEnabled = false;
		this.isNormalMatrixUniformEnabled = false;
		this.isModelMatrixUniformEnabled = false;

		// attributes
		this.isVertexAttributeEnabled = false;
		this.isNormalAttributeEnabled = false;
		this.isTexCoordAttributeEnabled = false;
		this.isColorAttributeEnabled = false;
		this.isUTangentAttributeEnabled = false;
		this.isVTangentAttributeEnabled = false;

		// build status
		this.isVertexShaderLoaded = false;
		this.isFragmentShaderLoaded = false;
		this.isReady = false;

		this.apperances = [];
	}

	load() {
		if (!this.isReady) {
			let program = this;

			S8.sendRequest_GET(
				"/nebulae/appearances/" + this.pathname + "/vertex.vsh",
				"text",
				function (source) { program.buildVertexShader(source); });

			S8.sendRequest_GET(
				"/nebulae/appearances/" + this.pathname + "/fragment.fsh",
				"text",
				function (source) { program.buildFragmentShader(source); });
		}
	}



	/**  Dispose the shader */
	dispose() {
		gl.glDeleteShader(this.handle);
	}

	buildShader(type, source) {

		// Create shader
		let handle = gl.createShader(type);

		// Attach source code to the shader
		gl.shaderSource(handle, source);

		// Compile shader
		gl.compileShader(handle);

		// Check if shader compiles
		if (!gl.getShaderParameter(handle, gl.COMPILE_STATUS)) {
			console.log("SHADER COMPILE ERRORS");
			console.log(gl.getShaderInfoLog(handle));
		}

		return handle;
	}


	/**
	 * 
	 * @param {string} source 
	 */
	buildVertexShader(source) {
		this.vertexShaderHandle = this.buildShader(gl.VERTEX_SHADER, source);
		this.isVertexShaderLoaded = true;

		if (!this.isReady && this.isFragmentShaderLoaded) {
			this.build();
		}
	}

	buildFragmentShader(source) {
		this.fragmentShaderHandle = this.buildShader(gl.FRAGMENT_SHADER, source);
		this.isFragmentShaderLoaded = true;

		if (!this.isReady && this.isVertexShaderLoaded) {
			this.build();
		}
	}

	build() {
		if (!this.isReady) {

			// Create shader program
			this.handle = gl.createProgram();

			// Attach vertex shader
			gl.attachShader(this.handle, this.vertexShaderHandle);

			// Attach vertex shader
			gl.attachShader(this.handle, this.fragmentShaderHandle);

			// Link shader program
			gl.linkProgram(this.handle);
			if (!gl.getProgramParameter(this.handle, gl.LINK_STATUS)) {
				alert("Could not initialise shaders : linking problem");
			}

			/*
			Actually uniform locations will be assigned during shader linking time. 
			And they will never change for life time of program object. 
			If you want improvement try not to always update uniforms. 
			In your rendering loop check If uniform variable value changes then only updates its value. 
			Kind of dirty flag. This will definitely improve performance. 
			If you want more optimization look into usage of uniform blocks or uniform buffer objects.
			*/

			// linking of uniforms and attributes
			this.link();

			// program is ready to render!
			this.isReady = true;

			// notify to listener
			this.notify();
		}
	}

	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link() {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
		this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");
		this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
		/* </uniforms> */

		/* <attributes> */
		this.vertexAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
		this.texCoordAttributeLocation = gl.getAttribLocation(this.handle, "texCoord");
		this.colorAttributeLocation = gl.getAttribLocation(this.handle, "color");
		this.uTangentAttributeLocation = gl.getAttribLocation(this.handle, "uTangent");
		this.vTangentAttributeLocation = gl.getAttribLocation(this.handle, "vTangent");
		/* </attributes> */
	}


	/**
	 * To be overidden
	 */
	enable() {
		// bind shader program
		gl.useProgram(this.handle);

		/* <enable-attributes> */
		gl.enableVertexAttribArray(this.vertexAttributeLocation);
		gl.enableVertexAttribArray(this.normalAttributeLocation);
		gl.enableVertexAttribArray(this.texCoordAttributeLocation);
		gl.enableVertexAttribArray(this.colorAttributeLocation);
		gl.enableVertexAttribArray(this.uTangentAttributeLocation);
		gl.enableVertexAttribArray(this.vTangentAttributeLocation);
		/* </enable-attributes> */
	}


	/**
	 * 
	 * @param {*} environment 
	 */
	bindEnvironment(environment) {
		// environment
	}


	/**
	 * 
	 * @param {NbAppearance} appearance 
	 */
	bindAppearance(appearance) {
		// nothing to do...
	}
	

	/**
	 * 
	 * @param {NbMesh} model 
	 */
	bindModel(model) {
		/* <matrices> */
		// re-compute everything...
		let matrix_Model = model.matrix;
		M4.multiply(this.matrix_ProjectionView, matrix_Model, this.matrix_ProjectionViewModel);
		M4.multiply(this.matrix_View, matrix_Model, this.matrix_ViewModel);
		M4.transposeInverse(this.matrix_ViewModel, this.matrix_Normal);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, this.matrix_ViewModel);
		gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, this.matrix_Normal);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindVertexAttributes(this.vertexAttributeLocation);
		model.bindNormalAttributes(this.normalAttributeLocation);
		model.bindUTangentAttributes(this.uTangentAttributeLocation);
		model.bindVTangentAttributes(this.vTangentAttributeLocation);
		model.bindTexCoordAttributes(this.texCoordAttributeLocation);
		model.bindColorAttributes(this.colorAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.elements.bind();
		/* </bind-elements> */
	}


	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.vertexAttributeLocation);
		gl.disableVertexAttribArray(this.normalAttributeLocation);
		gl.disableVertexAttribArray(this.texCoordAttributeLocation);
		gl.disableVertexAttribArray(this.colorAttributeLocation);
		gl.disableVertexAttribArray(this.uTangentAttributeLocation);
		gl.disableVertexAttribArray(this.vTangentAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(0);
	}


	/* dispose program-related disposable */
	dispose() {
		gl.glDeleteShader(this.vertexShaderHandle);
		gl.glDeleteShader(this.fragmentShaderHandle);
		gl.glDeleteProgram(programHandle);
	}


	/* notify load to instances */
	notify() {
		this.toBeNotified.iterate(function (entry) {
			entry.ref.render();
			entry.isRemoved = true;
		})
	}

	appendListener(scene) {
		var entry = this.toBeNotified.append();
		entry.ref = scene;
	}
};


