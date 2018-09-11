
/**
 * 
 */
function WebGL_Polygon(vertices){
	
	// store vertices
	this.vertices = vertices;
	
	// build normals
	var n = this.vertices.length;
	this.normals = new Array();
	var normal;
	for(var i=0; i<n-1; i++){
		 normal = this.vertices[i+1].copy().substract(this.vertices[i]);
		 normal.normalize();
		 normal.orthgonal(true);
		 this.normals[i] = normal;
	}
}


WebGL_Polygon.prototype = {
		
	public void buildWire(Affine3d basis, WebGL_ShapeModel wire, int n, boolean isWireEndingsEnabled){

			int nbPoints = points.length;
			Vector2d point;

			if(isWireEndingsEnabled){
				point = points[0].integrate(normals[0], shift);
				buildArc(basis, wire, point, n);

				point = points[nbPoints-1].integrate(normals[nbPoints-2], shift);
				buildArc(basis, wire, point, n);		
			}

			for(int i=1; i<nbPoints-1; i++){
				point = points[i].integrate(normals[i-1].add(normals[i]).normalize(), shift);
				buildArc(basis, wire, point, n);
			}	
		}


		/**
		 * @throws Exception 
		 * 
		 */
		buildArc : function(affine, wire, point, n){

			if(Math.abs(point.y)>1e-12){

				var offset = wire.vertices.length;
				var dTheta = 2.0*Math.PI/n;
				var point3d = new Vector3(point.x, point.y, 0);
					
				var matrix;
				var vertex;
				var vertices = wire.vertices;
				for(var i=0; i<n; i++){
					matrix.xRotation(i*dTheta);
					
					// build vertex
					vertex = point3d.copy();
					matrix.transform(vertex);
					affine.transformVertex(vertex);
					
					// push vertex
					vertices.push(vertex);
				}

				// elements
				var segments = wire.segments;
				for(int i=0; i<n; i++){
					segments.push(offset+i%n, offset+(i+1)%n));
				}
			}
		}




		/**
		 * @throws Exception 
		 * 
		 */
		public void buildSurface(Affine3d basis, WebGL_ShapeModel glSurface, int n){


			Vector2d point0, point1, normal;
			Vector3d p0, p1, normal3d;

			double x0, x1, y0, y1;

			// vertices


			WebGL_VertexArray vertexArray = glSurface.getVertexArray();
			WebGL_NormalArray normalArray = glSurface.getNormalArray();
			WebGL_TexCoordArray texCoordArray = glSurface.getTexCoordArray();
			WebGL_ElementArray elementArray = glSurface.getElementArray();

			for(int i=0; i<points.length-1; i++){

				point0 = points[i];
				x0 = point0.get(0);
				y0 = point0.get(1);

				point1 = points[i+1];
				x1 = point1.get(0);
				y1 = point1.get(1);


				normal = normals[i];

				if(Math.abs(y0)<1e-12 && Math.abs(y1)<1e-12){
					throw new RuntimeException("Degenerated surface");
				}

				double dTheta = (double) (2*Math.PI)/n;

				/*
				 * Vertex vectors
				 */
				glSurface.startPatch(basis);

				p0 = new Vector3d(x0, y0, 0);
				p1 = new Vector3d(x1, y1, 0);
				normal3d = new Vector3d(normal.get(0), normal.get(1), 0);

				// Vertex
				SquareMatrix3d matrix;


				for(int j=0; j<n; j++){
					matrix = SquareMatrix3d.xRotationMatrix(j*dTheta);

					// vertex
					vertexArray.add(matrix.multiply(p0));
					vertexArray.add(matrix.multiply(p1));

					// normal
					normalArray.add(matrix.multiply(normal3d));
					normalArray.add(matrix.multiply(normal3d));
				}

				// Elements
				if(Math.abs(y1)<1e-12){
					for(int j=0; j<n; j++){
						elementArray.add(new WebGL_Triangle((2*j)%(2*n), (2*j+1)%(2*n), (2*j+2)%(2*n)));
					}
				}
				else if(Math.abs(y0)<1e-12){
					for(int j=0; j<n; j++){
						elementArray.add(new WebGL_Triangle((2*j+2)%(2*n), (2*j+1)%(2*n), (2*j+3)%(2*n)));
					}
				}
				else{
					for(int j=0; j<n; j++){
						elementArray.add(new WebGL_Triangle((2*j)%(2*n), (2*j+1)%(2*n), (2*j+2)%(2*n)));
						elementArray.add(new WebGL_Triangle((2*j+2)%(2*n), (2*j+1)%(2*n), (2*j+3)%(2*n)));
					}
				}
			}
		}
};
