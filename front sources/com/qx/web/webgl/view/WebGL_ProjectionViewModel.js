

/**
 * view for the scene
 */
function WebGL_ProjectionViewModel(up=new MathVector3d(0,0,1)){
	
	this.up = up;
	
	this.newRotationMatrix = new WebGL_Matrix4();
	
	// Eye
	this.eyePosition = new MathVector3d(1.0, 1.0, 1.0);
	this.eyeTarget = new MathVector3d(0.0, 0.0, 0.0);
	
	// Projection matrix
	this.matrix_Projection = new WebGL_Matrix4();
	this.matrix_Projection.perspectiveProjection(45, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);
	
	// View matrix 
	this.matrix_View = new WebGL_Matrix4();
	this.matrix_View.lookAt(this.eyePosition, this.eyeTarget, new MathVector3d(0.0, 0.0, 1.0));

	// Projection * View Matrix
	this.matrix_ProjectionView = new WebGL_Matrix4();
	this.matrix_ProjectionView.multiply(this.matrix_Projection, this.matrix_View);
	
	// view model matrix
	this.matrix_ViewModel = new WebGL_Matrix4();

	// projection view matrix
	this.matrix_ProjectionViewModel = new WebGL_Matrix4();
	
	// normal matrix (for shader rendering of normals)
	this.matrix_Normal = new WebGL_Matrix3();
	
	// model matrix
	this.matrix_Model = new WebGL_Matrix4();
}


WebGL_ProjectionViewModel.prototype = {

		
		
		/*
		 * set eye vector and eye target
		 */
		
		update : function(){
			
			// update view matrices
			this.matrix_View.lookAt(this.eyePosition, this.eyeTarget, this.up);
			this.matrix_ProjectionView.multiply(this.matrix_Projection, this.matrix_View);
		},

		
		setModel : function(modelAffine){
			// update model
			this.matrix_Model.setAffine(modelAffine);
			
			// re-compute everything...
			this.matrix_ProjectionViewModel.multiply(this.matrix_ProjectionView, this.matrix_Model);
			this.matrix_ViewModel.multiply(this.matrix_View, this.matrix_Model);
			this.matrix_Normal.transposeInverse4(this.matrix_ViewModel);
		}
};


