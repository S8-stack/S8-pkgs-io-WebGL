
function live00(){

	var settings = new WebGL_GraphicSettings();


	var model = new WebGL_ShapeModel("pipe");
	var profile = new CAD_Polygon([1.0, 0.1, -1.0, 0.1], false);
	var wire = new WebGL_WireModel();
	var surface = new WebGL_SurfaceModel();
	profile.fullyRevolve(MathAffine3.STD, wire, surface, settings);
	model.renderables = [wire, surface];
	model.compile();

	var instance = new WebGL_ShapeInstance("pipe_instance", scene)

	var affine = new MathAffine3();
	affine.matrix.yRotation(0.1*Math.PI/2.0);
	instance.matrix_Model = new WebGL_Matrix4();
	instance.matrix_Model.setAffine(affine);

	instance.model = model;

	instance.setStyles([
		["darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire"],
		["shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic",
			"shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic"]
		]);

	scene.shapeInstances.push(instance);


	// start drawing...
	instance.setMode(0);

};



function createSection(n0){

	var 
	arc0 = new CAD2d_Arc(new Math2d_Affine(new Math2d_Vector( 0.5, 0.3), new Math2d_Matrix()),
			0.25, 0.0*Math.PI, 0.5*Math.PI, n0),
			arc1 = new CAD2d_Arc(new Math2d_Affine(new Math2d_Vector(-0.5, 0.3), new Math2d_Matrix()),
					0.25, 0.5*Math.PI, 1.0*Math.PI, n0),
					arc2 = new CAD2d_Arc(new Math2d_Affine(new Math2d_Vector(-0.5,-0.3), new Math2d_Matrix()),
							0.25, 1.0*Math.PI, 1.5*Math.PI, n0),
							arc3 = new CAD2d_Arc(new Math2d_Affine(new Math2d_Vector( 0.5,-0.3), new Math2d_Matrix()),
									0.25, 1.5*Math.PI, 2.0*Math.PI, n0);

	var segment0 = CAD2d_Segment.between(new Math2d_Vector(0.5, 0.55), new Math2d_Vector(-0.5, 0.55)); 
	var segment1 = CAD2d_Segment.between(new Math2d_Vector(-0.75, 0.3), new Math2d_Vector(-0.75,-0.3)); 
	var segment2 = CAD2d_Segment.between(new Math2d_Vector(-0.5,-0.55), new Math2d_Vector(0.5,-0.55)); 
	var segment3 = CAD2d_Segment.between(new Math2d_Vector(0.75,-0.3), new Math2d_Vector(0.75, 0.3)); 

	return new CAD2d_Loop([arc0, segment0, arc1, segment1, arc2, segment2, arc3, segment3], true);
}



function live01(){

	var loop = createSection(32);

	var segment = new CAD3d_Extrude(Math3d_Affine.STD, 0.0, 2.0);

	var shift = 0.0001;
	var arc = new CAD3d_Revolve(
			new Math3d_Affine(new Math3d_Vector(3.0, 0, 0)),
			new Math2d_Affine(new Math2d_Vector(0, 2)),
			0.0, 3.0/4.0*2.0*Math.PI, 320);

	var model = new WebGL_ObjectModel("pipe");

	var profile = new CAD_Polygon([1.0, 0.1, -1.0, 0.1], false);
	var wire = new WebGL_WireModel();
	var surface = new WebGL_SurfaceModel();
	segment.sweepLoop(loop, surface, wire, shift);
	arc.sweepLoop(loop, surface, wire, shift);
	model.shapes = [wire, surface];
	model.compile();

	scene.objectModels.push(model);

	var instance = new WebGL_ObjectInstance("pipe_instance", scene);


	var affine = new Math3d_Affine();
	affine.matrix.yRotation(0.1*Math.PI/2.0);
	instance.matrix_Model = new WebGL_Matrix4();
	instance.matrix_Model.setAffine(affine);

	instance.model = model;

	instance.setStyles([
		["darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire"],
		["shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic",
			"shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic"]
		]);

	scene.objectInstances.push(instance);


	// start drawing...
	instance.setMode(0);

	// start drawing...
	instance.setMode(0);

};


function live02(){

	var model = new WebGL_ObjectModel("cube");
	// models
	var wire = new WebGL_WireModel();
	var surface = new WebGL_SurfaceModel();

	CAD3d_Primitives.buildHexahedron(wire, surface, 1.0, 2.0, 1.6, 0.0005);
	model.shapes = [wire, surface];
	model.compile();

	var instance = new WebGL_ObjectInstance("cube", scene);

	var affine = new Math3d_Affine();
	affine.matrix.yRotation(0.1*Math.PI/2.0);

	instance.model = model;
	instance.setStyles([
		["darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire", "darkWire"],
		["shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic",
			"shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic", "shinyBluePlastic"]
		]);
	instance.affines = [affine];
	scene.objectInstances.push(instance);
	instance.setMode(0);
}




function live_TestSweep(){
	ctx.request("getSweepTest", function(response){ // callback
		var instanceId = eval(response.response);
		var instance = scene.objectInstances.get(instanceId);
		instance.setMode(0);
	});
}


function live_TestMat(){
	ctx.request("getTestMat", function(response){ // callback
		var instanceId = eval(response.response);
		var instance = scene.objectInstances.get(instanceId);
		instance.setMode(0);
	});
}


function live_TexTest(){
	ctx.request("getTexTest", function(response){ // callback
		var instanceId = eval(response.response);
		var instance = scene.objectInstances.get(instanceId);
		instance.setMode(0);
	});
}


