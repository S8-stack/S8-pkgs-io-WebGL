
function runDemoCube(){

	// define new shape
	let shape = new WebGL_Shape();
	shape.initialize();
	let hexahedron = new WebGL_Hexahedron();
	hexahedron.build(shape);
	shape.compile();
	
	// define new instance and apply appearance and shape
	let affine = new MathAffine3d();
	affine.matrix.yRotation(0.1*Math.PI/2.0);
	
	let object = new WebGL_Object(scene, shape, [affine]);
	
	// define new appearance
	let appearance = new WebGL_Appearance();
	
	// start rendering by applying appearance to instance
	object.setAppearance(appearance);

};
