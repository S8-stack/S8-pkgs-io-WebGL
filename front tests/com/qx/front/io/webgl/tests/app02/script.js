

var ctx = new QxContext();



/**
 * local session
 */
ctx.udpate = function(){};
ctx.prompt_login = function(content, callbackSucceed, callbackFailed){
	var username = "toto";
	var password = "1234";
	this.login(content, callbackSucceed, callbackFailed, username, password);
};

/**
 * override request
 */
/*
ctx.request = function(content, callback, configure){
	session.request(content, callback,
			function(xhr){ alert("Request failed due to:"+xhr.statusText); },
			configure);
}
*/

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

	ctx.request("getDemoShapes", function(response){
		eval(response.responseText);

		for(let id of identifiers){
			scene.objectInstances.get(id);	
		}
	});
}


Sphere.test02 = function(){
	request("getResult:a=2&b=3", function(response){
		eval(response.responseText);
	});
}


Sphere.test03 = function(){
	var a, b, x=0.0;
	var n = 1000, c=0;
	for(var i=0; i<n; i++){
		a = Math.random();
		b = Math.random();
		ctx.request("getResult:a="+a+"&b="+b, function(response){
			var result = eval(response.responseText);
			x+=result;
			c++;
			if(c==n){
				alert(x);
			}
		});
	}
	
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



