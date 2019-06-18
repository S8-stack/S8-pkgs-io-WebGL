

function BdCtrlPointer(){

	// rendering pipe handles
	this.wireStyleHandle = null;
	this.surfaceStyleHandle = null;

	this.mode = 0;

	// to be normalized when attached to a connection
	this.shape0 = CdCursor.buildRoundArrow(0.5, 0.3, 0.5, 0.2, 32);

	this.mode = 1;

	// to be normalized when attached to a connection
	this.shape1 = CdCursor.buildSquareArrow(0.5, 0.3, 0.5, 0.2, 32);

}


BdCtrlPointer.prototype = {


		render : function(view, program){

			// bind vertex attributes buffer handles (program is doing the
			// picking of the appropriate vertices attributes)
			program.attachShape(this);

			// affine
			for(let affine of this.affines){

				// update stack
				view.setModel(affine);

				// bind matrices
				// trigger render by drawing indices
				//gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
				program.draw(view, this);
			}
		},

		setWireStyle : function(id){
			if(this.wireStyleHandle!=null){
				this.wireStyleHandle.isRemoved = true;
			}
			if(id!=null){
				this.wireStyleHandle = this.scene.getPipe(id).append(this);	
			}
		},

		setSurfaceStyle : function(id){
			if(this.surfaceStyleHandle!=null){
				this.surfaceStyleHandle.isRemoved = true;
			}
			if(id!=null){
				this.surfaceStyleHandle = this.scene.getPipe(id).append(this);	
			}
		},

		/**
		 * setStyle to a shape
		 */
		display : function(mode=0){
			switch(mode){

			case 0: // normal
				this.setWireStyle(this.wireProgram);
				this.setSurfaceStyle(this.surfaceProgram);
				break;

			case 1: // highlight
				this.setWireStyle(this.wireProgram);
				this.setSurfaceStyle("glow");
				break;
			}
		},


		dispose : function(){
			if(this.wireStyleHandle!=null){
				this.wireStyleHandle.isRemoved = true;
			}
			if(this.surfaceStyleHandle!=null){
				this.surfaceStyleHandle.isRemoved = true;
			}
		}

};





/**
 * 
 */
BdCtrlPointer.buildArrow = function(h1, r1, h2, r2, n, innerWidth, borderThickness, borderRatio, shift){

	// set std config
	var config = new WebGL_ShapeConfiguration();
	config.isWireEnabled = true;
	config.isSurfaceNormalAttributeEnabled = false;
	config.surfaceProgram = "glow";
	config.surfaceAmbientColor = [1.0, 1.0, 0.0, 1.0];
	var shapeModel = new WebGL_ShapeModel();
	config.apply(shapeModel);
	shapeModel.initialize();

	var vertex, vertices, indices, offset;

	// <surface>
	attributes = shapeModel.surfaceAttributes;
	indices = shapeModel.surfaceIndices;

	
	var flatVertices = new Array(4);

	flatVertices[0] = new MathVector3d(0, 0, h1+h2);
	flatVertices[1] = new MathVector3d(r1, 0, h2);
	flatVertices[2] = new MathVector3d(r2, 0, h2);
	flatVertices[3] = new MathVector3d(r2, 0, 0);

	var theta, dTheta = 2.0*Math.PI/n;
	var vertex;
	var matrix = new MathMatrix3d();
	for(var i=0; i<n; i++){
		matrix.zRotation((i+0.5)*dTheta);

		for(var j=0; j<4; j++){
			vertexAttributes = new WebGL_VertexAttributes();
			vertex = new MathVector3d();
			matrix.transform(flatVertices[j], vertex);
			vertexAttributes.vertex = vertex;
			attributes.push(vertexAttributes);
		}
	}

	var i0=0, i1=1, i2=2, i3=3, i4, i5, i6, i7;
	for(var i=0; i<n; i++){

		// set new indices
		if(i<n-1){
			i4=4*(i+1)+0; i5=4*(i+1)+1; i6=4*(i+1)+2; i7=4*(i+1)+3;
		}
		else{
			i4=0; i5=1; i6=2; i7=3;
		}
		indices.push(i0, i1, i5);
		indices.push(i5, i4, i0);
		indices.push(i2, i3, i7);
		indices.push(i7, i6, i2);

		// move
		i0=i4; i1=i5; i2=i6; i3=i7;
	}
	
	
	// <wire>

	attributes = shapeModel.wireAttributes;
	offset = attributes.length;
	indices = shapeModel.wireIndices;
	
	flatVertices[0] = new MathVector3d(0, 0, h1+h2+shift);
	flatVertices[1] = new MathVector3d(r1+shift, 0, h2);
	flatVertices[2] = new MathVector3d(r2+shift, 0, h2);
	flatVertices[3] = new MathVector3d(r2+shift, 0, 0);
	
	var matrix = new MathMatrix3d();

	var i0=offset+0, i1=offset+1, i2=offset+2, i3=offset+3, i4, i5, i6, i7;
	for(var i=0; i<n; i++){
		matrix.zRotation((i+0.5)*dTheta);

		for(var j=0; j<4; j++){
			vertexAttributes = new WebGL_VertexAttributes();
			vertex = new MathVector3d();
			matrix.transform(flatVertices[j], vertex);
			vertexAttributes.vertex = vertex;
			attributes.push(vertexAttributes);
		}
		
		// segments
		indices.push(offset+0, offset+1);
		indices.push(offset+2, offset+3);
		
		// set new indices
		if(i<n-1){
			i4=offset+4*(i+1)+0; i5=offset+4*(i+1)+1; i6=offset+4*(i+1)+2; i7=offset+4*(i+1)+3;
		}
		else{
			i4=offset+0; i5=offset+1; i6=offset+2; i7=offset+3;
		}
		indices.push(i0, i1);
		indices.push(i2, i3);
		indices.push(i1, i5);
		indices.push(i2, i6);
		indices.push(i3, i7);

		// move
		i0=i4; i1=i5; i2=i6; i3=i7;	
	}
	

	BdCtrlPointer.addFocusSquare(shapeModel, innerWidth, borderThickness, borderRatio, shift);

	shapeModel.compile();

	return shapeModel;
};



