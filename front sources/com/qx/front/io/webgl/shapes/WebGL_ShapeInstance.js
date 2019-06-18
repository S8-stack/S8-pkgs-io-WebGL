

/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_ShapeInstance(scene, affines){
	
	this.scene = scene;
	this.affines = affines;
	
	// rendering pipe handles
	this.wirePipeHandle = null;
	this.surfacePipeHandle = null;
}


WebGL_ShapeInstance.prototype = {

		render : function(view, program){

			// bind vertex attributes buffer handles (program is doing the
			// picking of the appropriate vertices attributes)
			program.attachShape(this);

			// affine
			for(let affine of this.affines){
				
				// update stack
				view.setModel(affine);

				// bind matrices
				// trigger render by drawing elements
				//gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
				program.draw(view, this);
			}
		},
		
		
		setWireProgram : function(prgmId){
			if(this.isWireEnabled && prgmId!=this.wireProgramId){
				if(this.wirePipeHandle!=null){
					this.wirePipeHandle.isRemoved = true;
				}
				this.wireProgramId = prgmId;
				if(prgmId!=null){
					this.wirePipeHandle = this.scene.getPipe(prgmId).append(this);	
				}	
			}
		},

		setSurfaceProgram : function(prgmId){
			if(this.isSurfaceEnabled && prgmId!=this.surfaceProgramId){
				if(this.surfacePipeHandle!=null){
					this.surfacePipeHandle.isRemoved = true;
				}
				this.surfaceProgramId = prgmId;
				if(prgmId!=null){
					this.surfacePipeHandle = this.scene.getPipe(prgmId).append(this);	
				}
			}
		},

		dispose : function(){
			if(this.wirePipeHandle!=null){
				this.wirePipeHandle.isRemoved = true;
			}
			if(this.surfacePipeHandle!=null){
				this.surfacePipeHandle.isRemoved = true;
			}
		}
};
