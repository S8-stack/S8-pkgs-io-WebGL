

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
	this.surfaceRoughness = shapeModel.surfaceRoughness;
	this.surfaceSpecularity = shapeModel.surfaceSpecularity;
	this.surfaceSpecularColor = shapeModel.surfaceSpecularColor;
	this.surfaceDiffuseColor = shapeModel.surfaceDiffuseColor;
	
	this.surfaceVertices = shapeModel.surfaceVertices;
	this.surfaceNormals = shapeModel.surfaceNormals;
	this.surfaceElements = shapeModel.surfaceElements;
}


WebGL_ShapeInstance.prototype = {

		render : function(matrixStack, program){

			// bind vertex attributes buffer handles (program is doing the
			// picking of the appropriate vertices attributes)
			program.bindShape(this);

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

		/**
		 * setStyle to a shape
		 */
		start : function(mode){

			// append to new style
			var style = scene.styles.get("darkWire");
			style.append(this);
			
			// append to new style
			style = scene.styles.get("shinyBluePlastic");
			style.append(this);
		},

		dispose : function(){
			// detach form current style if any
			if(this.style!=undefined){
				this.style.remove(this.id);	
			}
		}
};
