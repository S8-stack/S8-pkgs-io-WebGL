
/**
 * 
 */
function CAD_Polygon(data, isClosed){
	
	// store vertices
	var nbVertices = data.length/2;
	this.vertices = new Array();
	for(var i=0; i<nbVertices; i++){
		this.vertices.push(new Math2d_Vector(data[2*i+0], data[2*i+1]));
	}
	
	// indicate if closed or not
	this.isClosed = isClosed;

	// build face normals
	var nbPoints = this.vertices.length;
	for(var i=0; i<nbVertices-1; i++){
		this.vertices[i].next = this.vertices[i+1];
		this.vertices[i+1].previous = this.vertices[i];
	}
	if(this.isClosed){
		this.vertices[nbVertices-1].next = this.vertices[0];
		this.vertices[0].previous = this.vertices[nbVertices-1];
	}
	
	
	var normal;
	for(let vertex of this.vertices){
		normal = new Math2d_Vector();
		if(vertex.previous!=undefined){
			CAD_Toolbox.segmentNormal(vertex.previous, vertex).add(normal, normal);
		}
		if(vertex.next!=undefined){
			CAD_Toolbox.segmentNormal(vertex, vertex.next).add(normal, normal);
		}
		normal.normalize(normal);
		vertex.normal = normal;
	}
}


CAD_Polygon.prototype = {
		
	shift : 0.0005,
		
	fullyRevolve : function(affine, wire, surface, settings){
		
		
		var nbVertices = this.vertices.length;
		var vertex;

		// wire
		var normal = new Math2d_Vector(), vertex = new Math2d_Vector();
		for(var i=0; i<nbVertices-1; i++){
			
			this.vertices[i].copy(vertex);
			vertex.integrate(this.vertices[i].normal, this.shift, vertex);
			
			// revolve point
			CAD_Toolbox.fullyRevolvePoint(affine, wire, vertex, settings);
		}
		
		// surface
		for(var i=0; i<nbVertices-1; i++){
			CAD_Toolbox.fullyRevolveSegment(affine, surface, this.vertices[i], this.vertices[i+1], settings);
		}
		if(this.isClosed){
			CAD_Toolbox.fullyRevolveSegment(affine, surface, this.vertices[nbVertices-1], this.vertices[0], settings);
		}
	}
};
