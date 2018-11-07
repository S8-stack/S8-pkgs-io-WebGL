
/**
 * 
 */
var CAD3d_Primitives = {};


CAD3d_Primitives.buildHexahedron = function(wire, surface, ax, ay, az, shift){

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



/**
 * 
 */
CAD3d_Primitives.buildRing = function(surface, d0, d1){

	var n=36, dTheta = 2.0*Math.PI/n, theta=0.0, offset=surface.vertices.length;
	var r0=d0/2.0, r1=d1/2.0;
	for(var i=0; i<n; i++){
		surface.pushVertex(new Math3d_Vector(0.0, r0*Math.cos(theta), r0*Math.sin(theta)));
		surface.pushNormal(new Math3d_Vector(1.0, 0.0, 0.0));
		surface.pushVertex(new Math3d_Vector(0.0, r1*Math.cos(theta), r1*Math.sin(theta)));
		surface.pushNormal(new Math3d_Vector(1.0, 0.0, 0.0));
		theta+=dTheta;
		if(i<n-1){
			surface.pushTriangle(offset+2*i+0, offset+2*i+1, offset+2*(i+1)+1);
			surface.pushTriangle(offset+2*(i+1)+1, offset+2*(i+1), offset+2*i+0);
		}
		else{
			surface.pushTriangle(offset+2*(n-1)+0, offset+2*(n-1)+1, offset+1);
			surface.pushTriangle(offset+1, offset+0, offset+2*(n-1)+0);
		}
	}
};