BdCtrlPointer.addFocusSquare = function(shapeModel, innerWidth, borderThickness, borderRatio, shift){


	// focus square
	var a = (innerWidth*borderRatio)/2.0, b = innerWidth/2.0, c=innerWidth/2.0+borderThickness;

	var vertex, vertices, indices, offset;

	// <surface>
	attributes = shapeModel.surfaceAttributes;
	indices = shapeModel.surfaceIndices;
	
	var flatVertices = [
		new MathVector3d(c, a, 0),
		new MathVector3d(c, c, 0),
		new MathVector3d(a, c, 0),
		new MathVector3d(a, b, 0),
		new MathVector3d(b, b, 0),
		new MathVector3d(b, a, 0)];
	
	var dTheta = 2.0*Math.PI/4;
	var matrix = new MathMatrix3d();
	for(var i=0; i<4; i++){
		matrix.zRotation(i*dTheta);
		offset = attributes.length;
		
		for(var j in flatVertices){
			vertexAttributes = new WebGL_VertexAttributes();
			vertex = new MathVector3d();
			matrix.transform(flatVertices[j], vertex);
			vertexAttributes.vertex = vertex;
			attributes.push(vertexAttributes);
		}
		
		indices.push(offset+0, offset+1, offset+5);
		indices.push(offset+5, offset+1, offset+4);
		indices.push(offset+4, offset+1, offset+3);
		indices.push(offset+3, offset+1, offset+2);
	}
	
	
	attributes = shapeModel.wireAttributes;
	indices = shapeModel.wireIndices;

	c+=shift;
	b-=shift;
	a-=shift;
	
	var flatVertices = [ 
		new MathVector3d(c, a, 0),
		new MathVector3d(c, c, 0),
		new MathVector3d(a, c, 0),
		new MathVector3d(a, b, 0),
		new MathVector3d(b, b, 0),
		new MathVector3d(b, a, 0) ];
	
	for(var i=0; i<4; i++){
		matrix.zRotation(i*dTheta);
		offset = attributes.length;

		for(var j in flatVertices){
			vertexAttributes = new WebGL_VertexAttributes();
			vertex = new MathVector3d();
			matrix.transform(flatVertices[j], vertex);
			vertexAttributes.vertex = vertex;
			attributes.push(vertexAttributes);
		}
		

		// indices
		indices.push(offset+0, offset+1);
		indices.push(offset+1, offset+2);
		indices.push(offset+2, offset+3);
		indices.push(offset+3, offset+4);
		indices.push(offset+4, offset+5);
		indices.push(offset+5, offset+0);
	}

	// </surface>
};

