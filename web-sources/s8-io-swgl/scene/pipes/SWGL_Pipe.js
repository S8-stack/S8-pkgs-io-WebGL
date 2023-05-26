

import { NeObject } from '/s8-io-bohr-neon/NeObject.js';


import { SWGL_View } from '/s8-io-swgl/scene/view/SWGL_View.js';
import { SWGL_Environment } from '/s8-io-swgl/scene/environment/SWGL_Environment.js';

import { SWGL_Appearance } from './SWGL_Appearance.js';
import { SWGL_Program } from './SWGL_Program.js';





/**
 * At the very lowest level (in the hardware), yes, ifs are expensive. In 
 * order to understand why, you have to understand how pipelines work. 
 * The current instruction to be executed is stored in something typically called 
 * the instruction pointer (IP) or program counter (PC); these terms are synonymous, 
 * but different terms are used with different architectures. 
 * 
 * For most instructions, the PC of the next instruction is just the current PC plus 
 * the length of the current instruction. For most RISC architectures, instructions are 
 * all a constant length, so the PC can be incremented by a constant amount. 
 * For CISC architectures such as x86, instructions can be variable-length, 
 * so the logic that decodes the instruction has to figure out how long the current instruction 
 * is to find the location of the next instruction.
 * 
 * For branch instructions, however, the next instruction to be executed is not the next location 
 * after the current instruction. Branches are gotos - they tell the processor where the next 
 * instruction is. Branches can either be conditional or unconditional, and the target 
 * location can be either fixed or computed.
 * 
 * Conditional vs. unconditional is easy to understand - a conditional branch is only taken if a 
 * certain condition holds (such as whether one number equals another); if the branch is not taken, 
 * control proceeds to the next instruction after the branch like normal. For unconditional branches, 
 * the branch is always taken. Conditional branches show up in if statements and the control tests of 
 * for and while loops. Unconditional branches show up in infinite loops, function calls, function returns, 
 * break and continue statements, the infamous goto statement, and many more (these lists are far from exhaustive).
 * The branch target is another important issue. 
 * 
 * Most branches have a fixed branch target - they go to a specific location in code that is fixed at compile time. 
 * This includes if statements, loops of all sorts, regular function calls, and many more. 
 * Computed branches compute the target of the branch at runtime. This includes switch statements (sometimes), 
 * returning from a function, virtual function calls, and function pointer calls.
 * So what does this all mean for performance? When the processor sees a branch instruction appear in 
 * its pipeline, it needs to figure out how to continue to fill up its pipeline. In order to figure out 
 * what instructions come after the branch in the program stream, it needs to know two things: 
 * (1) if the branch will be taken and 
 * (2) the target of the branch. Figuring this out is called branch prediction, and it's a challenging problem. 
 * If the processor guesses correctly, the program continues at full speed. 
 * If instead the processor guesses incorrectly, it just spent some time computing the wrong thing. 
 * It now has to flush its pipeline and reload it with instructions from the correct execution path. 
 * Bottom line: a big performance hit.
 * Thus, the reason why if statements are expensive is due to branch mispredictions. 
 * This is only at the lowest level. 
 * If you're writing high-level code, you don't need to worry about these details at all. 
 * You should only care about this if you're writing extremely performance-critical code in C or assembly. 
 * If that is the case, writing branch-free code can often be superior to code that branches, 
 * even if several more instructions are needed. There are some cool bit-twiddling tricks you can do to 
 * compute things such as abs(), min(), and max() without branching.
 */
export class SWGL_Pipe extends NeObject {

	/**
	 * @type {SWGL_Program}
	 */
	program;

	/** 
	 * @type {Array<SWGL_Appearance>}
	 */
	appearances = new Array();

	/**
	 * @type {boolean}
	 */
	isReady = false;


	constructor() {
		super(); // S8Object
		
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

	}


	/**
	 * 
	 * @param {SWGL_Program} program 
	 */
	S8_set_program(program){
		this.program = program;

		// compile (if not already done)
		let _this = this;
		this.program.compile(function(){ 
			_this.isReady = true; 
		});
	}


	/** 
	 * @param {SWGL_Appearance[]} apperances 
	 */
	S8_set_appearances(appearances) {
		this.appearances = appearances;

		if(this.appearances!=null){ 
			this.appearances.forEach(appearance => {
			
				// link
				appearance.program = this.program;
	
				// initialize (skip if already done)
				appearance.GPU_initialize();
	
			});
		}
	}

	S8_render(){
		/* nothing to do */
	}


	/**
		 * 
		 * @param {SWGL_Environment} environment 
		 * @param {SWGL_View} view 
		 */
	WebGL_render(environment, view) {
		if(this.isReady) {

			// enable program
			this.program.enable();

			/**
			 * 
			 */
			this.program.bindEnvironment(environment);

			// render appearnce
			let nAppearances = this.appearances.length;

			for (let i = 0; i < nAppearances; i++) {

				/** @type {SWGL_Appearance} appearance */
				let appearance = this.appearances[i];

				if (appearance.GPU_isLoaded) {
					// bind appearance
					this.program.bindAppearance(appearance);

					// render the appearance
					appearance.WebGL_render(view);
				}
			}

			// disable program
			this.program.disable();
		}
	}


	S8_dispose(){
		
	}
	
};










