
/**
 * 
 */
var WebGL_Toolbox = {};


WebGL_Toolbox.segmentNormal = function(p0, p1){
	 var normal = new MathVector2();
	 p1.substract(p0, normal);
	 normal.normalize(normal);
	 normal.orthogonal(false, normal);
	 return normal;
}

WebGL_Toolbox.fullyRevolvePoint = function(affine, wire, point, settings){

	if(Math.abs(point.y)>1e-12){

		var n = settings.n;

		var offset = wire.vertices.length();
		var dTheta = 2.0*Math.PI/n;
		var point3d = new MathVector3(point.x, point.y, 0);
			
		var matrix = new MathMatrix3();
		var vertex;
		var vertices = wire.vertices;
		var offset = vertices.length();
		
		for(var i=0; i<n; i++){
			matrix.xRotation(i*dTheta);
			
			// build vertex
			vertex = new MathVector3();
			point3d.copy(vertex);
			matrix.transform(vertex, vertex);
			
			// push vertex
			vertices.push(vertex);
		}

		// elements
		var elements = wire.elements;
		for(var i=0; i<n; i++){
			elements.push(offset+i%n, offset+(i+1)%n);
		}
	}
};


WebGL_Toolbox.fullyRevolveSegment = function(affine, surface, p0, p1, settings){
	
	// filter degenerated surfaces
	if(Math.abs(p0.y)>1.0e-12 || Math.abs(p1.y)>1.0e-12){
		
		var n = settings.n;
	
		var vertices = surface.vertices;
		var normals = surface.normals;
		var texCoords = surface.texCoords;
		
		var offset = vertices.length();
		var elements = surface.elements;
		
		var dTheta = 2.0*Math.PI/n;
	
		var baseVertex0 = new MathVector3(p0.x, p0.y, 0);
		var baseVertex1 = new MathVector3(p1.x, p1.y, 0);
		
		var normal2 = new MathVector2();
		p1.substract(p0, normal2);
		normal2.orthogonal(false, normal2);
		normal2.normalize(normal2);
		var baseNormal = new MathVector3(normal2.x, normal2.y, 0);
	
		// Vertex
		var matrix = new MathMatrix3();
		var vertex, normal;
		texCoord = new MathVector2();
		
		for(var i=0; i<n; i++){
			matrix.xRotation(i*dTheta);
	
			// vertex 0
			vertex = new MathVector3();
			baseVertex0.copy(vertex);
			matrix.transform(vertex, vertex);
			affine.transformVertex(vertex, vertex);
			vertices.push(vertex);
			
			// vertex 1
			vertex = new MathVector3();
			baseVertex1.copy(vertex);
			matrix.transform(vertex, vertex);
			affine.transformVertex(vertex, vertex);
			vertices.push(vertex);
			
			// normal 0
			normal = new MathVector3();
			baseNormal.copy(normal);
			matrix.transform(normal, normal);
			affine.transformNormal(normal, normal);
			normals.push(normal);
			
			// normal 1
			normal2 = new MathVector3();
			normal.copy(normal2);
			normals.push(normal2); // one more time...
			
		}
	
		// build elements
		
		// point p1 is degenerated
		if(Math.abs(p1.y)<1e-12){
			for(var i=0; i<n; i++){
				elements.push(offset+(2*i)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+2)%(2*n));
			}
		}
		// point p0 is degenerated
		else if(Math.abs(p0.y)<1e-12){
			for(var i=0; i<n; i++){
				elements.push(offset+(2*i+2)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+3)%(2*n));
			}
		}
		// neither point p0 nor point p1 are degenerated
		else{
			for(var i=0; i<n; i++){
				elements.push(offset+(2*i)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+2)%(2*n));
				elements.push(offset+(2*i+2)%(2*n), offset+(2*i+1)%(2*n), offset+(2*i+3)%(2*n));
			}
		}
	}
};
