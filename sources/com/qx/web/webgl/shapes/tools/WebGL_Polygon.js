
/**
 * 
 */
function WebGL_Polygon(data, isClosed){
	
	// store vertices
	var nbVertices = data.length/2;
	this.vertices = new Array();
	for(var i=0; i<nbVertices; i++){
		this.vertices.push(new Vector2(data[2*i+0], data[2*i+1]));
	}
	
	// indicate if closed or not
	this.isClosed = isClosed;

	// build normals
	var nbPoints = this.vertices.length;
	this.normals = new Array();
	var normal;
	for(var i=0; i<nbPoints-1; i++){
		this.normals.push(WebGL_Toolbox.segmentNormal(this.vertices[i], this.vertices[i+1]));
	}
	if(this.isClosed){
		this.normals.push(WebGL_Toolbox.segmentNormal(this.vertices[nbPoints-1], this.vertices[0]));
	}
}


WebGL_Polygon.prototype = {
		
	shift : 0.01,
		
	fullyRevolve : function(affine, wire, surface, n, isWireEndingsEnabled){
		
		var nbVertices = this.vertices.length;
		var vertex;

		// wire
		var normal, vertex;
		for(var i=0; i<nbVertices; i++){
			normal = this.normals[i].copy();
			normal.add(this.normals[(i+1)%nbVertices]);
			normal.normalize();
			
			vertex = this.vertices[(i+1)%nbVertices].copy();
			vertex.integrate(normal, this.shift);
			
			// revolve point
			WebGL_Toolbox.fullyRevolvePoint(affine, wire, vertex, n);
		}	
		
		// surface
		var normal, vertex;
		for(var i=0; i<nbVertices-1; i++){
			WebGL_Toolbox.fullyRevolveSegment(affine, surface, this.vertices[i], this.vertices[i+1], n);
		}
		if(this.isClosed){
			WebGL_Toolbox.fullyRevolveSegment(affine, surface, this.vertices[nbVertices-1], this.vertices[0], n);
		}
	}
};
