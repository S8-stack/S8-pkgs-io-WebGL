package com.qx.maths.surface;

import com.qx.io.webgl.EngineeringColor;
import com.qx.io.webgl.WebGL_Segment;
import com.qx.io.webgl.WebGL_ShapeModel;
import com.qx.io.webgl.WebGL_Triangle;
import com.qx.io.webgl.mesh.WebGL_ElementArray;
import com.qx.io.webgl.vertex.WebGL_ColorArray;
import com.qx.io.webgl.vertex.WebGL_NormalArray;
import com.qx.io.webgl.vertex.WebGL_VertexArray;
import com.qx.maths.Ad;
import com.qx.maths.Vd;

public class SurfaceDrawable {



	public boolean displaySurface = true;
	public boolean displayWireframe = true;
	public boolean displayLocalBasis = true;
	public double vectorLength = 0.5;

	public String shader = "material";
	public String style = "steel";

	public double offset = 0.01;


	public int nbPointsU = 20;
	public int nbPointsV = 20;

	public boolean isNormalReversed = false;

	public Vd surfaceColor = new Vd(0, 0, 1);
	public Vd wireColor = new Vd(1.0, 0.0, 0.0);

	public boolean isTriangleClockwise = false;
	
	
	public Ad basis = Ad.STANDARD_3D; 
	
	
	/**
	 * link to function
	 */
	private Surface function;

	
	
	public SurfaceDrawable(Surface function){
		this.function = function;
	}



	private double[] getUNodes(){
		double u0=function.getUStartCoordinate(), du = (function.getUEndCoordinate()-u0)/(nbPointsU-1);
		double[] nodes = new double[nbPointsU];
		for(int i=0; i<nbPointsU; i++){
			nodes[i] = u0+i*du;
		}
		return nodes;
	}



	private double[] getVNodes(){
		double v0=function.getVStartCoordinate(), dv = (function.getVEndCoordinate()-v0)/(nbPointsV-1);
		double[] nodes = new double[nbPointsV];
		for(int i=0; i<nbPointsV; i++){
			nodes[i] = v0+i*dv;
		}
		return nodes;
	}



	/**
	 * 
	 * @param basis
	 * @param surface
	 * @param wire
	 * @throws Exception
	 */
	public void draw(WebGL_ShapeModel surface, WebGL_ShapeModel wire) throws Exception{

		double[] uNodes = getUNodes();
		int nu = uNodes.length;

		double[] vNodes = getVNodes();
		int nv = vNodes.length;


		// <Surface>
		if(displaySurface){

			surface.startPatch(basis);

			/*
			 * Vertex vectors
			 */

			// Vertex
			if(surface.isVertexDefined()){
				WebGL_VertexArray vertices = surface.getVertexArray();
				for(double v : vNodes){
					for(double u : uNodes){
						vertices.add(function.point(u, v));
					}
				}	
			}


			// Normal
			if(surface.isNormalDefined()){
				WebGL_NormalArray normals = surface.getNormalArray();
				if(!isNormalReversed){
					for(double v : vNodes){
						for(double u : uNodes){
							normals.add(function.normal(u, v));
						}
					}	
				}
				else{
					for(double v : vNodes){
						for(double u : uNodes){
							normals.add(function.normal(u, v).opposite());
						}
					}
				}	
			}


			/*
			 * Elements
			 */
			WebGL_ElementArray elementArray = surface.getElementArray();
			if(isTriangleClockwise){
				for(int iv=0; iv<nv-1; iv++){
					for(int iu=0; iu<nu-1; iu++){
						elementArray.add(new WebGL_Triangle((iv+1)*nu+iu, (iv+1)*nu+iu+1, iv*nu+iu));
						elementArray.add(new WebGL_Triangle(iv*nu+iu, (iv+1)*nu+iu+1, iv*nu+iu+1));
					}
				}
			}
			else{
				for(int iv=0; iv<nv-1; iv++){
					for(int iu=0; iu<nu-1; iu++){
						elementArray.add(new WebGL_Triangle((iv+1)*nu+iu, iv*nu+iu, (iv+1)*nu+iu+1));
						elementArray.add(new WebGL_Triangle(iv*nu+iu, iv*nu+iu+1, (iv+1)*nu+iu+1));
					}
				}
			}
		}			// </Surface>

		// <Wire>
		if(displayWireframe){


			wire.startPatch(basis);
			/*
			 * Vertex vectors
			 */


			// Vertex
			if(wire.isVertexDefined()){
				WebGL_VertexArray vertices = wire.getVertexArray();
				for(double v : vNodes){
					for(double u : uNodes){
						vertices.add(function.point(u, v).integrate(function.normal(u, v), offset));
					}
				}
			}

			// colors
			if(wire.isColorDefined()){
				WebGL_ColorArray colors = wire.getColorArray();
				for(int i=0; i<uNodes.length*vNodes.length; i++){
					colors.add(surfaceColor);
				}	
			}


			// elements
			WebGL_ElementArray elementArray = wire.getElementArray();
			for(int iv=0; iv<nv; iv++){
				for(int iu=0; iu<nu-1; iu++){
					elementArray.add(new WebGL_Segment(iv*nu+iu, iv*nu+iu+1));
				}
			}

			for(int iv=0; iv<nv-1; iv++){
				for(int iu=0; iu<nu; iu++){
					elementArray.add(new WebGL_Segment(iv*nu+iu, (iv+1)*nu+iu));
				}
			}

		}
		// </Wire>



		// start of local basis
		if(displayLocalBasis){
			wire.startPatch(basis);

			Vd p;
			int c = 0;

			WebGL_VertexArray vertexArray = wire.getVertexArray();
			WebGL_ColorArray colorArray = wire.getColorArray();
			WebGL_ElementArray elementArray = wire.getElementArray();

			for(double v : vNodes){
				for(double u : uNodes){
					p = function.point(u, v);

					// u-tangent
					vertexArray.add(basis.applyToPoint(p));
					colorArray.add(EngineeringColor.BLUE);
					vertexArray.add(basis.applyToPoint(p.integrate(function.uTangent(u, v), vectorLength)));
					colorArray.add(EngineeringColor.BLUE);
					elementArray.add(new WebGL_Segment(c, c+1));
					c+=2;

					// v-tangent
					vertexArray.add(basis.applyToPoint(p));
					colorArray.add(EngineeringColor.CYAN);
					vertexArray.add(basis.applyToPoint(p.integrate(function.vTangent(u, v), vectorLength)));
					colorArray.add(EngineeringColor.CYAN);
					elementArray.add(new WebGL_Segment(c, c+1));
					c+=2;

					// normal
					vertexArray.add(basis.applyToPoint(p));
					colorArray.add(EngineeringColor.YELLOW);
					vertexArray.add(basis.applyToPoint(p.integrate(function.normal(u, v), vectorLength)));
					colorArray.add(EngineeringColor.YELLOW);
					elementArray.add(new WebGL_Segment(c, c+1));
					c+=2;
				}
			}
		}
		// end of wire frame section
	}


}
