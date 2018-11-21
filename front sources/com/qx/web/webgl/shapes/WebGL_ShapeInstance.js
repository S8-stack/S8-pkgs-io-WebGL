

/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_ShapeInstance(objectInstance, shapeModel){

	// keep tracking of wrapping object instance
	this.scene = objectInstance.scene;
	this.affines = objectInstance.affines;
	
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
			this.wireStyleHandle = this.scene.getPipe(id).append(this);
		},

		setSurfaceStyle : function(id){
			if(this.surfaceStyleHandle!=null){
				this.surfaceStyleHandle.isRemoved = true;
			}
			this.surfaceStyleHandle = this.scene.getPipe(id).append(this);
		},

		/**
		 * setStyle to a shape
		 */
		reset : function(){
			this.setWireStyle("color2");
			this.setSurfaceStyle("standard");
		},
		
		highlight : function(){
			//this.setWireStyle("darkWire");
			this.setSurfaceStyle("glow");
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
