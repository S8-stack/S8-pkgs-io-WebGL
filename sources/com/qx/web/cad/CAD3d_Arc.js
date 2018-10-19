
/**
 * 
 * @param affine3d : MathAffine3 position of the rotation matrix in space
 * @param affine2d : MathAffine2 position of sketch origin within the swept plane of the revolution
 * 
 */
function CAD3d_Arc(affine3d, affine2d, theta0, theta1){
	this.affine3d = affine3d;
	this.affine2d = affine2d;

	// angles
	this.theta0 = theta0;
	this.theta1 = theta1;
	this.isClosed = Math.abs(this.theta1-this.theta0-2.0*Math.PI)<1e-6;

	this.isTesselated = false;
}


CAD3d_Arc.prototype = {

		constructor : CAD3d_Arc,
	
		evaluateAffine : function(theta, result){
			this.affine3d
			result.vector.radial(this.r, theta);
			this.affine.transformVertex(result.vector, result.vector);
			var rotationMatrix = new MathMatrix3();
			rotationMatrix.zRotation(theta+Math.PI/2.0);
			affine.matrix.multiply(rotationMatrix, result.matrix);
		},

		startPoint : function(result){
			result.radial(this.r, theta);
			this.affine.transformVertex(result.vector, result.vector);
		},

		endPoint : function(result){
			this.point.integrate(this.vector, u1, result);
		},

		tesselate : function(settings){

			if(!this.isTesselated){

				var n = Math.ceil((this.theta1-this.theta0)/(2.0*Math.PI)*settings.n);
				var dTheta = (this.theta1-this.theta0)/n;
				this.nbSections = this.isClosed?n:(n+1);

				this.affines = new Array(this.nbSections);

				var sectionAffine;
				var curvePoint = new MathMatrix3();
				var rotationMatrix = new MathMatrix3();
				
				var vector2d = this.affine2d.vector;
				var sketchVector = new MathVector3(vector2d.x, vector2d.y);
				
				var matrix2d = this.affine2d.matrix;
				var sketchMatrix = new MathMatrix3();
				sketchMatrix.set(matrix2d.c0, matrix2d.c1, 0.0, matrix2d.c2, matrix2d.c3, 0.0, 0.0, 0.0, 0.0);
				var sketchAffine = new MathAffine3(sketchVector, sketchMatrix);
				
				// sections
				for(var i=0; i<this.nbSections; i++){
					sectionAffine = new MathAffine3();
					this.affine3d.copy(sectionAffine)
					rotationMatrix.xRotation(this.theta0+i*dTheta);
					sectionAffine.matrix.multiply(rotationMatrix, sectionAffine.matrix);
					sectionAffine.multiply(sketchAffine, sectionAffine);
					this.affines[i] = sectionAffine;
				}
				this.isTesselated = true;
			}
		},

		sweepLoop : CAD3d_Curve.prototype.sweepLoop,
		
		sweepCurve : CAD3d_Curve.prototype.sweepCurve,
		
		sweepPoint : CAD3d_Curve.prototype.sweepPoint
		
};
