
/**
 * 
 */
function CAD3d_Segment(affine, u0, u1){
	this.affine = affine;
	this.vector = this.affine.matrix.getvector(2);
	this.u0 = u0;
	this.u1 = u1;
}


CAD3d_Segment.prototype = {

		
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

		draw : function(affine3, wire, settings){

			var offset = wire.vertices.length();
			
			// vertex 0
			var v0 = evaluatePoint(this.u0);
			var vertex0 = new MathVector3();
			affine3.transformVertex(new MathVector3(v0.x, v0.y, v0.z), vertex0);
			wire.vertices.push(vertex0);
			
			// vertex 1
			var v1 = evaluatePoint(this.u1);
			var vertex1 = new MathVector3();
			affine3.transformVertex(new MathVector3(v1.x, v1.y, v1.z), vertex1);
			wire.vertices.push(vertex1);
			
			// element
			wire.elements.push(offset+0, offset+1);
		},
		
		sweep :function(curve, surface, wire, shift, isEndLineEnabled){

		}
};
