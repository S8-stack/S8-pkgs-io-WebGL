

/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_ShapeInstance(objectInstance){

	// keep tracking of wrapping object instance
	this.scene = objectInstance.scene;
	this.affines = objectInstance.affines;

	// rendering pipe handles
	this.wireStyleHandle = null;
	this.surfaceStyleHandle = null;
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
		
		
		setWireStyle : function(id){
			if(this.wireStyleHandle!=null){
				this.wireStyleHandle.isRemoved = true;
			}
			if(id!=null){
				this.wireStyleHandle = this.scene.getPipe(id).append(this);	
			}
		},

		setSurfaceStyle : function(id){
			if(this.surfaceStyleHandle!=null){
				this.surfaceStyleHandle.isRemoved = true;
			}
			if(id!=null){
				this.surfaceStyleHandle = this.scene.getPipe(id).append(this);	
			}
		},

		/**
		 * setStyle to a shape
		 */
		display : function(mode=0){
			switch(mode){
			
			case 0: // normal
				this.setWireStyle(this.wireProgram);
				this.setSurfaceStyle(this.surfaceProgram);
				break;
				
			case 1: // highlight
				this.setWireStyle(this.wireProgram);
				this.setSurfaceStyle("glow");
				break;
			}
		},
		

		dispose : function(){
			if(this.wireStyleHandle!=null){
				this.wireStyleHandle.isRemoved = true;
			}
			if(this.surfaceStyleHandle!=null){
				this.surfaceStyleHandle.isRemoved = true;
			}
		}
};
