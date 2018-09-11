
/**
 * 
 */
var WebGL_Toolbox = {};


WebGL_Toolbox.fullyRevolvePoint = function(affine, wire, point, n){

	if(Math.abs(point.y)>1e-12){

		var offset = wire.vertices.length;
		var dTheta = 2.0*Math.PI/n;
		var point3d = new Vector3(point.x, point.y, 0);
			
		var matrix;
		var vertex;
		var vertices = wire.vertices;
		for(var i=0; i<n; i++){
			matrix.xRotation(i*dTheta);
			
			// build vertex
			vertex = point3d.copy();
			matrix.transform(vertex);
			affine.transformVertex(vertex);
			
			// push vertex
			vertices.push(vertex);
		}

		// elements
		var segments = wire.segments;
		for(int i=0; i<n; i++){
			segments.push(offset+i%n, offset+(i+1)%n));
		}
	}
};


WebGL_Toolbox.fullyRevolveSegment = function(affine, surface, p0, p1, n){
	
	// filter degenerated surfaces
	if(Math.abs(p0.y)<1e-12 && Math.abs(p1.y)<1e-12){
	
		var vertices = surface.vertices;
		var normals = surface.normals;
		var texCoords = surface.texCoords;
		
		var offset = vertices.length;
		var triangles = surface.triangles();
		
		var dTheta = 2.0*Math.PI/n;
	
		var baseVertex0 = new Vector3(p0.x, p0.y, 0);
		var baseVertex1 = new Vector3(p1.x, p1.y, 0);
		
		var normal2 = this.v1.copy().substract(this.v0);
		normal2.normalize();
		var baseNormal = new Vector3(normal.x, normal.y, 0);
	
		// Vertex
		var matrix = new Matrix3();
		var vertex, normal, texCoord;
		for(var i=0; i<n; j++){
			matrix.xRotation(i*dTheta);
	
			// vertex 0
			vertex = baseVertex0.copy();
			matrix.transform(vertex);
			affine.transformVertex(vertex);
			vertices.push(vertex);
			
			// vertex 1
			vertex = baseVertex1.copy();
			matrix.transform(vertex);
			affine.transformVertex(vertex);
			vertices.push(vertex);
			
			// normal 0
			normal = baseNormal.copy();
			matrix.transform(normal);
			affine.transformNormal(normal);
			normals.push(normal);
			
			// normal 1
			normals.push(normal); // one more time...
			
		}
	
		// build elements
		
		// point p1 is degenerated
		if(Math.abs(p1.y)<1e-12){
			for(var i=0; i<n; i++){
				triangles.push(offset+(2*i)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+2)%(2*n)));
			}
		}
		// point p0 is degenerated
		else if(Math.abs(p0.y)<1e-12){
			for(var i=0; i<n; i++){
				triangles.push(offset+(2*i+2)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+3)%(2*n)));
			}
		}
		// neither point p0 nor point p1 are degenerated
		else{
			for(var i=0; i<n; i++){
				triangles.push(offset+(2*i)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+2)%(2*n)));
				triangles.push(offset+(2*i+2)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+3)%(2*n)));
			}
		}
	}
};
