
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

			var offset;
			
			/* <CAD2d_Segment> */
			if(curve instanceof CAD2d_Segment){
				
				var affine0 = evaluateAffine(this.u0);
				
				// vertex 0
				var surfaceVertex0 = new MathVector3(), surfaceNormal0 = new MathVector3();
				curve.startPoint(surfaceVertex0);
				affine0.transformVertex(surfaceVertex0, surfaceVertex0);
				curve.normal(surfaceNormal0);
				affine0.transformNormal(surfaceNormal0, surfaceNormal0);
				surface.vertices.push(surfaceVertex0);
				surface.vertices.push(surfaceNormal0);
				
				// vertex 1
				var surfaceVertex1 = new MathVector3(), surfaceNormal1 = new MathVector3();
				curve.startPoint(surfaceVertex1);
				affine0.transformVertex(surfaceVertex1, surfaceVertex1);
				curve.normal(surfaceNormal1);
				affine0.transformNormal(surfaceNormal1, surfaceNormal1);
				surface.vertices.push(surfaceVertex1);
				surface.vertices.push(surfaceNormal1);
				
				// vertex 2
				var surfaceVertex2 = new MathVector3(), surfaceNormal2 = new MathVector3();
				curve.startPoint(surfaceVertex2);
				affine1.transformVertex(surfaceVertex2, surfaceVertex2);
				curve.normal(surfaceNormal2);
				affine1.transformNormal(surfaceNormal2, surfaceNormal2);
				surface.vertices.push(surfaceVertex2);
				surface.vertices.push(surfaceNormal2);
				
				// vertex 3
				var surfaceVertex3 = new MathVector3(), surfaceNormal3 = new MathVector3();
				curve.startPoint(surfaceVertex3);
				affine1.transformVertex(surfaceVertex3, surfaceVertex3);
				curve.normal(surfaceNormal3);
				affine1.transformNormal(surfaceNormal3, surfaceNormal3);
				surface.vertices.push(surfaceVertex3);
				surface.vertices.push(surfaceNormal3);
				
				offset = surface.elements.length();
				surface.elements.push(offset+0, offset+1, offset+2);
				surface.elements.push(offset+1, offset+3, offset+2);
				
				var shift = curve.length()*settings.shift;
				
				// line 0
				var wireVertex0 = new MathVector3();
				surfaceVertex0.integrate(surfaceNormal0, shift, wireVertex0);
				wire.vertices.push(wireVertex0);
				
				var wireVertex2 = new MathVector3();
				surfaceVertex2.integrate(surfaceNormal0, shift, wireVertex2);
				wire.vertices.push(wireVertex2);
				
				offset = surface.elements.length();
				wire.elements.push(offset+0, o

					// line 1
				if(isClosingLoop){
					var wireVertex1 = new MathVector3();
					surfaceVertex1.integrate(surfaceNormal1, shift, wireVertex1);
					wire.vertices.push(wireVertex1);
					
					var wireVertex3 = new MathVector3();
					surfaceVertex3.integrate(surfaceNormal3, shift, wireVertex3);
					wire.vertices.push(wireVertex3);
					
					offset = surface.elements.length();
					wire.elements.push(offset+0, offset+1);
				}
			}
			/* </CAD2d_Segment> */
			
			/* <CAD2d_Arc> */
			else if(curve instance of CAD2d_Arc){
				
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
		}
};
