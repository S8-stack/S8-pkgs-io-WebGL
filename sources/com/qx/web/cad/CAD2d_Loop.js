
/**
 * @param curves : CAD2d_Curve[]
 * @param isClosed : boolean
 */
function CAD2d_Loop(curves, isClosed){
	this.curves = curves;
	this.isClosed = isClosed;
}


CAD2d_Loop.prototype = {
	
	draw : function(affine3d, wire, settings){
		for(let curve of this.curves){
			curve.draw(affine3d, wire, settings);
		}
	},
	
	extrude : function(affine3d, z0, z1, surface, wire, settings){
		
		
		// start
		var affine0 = new MathAffine3();
		affine3d.copy(affine0);
		affine3d.vector.integrate(affine3d.matrix.getVector(2), z0, affine0.vector);
		this.draw(affine0, wire, settings);
		
		// end
		var affine1 = new MathAffine3();
		affine3d.copy(affine1);
		affine3d.vector.integrate(affine3d.matrix.getVector(2), z1, affine1.vector);
		this.draw(affine1, wire, settings);
		
		var nbCurves = this.curves.length;
		for(var i in this.curves){
			this.curves[i].extrude(affine3d, z0, z1, surface, wire, settings, !this.isClosed && i==nbCurves);
		}
	}

};
