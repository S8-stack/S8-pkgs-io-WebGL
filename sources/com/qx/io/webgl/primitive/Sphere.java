package com.qx.io.webgl.primitive;

import com.qx.io.webgl.WebGL_Surface;
import com.qx.io.webgl.WebGL_Triangle;
import com.qx.maths.affine.Affine3d;
import com.qx.maths.vector.Vector2d;
import com.qx.maths.vector.Vector3d;


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


	public void draw(WebGL_Surface surface, Affine3d affine) {

		double dTheta = (double) (Math.PI/(n-1));
		double dPhi = (double) (2*Math.PI/(2*n-1));

		/*
		 * Vertex vectors
		 */
		surface.setAffine(affine);
		surface.startPatch();

		// Vertex
		for(int i=0; i<n; i++){
			for(int j=0; j<2*n; j++){
				surface.addVertex(Vector3d.sphericalRadial(r, j*dPhi, i*dTheta));
			}
		}

		// Normal
		for(int i=0; i<n; i++){
			for(int j=0; j<2*n; j++){
				surface.addNormal(Vector3d.sphericalRadial(1.0, j*dPhi, i*dTheta));
			}
		}

		// TexCoord
		double du = 1.0/(2*n-1);
		double dv = 1.0/(n-1);
		for(int i=0; i<n; i++){
			for(int j=0; j<2*n; j++){
				surface.addTexCoord(new Vector2d(j*du, 1.0-i*dv));
			}
		}


		// Elements
		for(int j=0; j<2*n-1; j++){
			surface.addTriangle(new WebGL_Triangle(j, 2*n+j+1, 2*n+j));
		}

		for(int i=1; i<n-2; i++){
			for(int j=0; j<2*n-1; j++){
				surface.addTriangle(new WebGL_Triangle(i*2*n+j, i*2*n+j+1, (i+1)*2*n+j+1));
				surface.addTriangle(new WebGL_Triangle(i*2*n+j, (i+1)*2*n+j+1, (i+1)*2*n+j));
			}
		}

		for(int j=0; j<2*n-1; j++){
			surface.addTriangle(new WebGL_Triangle((n-2)*2*n+j, (n-2)*2*n+j+1, (n-1)*2*n+j+1));
		}
	}

}
