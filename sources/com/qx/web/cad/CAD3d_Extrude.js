
/**
 * 
 */
function CAD3d_Extrude(affine, z0, z1){
	this.affine = affine;
	this.z0 = z0;
	this.z1 = z1;
	
	// <tesselate>
	var zVector = this.affine.matrix.getVector(2);

	// start
	var affine0 = new MathAffine3();
	this.affine.copy(affine0);
	this.affine.vector.integrate(zVector, this.z0, affine0.vector);

	// end
	var affine1 = new MathAffine3();
	this.affine.copy(affine1);
	this.affine.vector.integrate(zVector, this.z1, affine1.vector);

	this.affines = [affine0, affine1];
	
	// </tesselate>
}


CAD3d_Extrude.prototype = {

		constructor : CAD3d_Extrude,
		
		isClosed : false,

		nbSections : 2,

		evaluatePoint : function(u, result){
			this.affine.transformVertex(new MathVector3(0.0, 0.0, u), result);
		},

		evaluateAffine : function(u, result){
			this.affine.copy(result);
			result.vector.integrate(this.vector, u);
		},

		startPoint : function(result){
			this.point.integrate(this.vector, u0, result);
		},

		endPoint : function(result){
			this.point.integrate(this.vector, u1, result);
		},


		sweepLoop : CAD3d_Curve.prototype.sweepLoop,

		sweepCurve : CAD3d_Curve.prototype.sweepCurve,

		sweepPoint : CAD3d_Curve.prototype.sweepPoint

};
