
function HxCAD_buildTube(wire, surface, tubeRadius, tubeLength, n, shift){
	var circle = new CAD2d_Arc(new MathAffine2(), tubeRadius, 0.0, 2.0*Math.PI, n);
	var loop = new CAD2d_Loop([circle], true);
	var extrude = new CAD3d_Extrude(new MathAffine3(), 0.0, tubeLength);
	extrude.sweepLoop(loop, surface, wire, shift);
};

function HxCAD_buildUBend(wire, surface, tubeRadius, xPitch, n0, n1, shift){
	var circle = new CAD2d_Arc(new MathAffine2(), tubeRadius, 0.0, 2.0*Math.PI, n0);
	var loop = new CAD2d_Loop([circle], true);
	
	var affine3d = new MathAffine3();
	affine3d.matrix.zRotation(Math.PI*0.5);
	affine3d.vector.x=xPitch/2.0;
	var arc = new CAD3d_Revolve(affine3d,
			new MathAffine2(new MathVector2(0, xPitch/2.0)), Math.PI, 2.0*Math.PI, n1);
	arc.sweepLoop(loop, surface, wire, shift);
};

