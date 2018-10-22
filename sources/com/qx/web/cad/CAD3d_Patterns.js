
var CAD3d_Patterns = {};


CAD3d_Patterns.pattern_XY = function(renderable, affine, nx, xPitch, ny, yPitch, result){
	var nbInstances = nx*ny;
	var nbVertices = renderable.getNumberOfVertices();
	result.expand(nbVertices*nbInstances, renderable.getNumberOfElements()*nbInstances);
	var itemAffine = new MathAffine3();
	affine.copy(itemAffine);
	var offset=0;
	
	for(var ix=0; ix<nx; ix++){
		for(var iy=0; iy<ny; iy++){
			
			// affine
			affine.vector.add(new MathVector3(ix*xPitch, iy*yPitch, 0.0), itemAffine.vector);
			
			renderable.transform(itemAffine, result, offset);
			offset+=nbVertices;
		}
	}
}
