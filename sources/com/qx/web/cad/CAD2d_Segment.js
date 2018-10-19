
/**
 * 
 */
function CAD2d_Segment(/*MathVector2*/ point, /*MathVector2*/ vector, u0, u1){
	this.point = point;
	this.vector = vector;
	this.u0 = u0;
	this.u1 = u1;

}


CAD2d_Segment.prototype = {

		length : function(){
			return this.u1 - this.u0;
		}

		evaluatePoint : function(u, result){
			this.point.integrate(this.vector, u, result);
		},
		
		evaluateAffine : function(u, result){
			this.point.integrate(this.vector, u, result.vector);
			result.matrix.setOrthoX(this.vector);
		},

		startPoint : function(result){
			this.point.integrate(this.vector, u0, result);
		},

		endPoint : function(result){
			this.point.integrate(this.vector, u1, result);
		},
		
		normal : function(result){
			this.vector.orthogonal(false, result);
		},

		draw : function(affine3, wire, settings){

			var offset = wire.vertices.length();
			
			// vertex 0
			var v0 = evaluatePoint(this.u0);
			var vertex0 = new MathVector3();
			affine3.transformVertex(new MathVector3(v0.x, v0.y, 0.0), vertex0);
			wire.vertices.push(vertex0);
			
			// vertex 0
			var v1 = evaluatePoint(this.u1);
			var vertex1 = new MathVector3();
			affine3.transformVertex(new MathVector3(v1.x, v1.y, 0.0), vertex1);
			wire.vertices.push(vertex1);
			
			// element
			wire.elements.push(offset+0, offset+1);
		}

};
