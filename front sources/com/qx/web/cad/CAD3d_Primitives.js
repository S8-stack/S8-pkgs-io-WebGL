
/**
 * 
 */
var CAD3d_Primitives = {};


CAD3d_Primitives.createHexahedron = function(wire, surface, ax, ay, az, shift){
	
	ax/=2.0;
	ay/=2.0;
	az/=2.0;
	
	var offset = surface.vertices.length;
	
	// face ax+
	surface.pushVertex(new Math3d_Vector( ax,-ay,-az));
	surface.pushVertex(new Math3d_Vector( ax, ay,-az));
	surface.pushVertex(new Math3d_Vector( ax, ay, az));
	surface.pushVertex(new Math3d_Vector( ax,-ay, az));
	surface.pushNormal(new Math3d_Vector( 1.0, 0.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 1.0, 0.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 1.0, 0.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 1.0, 0.0, 0.0));
	surface.pushTriangle(offset+0, offset+1, offset+2);
	surface.pushTriangle(offset+2 ,offset+3, offset+0);
	offset+=4;
	
	// face ax-
	surface.pushVertex(new Math3d_Vector(-ax, ay,-az));
	surface.pushVertex(new Math3d_Vector(-ax,-ay,-az));
	surface.pushVertex(new Math3d_Vector(-ax,-ay, az));
	surface.pushVertex(new Math3d_Vector(-ax, ay, az));
	surface.pushNormal(new Math3d_Vector(-1.0, 0.0, 0.0));
	surface.pushNormal(new Math3d_Vector(-1.0, 0.0, 0.0));
	surface.pushNormal(new Math3d_Vector(-1.0, 0.0, 0.0));
	surface.pushNormal(new Math3d_Vector(-1.0, 0.0, 0.0));
	surface.pushTriangle(offset+0, offset+1, offset+2);
	surface.pushTriangle(offset+2 ,offset+3, offset+0);
	offset+=4;
	
	// face ay+
	surface.pushVertex(new Math3d_Vector(-ax, ay,-az));
	surface.pushVertex(new Math3d_Vector( ax, ay,-az));
	surface.pushVertex(new Math3d_Vector( ax, ay, az));
	surface.pushVertex(new Math3d_Vector(-ax, ay, az));
	surface.pushNormal(new Math3d_Vector( 0.0, 1.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 1.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 1.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 1.0, 0.0));
	surface.pushTriangle(offset+0, offset+1, offset+2);
	surface.pushTriangle(offset+2 ,offset+3, offset+0);
	offset+=4;
	
	// face ay-
	surface.pushVertex(new Math3d_Vector(-ax,-ay,-az));
	surface.pushVertex(new Math3d_Vector( ax,-ay,-az));
	surface.pushVertex(new Math3d_Vector( ax,-ay, az));
	surface.pushVertex(new Math3d_Vector(-ax,-ay, az));
	surface.pushNormal(new Math3d_Vector( 0.0,-1.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 0.0,-1.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 0.0,-1.0, 0.0));
	surface.pushNormal(new Math3d_Vector( 0.0,-1.0, 0.0));
	surface.pushTriangle(offset+0, offset+1, offset+2);
	surface.pushTriangle(offset+2 ,offset+3, offset+0);
	offset+=4;
	
	// face az+
	surface.pushVertex(new Math3d_Vector(-ax,-ay, az));
	surface.pushVertex(new Math3d_Vector( ax,-ay, az));
	surface.pushVertex(new Math3d_Vector( ax, ay, az));
	surface.pushVertex(new Math3d_Vector(-ax, ay, az));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0, 1.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0, 1.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0, 1.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0, 1.0));
	surface.pushTriangle(offset+0, offset+1, offset+2);
	surface.pushTriangle(offset+2 ,offset+3, offset+0);
	offset+=4;
	
	// face az-
	surface.pushVertex(new Math3d_Vector(-ax,-ay,-az));
	surface.pushVertex(new Math3d_Vector(-ax, ay,-az));
	surface.pushVertex(new Math3d_Vector( ax, ay,-az));
	surface.pushVertex(new Math3d_Vector( ax,-ay,-az));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0,-1.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0,-1.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0,-1.0));
	surface.pushNormal(new Math3d_Vector( 0.0, 0.0,-1.0));
	surface.pushTriangle(offset+0, offset+1, offset+2);
	surface.pushTriangle(offset+2 ,offset+3, offset+0);
	offset+=4;
	
	
	// <wire>
	ax+=shift;
	ay+=shift;
	az+=shift;
	
	offset = wire.vertices.length;
	
	// surface vertices
	wire.pushVertex(new Math3d_Vector(-ax,-ay,-az));
	wire.pushVertex(new Math3d_Vector( ax,-ay,-az));
	wire.pushVertex(new Math3d_Vector( ax, ay,-az));
	wire.pushVertex(new Math3d_Vector(-ax, ay,-az));
	wire.pushVertex(new Math3d_Vector(-ax,-ay, az));
	wire.pushVertex(new Math3d_Vector( ax,-ay, az));
	wire.pushVertex(new Math3d_Vector( ax, ay, az));
	wire.pushVertex(new Math3d_Vector(-ax, ay, az));
	
	wire.pushSegment(offset+0, offset+1);
	wire.pushSegment(offset+1, offset+2);
	wire.pushSegment(offset+2, offset+3);
	wire.pushSegment(offset+3, offset+0);
	
	wire.pushSegment(offset+4, offset+5);
	wire.pushSegment(offset+5, offset+6);
	wire.pushSegment(offset+6, offset+7);
	wire.pushSegment(offset+7, offset+4);
	
	wire.pushSegment(offset+0, offset+4);
	wire.pushSegment(offset+1, offset+5);
	wire.pushSegment(offset+2, offset+6);
	wire.pushSegment(offset+3, offset+7);
	
	// </wire>
	
	return [wire, surface];
};
