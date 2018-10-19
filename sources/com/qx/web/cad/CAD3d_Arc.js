
/**
 * 
 * @param affine : MathAffine3
 */
function CAD3d_Arc(affine, r, theta0, theta1){
	this.affine = affine;
	this.r = r;
	this.theta0 = theta0;
	this.theta1 = theta1;
}


CAD3d_Arc.prototype = {
		
		constructor : CAD3d_Arc,

		evaluatePoint : function(theta, result){
			result.radial(this.r, theta);
			this.affine.transformVertex(result, result);
		},
		
		evaluateAffine : function(theta, result){
			result.vector.radial(this.r, theta);
			this.affine.transformVertex(result.vector, result.vector);
			MathMatrix3 rotationMatrix = new MathMatrix3();
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

		draw : function(affine3, wire, settings){

			var isClosed = (this.theta1-this.theta0)<1e-8;
			var n = Math.ceil((this.theta1-this.theta0)/(2.0*Math.PI)*settings.n);

			var offset = wire.vertices.length();
			var dTheta = (this.theta1-this.theta0)/n;
			var point3d = new MathVector3();

			var matrix = new MathMatrix3();
			var vertex;
			var vertices = wire.vertices;
			var offset = vertices.length();

			var theta;
			var nbVertices=isClosed?n:(n+1);
			for(var i=0; i<nbVertices; i++){
				theta = this.theta0+i*dTheta;
				evaluatePoint(point3d);

				// build vertex
				vertex = new MathVector3();
				affine.transformVertex(point3d, vertex);

				// push vertex
				vertices.push(vertex);
			}

			// elements
			var elements = wire.elements;
			for(var i=0; i<n-1; i++){
				elements.push(offset+i, offset+(i+1));
			}
			if(isClosed){
				elements.push(offset+n-1, offset+0);
			}
			else{
				elements.push(offset+n-1, offset+n);
			}
		}
};
