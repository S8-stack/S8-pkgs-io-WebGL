


function Sphere(){
}

Sphere.start = function(){

	// response
	/*
	scene.setPickingCallback(function(shapeId){
		shapes[shapeId].mode = (shapes[shapeId].mode+1)%3;
		scene.setShapeStyle(shapeId, appearances[shapes[shapeId].mode]);
	});
	 */

	request("getDemoShapes", function(response){
		eval(response.responseText);

		scene.shapeInstances.get(id0).setMode(0);
		scene.shapeInstances.get(id1).setMode(0);
		scene.shapeInstances.get(id2).setMode(0);

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



