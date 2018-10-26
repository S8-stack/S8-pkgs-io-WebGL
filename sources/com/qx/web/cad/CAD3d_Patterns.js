
var CAD3d_Patterns = {};


CAD3d_Patterns.pattern_XY = function(affine, nx, xPitch, ny, yPitch){

	var itemAffine = new MathAffine3();
	affine.copy(itemAffine);

	var func = function(targetMatrix, callback){
		affine.vector.copy(itemAffine.vector);
		for(var ix=0; ix<nx; ix++){
			for(var iy=0; iy<ny; iy++){
				// affine
				affine.vector.add(new MathVector3(ix*xPitch, iy*yPitch, 0.0), itemAffine.vector);
				itemAffine.copy(targetMatrix);
				callback();
			}
		}
	};
	
	func.nbInstances = nx*ny;
	
	return func;
}
