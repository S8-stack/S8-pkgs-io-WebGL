
function animate00(){


};


function sceneFadeOut(){
	var i=0, nbSteps=8;
	var scheduler = setInterval(function(){
		scene.environment.dim(1.0-i*0.1);
		scene.render();

		i++;
		if(i>=nbSteps){
			clearInterval(scheduler);
		}
	}, 25);
}

function sceneFadeIn(){
	var i=0, nbSteps=8;
	var scheduler = setInterval(function(){
		scene.environment.dim(1.0-(nbSteps-1-i)*0.1);
		scene.render();

		i++;
		if(i>=nbSteps){
			clearInterval(scheduler);
		}
	}, 25);
}


function testBinary(){
	

	ctx.request("getBinaryData:endianness="+ctx.endianness, function(response){ // callback
		
		var buffer = new CAD_InputBuffer(response.response);
		
		/*
		var value;
		for(var i=0; i<8; i++){
			if((value=buffer.getUint8())!=i+2){
				alert("array1["+i+"]="+value);	
			}
		}
		*/
		
		var n=32000;
		var sum=0;
		for(var i=0; i<n; i++){
			sum+=buffer.getFloat32();
		}
		sum/=n;
		alert("sum: "+sum);
		
	},
	function(response){ /* nothing to do on failed */ },
	function(xhr){ // configure
		xhr.responseType = "arraybuffer";
	});
}



function testEngine(){
	

	ctx.request("getProfile", function(response){ // callback
		
		var engine = new CAD_Engine();
		
		var profile = engine.parse(response.response);
		alert(profile);
	},
	function(response){ /* nothing to do on failed */ },
	function(xhr){ // configure
		xhr.responseType = "arraybuffer";
	});
}
