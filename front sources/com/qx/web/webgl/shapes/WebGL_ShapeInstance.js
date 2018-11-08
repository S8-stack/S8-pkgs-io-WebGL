

/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_ShapeInstance(objectInstance, index){

	// keep tracking of wrapping object instance
	this.objectInstance = objectInstance;

	// build id
	this.id = objectInstance.id+'-'+index;

	// index
	this.index = index;

	// flag 
	this.isInitialized = false;
}


WebGL_ShapeInstance.prototype = {

		render : function(matrixStack, program){

			// try to initialize if not already done
			if(!this.isInitialized && this.objectInstance.model.isInitialized){
				this.model = this.objectInstance.model.shapes[this.index];
				this.isInitialized = true;
			}

			// render according to lod (level of details) if OK
			if(this.isInitialized){
				
				// bind vertex attributes buffer handles (program is doing the
				// picking of the appropriate vertices attributes)
				program.bindShape(this);
				
				for(let affine of this.objectInstance.affines){
					// update stack
					matrixStack.setModel(affine);
					
					// bind matrices
					program.bindMatrixStack(matrixStack);

					// trigger render by drawing elements
					//gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
					this.elements.draw();
				}
			}
		},

		/**
		 * setStyle to a shape
		 */
		setMode : function(mode){

			// detach form current style if any
			if(this.style!=undefined){
				this.style.remove(this.id);	
			}

			// append to new style
			var styleId = this.styles[mode];
			this.style = scene.styles.get(styleId);
			this.style.append(this);
		},

		dispose : function(){
			// detach form current style if any
			if(this.style!=undefined){
				this.style.remove(this.id);	
			}
		}
};


function WebGL_RenderableWire(objectInstance, index, styles){
	WebGL_ShapeInstance.call(objectInstance, index, styles);
}

function WebGL_RenderableSurface(){
	
}