function live_TestGeo(){
	ctx.request("getTestGeometry", function(response){ // callback
		var instanceId = eval(response.response);
		var instance = scene.objectInstances.get(instanceId);
		//instance.setMode(0);
	});
}


function live_TestCube08(){

	var unit = new WebGL_OffScreenRenderingUnit(256, 256);
	var actionBarNode = document.getElementById("action_bar");

	// remove child nodes
	while(actionBarNode.firstChild){
		actionBarNode.removeChild(actionBarNode.firstChild);
	}

	function createScene(node, i){
		var scene = new WebGL_OffScreenScene(unit, node);

		// setup view
		var view = scene.view;
		view.eyePosition.spherical_radial(4.0, (45+i*25)*Math.PI/180.0, 135*Math.PI/180.0);
		view.update();

		ctx.request("getTestCube08", function(response){ // callback
			var instanceId = eval(response.response);
			var instance = scene.objectInstances.get(instanceId);
			//instance.setMode(0);
		});
	}

	for(var i=0; i<6; i++){
		var actionNode = document.createElement("div");
		actionBarNode.appendChild(actionNode);

		var imageNode = document.createElement("div");
		actionNode.appendChild(imageNode);

		var textNode = document.createElement("div");
		actionNode.appendChild(textNode);
		textNode.innerHTML = "Solution "+i;

		var shortcutNode = document.createElement("div");
		actionNode.appendChild(shortcutNode);
		shortcutNode.innerHTML = "[CTRL+"+i+"]";

		createScene(imageNode, i);
	}


	/*
	var intervalID = window.setInterval(
			function(){
				scene.render();
			}, 500);
	 */
}



function live_ShowCursor(){
	var objectAffine = new MathAffine3d();
	
	var shapeModel = BdCtrlPointer.buildArrow(0.4, 0.25, 0.4, 0.2, 4, 1, 0.1, 0.5, 0.001);
	var shapeInstance = new WebGL_ShapeInstance(scene, [objectAffine]);
	shapeModel.apply(shapeInstance);
	shapeInstance.display(0);
	
	control.modes[3].enable(new MathAffine3d(), objectAffine);
	
}



function live_GkMeshTest01(){
	
	var context = new GkMeshContext();
	
	// build cube
	var hex = new HexahedronGkMeshSolid();
	var hexSolid = hex.build(context);
	
	// build cylinder
	var cylinder = new CylinderGkMeshSolid();
	cylinder.x1=0.0;
	cylinder.x0=0.5;
	cylinder.nPerRevolution = 32;
	var cylinderSolid = cylinder.build(context);
	
	// build cylinder
	var cylinder2 = new CylinderGkMeshSolid();
	cylinder2.x0=-1.0;
	cylinder2.x1=-0.5;
	cylinder2.nPerRevolution = 32;
	var cylinderSolid2 = cylinder2.build(context);
	
	var cylinder3 = new CylinderGkMeshSolid();
	cylinder3.radius=0.075;
	cylinder3.x1=0.0;
	cylinder3.x0=0.5;
	cylinder3.nPerRevolution = 12;
	var cylinderSolid3 = cylinder3.build(context, new MathAffine3d(new MathVector3d(0.0, 0.41, 0.41)));

	
	var knitting = new GkMeshKnitting();
	var knitSolids = knitting.knit(cylinderSolid, hexSolid);	
	var knitSolids = knitting.knit(cylinderSolid2, knitSolids[0]);
	var knitSolids = knitting.knit(cylinderSolid3, knitSolids[0]);
	
	
	var solid = knitSolids[0];
	
	solid.improve(0.2, 1e-6);
	
	solid.displayBadTrianglesInfo(2);
	
	solid.displayFacesInfo();
	
	// build graphics
	var shapeModel = new WebGL_ShapeModel();
	shapeModel.initialize();
	//hexSolid.flatten(shapeModel, 0.0001);
	solid.flatten(shapeModel, 0.0001, true);
	//cylinderSolid3.flatten(shapeModel, 0.0001);
	shapeModel.compile();
	var shapeInstance = new WebGL_ShapeInstance(scene, [new MathAffine3d()]);
	shapeModel.apply(shapeInstance);
	shapeInstance.display(0);
	//console.log(knitSolids[1].getTrianglesCount());

}



function live_GkMeshTest02(){
	
	var context = new GkMeshContext();
	
	// build cube
	var hex = new HexahedronGkMeshSolid();
	var hexSolid = hex.build(context);
	
	// build cylinder
	var cylinder = new CylinderGkMeshSolid();
	cylinder.x1=0.0;
	cylinder.x0=0.5;
	cylinder.nPerRevolution = 32;
	var cylinderSolid = cylinder.build(context);
	
	
	
	var knitting = new GkMeshKnitting();
	var knitSolids = knitting.knit(cylinderSolid, hexSolid);
	
	var solid = knitSolids[0];
	solid.displayFacesInfo();
	//knitSolids[1].refineWorst(1e-6);
	
	var shapeModel = new WebGL_ShapeModel();
	shapeModel.initialize();
	//hexSolid.flatten(shapeModel, 0.0001);
	solid.flatten(shapeModel, 0.0001);
	//cylinderSolid3.flatten(shapeModel, 0.0001);
	shapeModel.compile();
	var shapeInstance = new WebGL_ShapeInstance(scene, [new MathAffine3d()]);
	shapeModel.apply(shapeInstance);
	shapeInstance.display(0);
	//console.log(knitSolids[1].getTrianglesCount());
	
}
