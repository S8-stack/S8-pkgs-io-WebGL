package com.mint.webgl.primitive;

import com.mint.webgl.shape.WebGL_Shape;
import com.mint.webgl.shape.mesh.WebGL_ElementArray;
import com.mint.webgl.shape.mesh.WebGL_Triangle;
import com.mint.webgl.shape.vertex.WebGL_NormalArray;
import com.mint.webgl.shape.vertex.WebGL_TexCoordArray;
import com.mint.webgl.shape.vertex.WebGL_VertexArray;
import com.qx.maths.Ad;
import com.qx.maths.Vd;


public class Sphere {


	/**
	 * radius
	 */
	private double r;

	/**
	 * discretization
	 */
	private int n;



	public Sphere(double r, int n){
		super();
		this.r=r;
		this.n=n;
	}


	public void draw(WebGL_Shape shape, Ad basis) {

		double dTheta = (double) (Math.PI/(n-1));
		double dPhi = (double) (2*Math.PI/(2*n-1));

		/*
		 * Vertex vectors
		 */
		shape.startPatch(basis);

		// Vertex
		if(shape.isVertexDefined()){
			WebGL_VertexArray vertices =shape.getVertexArray();
			for(int i=0; i<n; i++){
				for(int j=0; j<2*n; j++){
					vertices.add(Vd.sphericalRadial(r, j*dPhi, i*dTheta));
				}
			}
		}

		// Normal
		if(shape.isNormalDefined()){
			WebGL_NormalArray normals = shape.getNormalArray();
			for(int i=0; i<n; i++){
				for(int j=0; j<2*n; j++){
					normals.add(Vd.sphericalRadial(1.0, j*dPhi, i*dTheta));
				}
			}
		}

		// TexCoord
		if(shape.isTexCoordDefined()){
			WebGL_TexCoordArray texCoords = shape.getTexCoordArray();

			double du = 1.0/(2*n-1);
			double dv = 1.0/(n-1);

			for(int i=0; i<n; i++){
				for(int j=0; j<2*n; j++){
					texCoords.add(new Vd(j*du, 1.0-i*dv));
				}
			}
		}
		
		
		// Elements
		WebGL_ElementArray elements = shape.getElementArray();
		for(int j=0; j<2*n-1; j++){
			elements.add(new WebGL_Triangle(j, 2*n+j+1, 2*n+j));
		}

		for(int i=1; i<n-2; i++){
			for(int j=0; j<2*n-1; j++){
				elements.add(new WebGL_Triangle(i*2*n+j, i*2*n+j+1, (i+1)*2*n+j+1));
				elements.add(new WebGL_Triangle(i*2*n+j, (i+1)*2*n+j+1, (i+1)*2*n+j));
			}
		}

		for(int j=0; j<2*n-1; j++){
			elements.add(new WebGL_Triangle((n-2)*2*n+j, (n-2)*2*n+j+1, (n-1)*2*n+j+1));
		}
	}

}
