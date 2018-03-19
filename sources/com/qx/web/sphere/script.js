


function Sphere(){
}

Sphere.start = function(){

	// appearances
	var appearances = ["shinyBluePlastic", "mirror", "earth"];

	// response
	scene.setPickingCallback(function(shapeId){
		shapes[shapeId].mode = (shapes[shapeId].mode+1)%3;
		scene.setShapeStyle(shapeId, appearances[shapes[shapeId].mode]);
	});

	var shapes = {};

	request("getDemoShapes", function(response){
		eval(response.responseText);
		
		sphere.shapeId0 = shapeId0;
		sphere.shapeId1 = shapeId1;
		sphere.shapeId2 = shapeId2;

		shapes[shapeId0]={mode: 0};
		shapes[shapeId1]={mode: 1};
		shapes[shapeId2]={mode: 2};

		scene.setShapeStyle(shapeId0, appearances[shapes[shapeId0].mode]);
		scene.setShapeStyle(shapeId1, appearances[shapes[shapeId1].mode]);
		scene.setShapeStyle(shapeId2, appearances[shapes[shapeId2].mode]);
	});


}


Sphere.stop = function(){
	scene.deleteShape(sphere.shapeId0);
	scene.deleteShape(sphere.shapeId1);
	scene.deleteShape(sphere.shapeId2);
}





Sphere.viewRadialTurboGeometry = function(){
	request("service=RadialTurboGeometryViewer;", function(response){
		eval(response.responseText);
		scene.setShapeStyle(surfaceId, "mirror");
		scene.setShapeStyle(wireId, "color");
	});
}

Sphere.viewAxialTurboGeometry = function(){
	request("service=AxialTurboGeometryViewer;", function(response){
		eval(response.responseText);
		scene.setShapeStyle(surfaceId, "mirror");
		scene.setShapeStyle(wireId, "color");
	});
}


var sphere = new Sphere();



