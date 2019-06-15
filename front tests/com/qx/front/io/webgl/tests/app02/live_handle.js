
function liveHandle00(){

	var model = new WebGL_ObjectModel();
	var surface = new WebGL_Surface();
	PtGeoPoint.build(surface, 0.2);
	model.shapes = [surface];
	model.compile();

	var instance = new WebGL_ObjectInstance("point_instance", scene)

	var affine = new MathAffine3();
	affine.matrix.yRotation(0.1*Math.PI/2.0);
	instance.pattern = CAD3d_Patterns.single(affine);
	
	instance.model = model;

	instance.setStyles([
		["yellowGlow", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic",
			"shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic"]
		]);

	scene.objectInstances.push(instance);


	// start drawing...
	instance.setMode(0);

};



function liveHandle01(){

	var affine, model, instance;
	
	model = new WebGL_ObjectModel();
	var surface = new WebGL_Surface();
	PtGeoCircle.build(surface, 1.0, 1.4, 36);
	model.shapes = [surface];
	model.compile();

	instance = new WebGL_ObjectInstance("point_instance", scene)

	affine = new MathAffine3();
	affine.matrix.yRotation(-0.25*Math.PI/2.0);
	var scaleMatrix = new MathMatrix3();
	scaleMatrix.scaling(0.25/2.0);
	affine.matrix.multiply(scaleMatrix, affine.matrix);
	instance.pattern = CAD3d_Patterns.single(affine);

	instance.model = model;

	instance.setStyles([
		["yellowGlow", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic",
			"shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic"]
		]);

	scene.objectInstances.push(instance);


	// start drawing...
	instance.setMode(0);
	
	ctx.request("getFlangeModelId:def=ASME DN250 Schedule40", function(response){
		eval(response.responseText);
	
		model = new WebGL_ObjectModel(id);
		model.load(new WebGL_GraphicSettings());
		
		var instance = new WebGL_ObjectInstance("flange_instance", scene)

		affine = new MathAffine3();
		affine.matrix.yRotation(-0.25*Math.PI/2.0);
		var scaleMatrix = new MathMatrix3();
		scaleMatrix.scaling(0.5);
		affine.matrix.multiply(scaleMatrix, affine.matrix);
		instance.pattern = CAD3d_Patterns.single(affine);
		
		instance.model = model;

		instance.setStyles([
			["darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire"],
			["matAluminium", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic",
				"shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic"]
			]);

		// start drawing...
		instance.setMode(0);
	})
	
	
};

