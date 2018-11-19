

/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_ShapeInstance(objectInstance, shapeModel){

	// keep tracking of wrapping object instance
	this.objectInstance = objectInstance;

	// wire
	this.wireColor = shapeModel.wireColor;
	
	this.wireVertices = shapeModel.wireVertices;
	this.wireElements = shapeModel.wireElements;

	// surface
	this.surfaceGlossiness = shapeModel.surfaceGlossiness;
	this.surfaceRoughness = shapeModel.surfaceRoughness;
	this.surfaceSpecularColor = shapeModel.surfaceSpecularColor;
	this.surfaceDiffuseColor = shapeModel.surfaceDiffuseColor;
	
	this.surfaceVertices = shapeModel.surfaceVertices;
	this.surfaceNormals = shapeModel.surfaceNormals;
	this.surfaceElements = shapeModel.surfaceElements;
	
	
	this.wireStyleHandle = null;
	this.surfaceStyleHandle = null;
}


WebGL_ShapeInstance.prototype = {

		render : function(matrixStack, program){

			// bind vertex attributes buffer handles (program is doing the
			// picking of the appropriate vertices attributes)
			program.attachShape(this);

			// affine
			for(let affine of this.objectInstance.affines){
				
				// update stack
				matrixStack.setModel(affine);

				// bind matrices
				// trigger render by drawing elements
				//gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
				program.draw(matrixStack, this);
			}			
		},
		
		
		setWireStyle : function(id){
			if(this.wireStyleHandle!=null){
				this.wireStyleHandle.isRemoved = true;
			}
			var handle = scene.styles.get(id).append();
			this.wireStyleHandle = handle;
			handle.renderable = this;	
		},

		setSurfaceStyle : function(id){
			if(this.surfaceStyleHandle!=null){
				this.surfaceStyleHandle.isRemoved = true;
			}
			var handle = scene.styles.get(id).append();
			this.surfaceStyleHandle = handle;
			handle.renderable = this;	
		},

		/**
		 * setStyle to a shape
		 */
		reset : function(){
			this.setWireStyle("darkWire");
			this.setSurfaceStyle("mirror");
		},
		
		highlight : function(){
			//this.setWireStyle("darkWire");
			this.setSurfaceStyle("yellowGlow");
		},

		dispose : function(){
			// detach form current style if any
			if(this.style!=undefined){
				this.style.remove(this.id);	
			}
		}
};
