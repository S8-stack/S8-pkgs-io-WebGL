
/**
 * 
 */
function CAD3d_Curve(){
	this.isTesselated = false;
}


CAD3d_Curve.prototype = {

		
		
		sweepLoop : function(loop, surface, wire, shift){

			var nbCurves = loop.curves.length;
			for(var i in loop.curves){
				this.sweepCurve(loop.curves[i], surface, wire, loop.isClosed && i==nbCurves-1, shift);
			}
			
			loop.draw(this.affines[0], wire, shift);
			loop.draw(this.affines[this.affines.length-1], wire, shift);
			
		},
		
		sweepCurve : function(curve, surface, wire, isEndEnabled, shift){

			// <surface>
			var vertices = surface.vertices;
			var offset = vertices.getNumberOfVectors();
			var normals = surface.normals;
			
			var vertex, normal;

			// lengths
			var n = curve.nbVertices, p=this.nbSections;

			// sections
			var affine;

			vertices.expand(n*p);
			normals.expand(n*p);
			for(var i=0; i<p; i++){
				affine = this.affines[i];

				// vertices
				for(var j=0; j<n; j++){

					// vertex
					vertex = new MathVector3();
					curve.vertices[j].copy(vertex);
					affine.transformVertex(vertex, vertex);
					vertices.push(vertex);

					// normal
					normal = new MathVector3();
					curve.normals[j].copy(normal);
					affine.transformVector(normal, normal);
					normals.push(normal);
				}
			}


			// elements
			var elements = surface.elements;
			elements.expand(2*(this.isClosed?p:(p-1))*(curve.isClosed?n:(n-1)));
			
			// sections
			for(var i=0; i<p-1; i++){
				// vertices
				for(var j=0; j<n-1; j++){
					elements.push(offset+i*n+j, offset+i*n+j+1, offset+(i+1)*n+j);
					elements.push(offset+i*n+j+1, offset+(i+1)*n+j+1, offset+(i+1)*n+j);
				}
				if(curve.isClosed){
					elements.push(offset+i*n+(n-1), offset+i*n+0, offset+(i+1)*n+(n-1));
					elements.push(offset+i*n+0, offset+(i+1)*n+0, offset+(i+1)*n+(n-1));
				}
			}
			if(this.isClosed){
				// vertices
				for(var j=0; j<n-1; j++){
					elements.push(offset+(p-1)*n+j+0, offset+(p-1)*n+j+1, offset+0*n+j);
					elements.push(offset+(p-1)*n+j+1, offset+0*n+j+1, offset+0*n+j);
				}
			}
			// </surface>

			// <wire>
			if(!curve.isClosed){

				// <start-wire>
				var point0 = new MathVector2();
				curve.vertices[0].integrate(curve.normals[0], shift, point0);
				this.sweepPoint(point0, wire);
				// </start-wire>

				// <end-wire>
				if(!this.isClosed && this.isEndEnabled){
					var point1 = new MathVector2();
					var p = this.nbVertices-1;
					this.vertices[p].integrate(this.normals[p], shift, point1);
					this.sweepPoint(point1, wire);
				}
				// </end-wire>	
			}

			// </wire>
		},


		sweepPoint : function(point, wire){

			// <surface>
			var vertices = wire.vertices;
			var offset = vertices.getNumberOfVectors();

			var point3d = new MathVector3();
			point.copy(point3d);
			var vertex;

			// sections
			vertices.expand(this.nbSections);
			for(var i=0; i<this.nbSections; i++){
				vertex = new MathVector3();
				this.affines[i].transformVertex(point3d, vertex);
				vertices.push(vertex);
			}

			// elements
			var elements = wire.elements;
			elements.expand(this.isClosed?this.nbSections:this.nbSections-1);
			// sections
			for(var i=0; i<this.nbSections-1; i++){
				elements.push(offset+i, offset+i+1);
			}
			if(this.isClosed){
				elements.push(offset+this.nbSections-1, offset+0);
			}
		}
};
