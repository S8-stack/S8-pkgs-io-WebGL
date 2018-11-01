
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeRenderable(mesh, instanceAffines){
	
	// load mesh elements data
	this.elementType = mesh.getElementType();
	this.nbElements = mesh.elements.length;
	this.elementBufferHandle = mesh.elements.bufferHandle;
	
	// do tensor product of (instance/model) affines
	var nbModelAffines = mesh.affines.length;
	var nbInstanceAffines = instanceAffines.length;

	this.affines = new Array(nbModelAffines*nbInstanceAffines);
	var index=0;
	var affine;
	for(let instanceAffine of instanceAffines){
		for(let modelAffine of mesh.affines){
			affine = new MathAffine3();
			instanceAffine.multiply(modelAffine, affine);
			this.affines[index] = affine;
			index++;
		}
	}
}


WebGL_ShapeRenderable.prototype = {

		render : function(matrixStack, program){

			/* bind vertex attributes buffer handles (program is doing the
			picking of the appropriate vertices attributes) */
			program.bindVertexAttributes(this);

			/* bind elements buffer (only one element buffer) */
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBufferHandle);

			for(let affine of this.affines){

				// update stack
				matrixStack.setModel(affine);

				// bind matrices
				program.bindMatrixStack(matrixStack);

				// trigger render by drawing elements
				gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
			}
		}
};
