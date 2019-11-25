
function runDemoCube(){

	// define new mesh
	let mesh = new WebGL_Mesh();
	mesh.initialize();
	let hexahedron = new WebGL_Hexahedron();
	hexahedron.build(mesh);
	mesh.compile();
	
	// define new instance and apply appearance and shape
	let affine = new MathAffine3d();
	affine.matrix.yRotation(0.1*Math.PI/2.0);

	// define new appearance
	let appearance = new WebGL_Appearance();
	
	let object = new WebGL_Object(appearance, mesh, [affine]);
	
	// start rendering by applying appearance to instance
	object.update(scene);

};
