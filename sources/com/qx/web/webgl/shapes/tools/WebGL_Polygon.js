
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

	// build face normals
	var nbPoints = this.vertices.length;
	this.normals = new Array();
	var normal;
	for(var i=0; i<nbVertices-1; i++){
		this.normals.push(WebGL_Toolbox.segmentNormal(this.vertices[i], this.vertices[i+1]));
	}
	if(this.isClosed){
		this.normals.push(WebGL_Toolbox.segmentNormal(this.vertices[nbPoints-1], this.vertices[0]));
	}
}


WebGL_Polygon.prototype = {
		
	shift : 0.0005,
		
	fullyRevolve : function(affine, wire, surface, settings){
		
		
		var nbVertices = this.vertices.length;
		var vertex;

		// wire
		var normal = new Vector2(), vertex = new Vector2();
		for(var i=0; i<nbVertices; i++){
			
			normal.copy(this.normals[i]);
			normal.add(this.normals[(i+1)%nbVertices]);
			normal.normalize();
			
			vertex.copy(this.vertices[(i+1)%nbVertices]);
			vertex.integrate(normal, this.shift);
			
			// revolve point
			WebGL_Toolbox.fullyRevolvePoint(affine, wire, vertex, settings);
		}	
		
		// surface
		for(var i=0; i<nbVertices-1; i++){
			WebGL_Toolbox.fullyRevolveSegment(affine, surface, this.vertices[i], this.vertices[i+1], settings);
		}
		if(this.isClosed){
			WebGL_Toolbox.fullyRevolveSegment(affine, surface, this.vertices[nbVertices-1], this.vertices[0], settings);
		}
	}
};
