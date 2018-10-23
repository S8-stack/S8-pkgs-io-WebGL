

/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_ShapeInstance(objectInstance, index, styles){

	// keep tracking of wrapping object instance
	this.objectInstance = objectInstance;
	
	// build id
	this.id = objectInstance.id+'-'+index;

	// index
	this.index = index;

	// flag 
	this.isInitialized = false;

	// mode styles
	this.styles = styles;
}


WebGL_ShapeInstance.prototype = {

		render : function(matrixStack, program){
			
			// try to initialize if not already done
			if(!this.isInitialized){
				if(this.objectInstance.model.isInitialized){
					this.model = this.objectInstance.model.shapes[this.index];
					this.isInitialized = true;
				}
			}
			
			// render if OK
			if(this.isInitialized){
				var that = this;
				
				// bind vertex attributes
				program.bindVertexAttributes(this.model);
				
				// update matrixStack.instanceAffine
				this.objectInstance.pattern(matrixStack.instanceAffine, function(){
		
					// bind model elements
					that.model.render(matrixStack, program);
				});		
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
