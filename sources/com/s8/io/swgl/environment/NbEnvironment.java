package com.s8.io.swgl.environment;

import java.util.ArrayList;
import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.lights.DirectionalNbLight;
import com.s8.io.swgl.maths.SWGL_Vector3d;


public class NbEnvironment extends NeObject {


	/**
	 * 
	 * @param branch
	 */
	public NbEnvironment(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"environment/NbEnvironment");
	}



	/**
	 * 
	 * @param lights
	 */
	public void setDirectionalLights(List<DirectionalNbLight> lights) {
		vertex.setObjList("directionalLights", lights);
	}


	public void initialize_PRESET0() {

		List<DirectionalNbLight> lights = new ArrayList<>();

		double dPhi = Math.PI*1.8/5;

		for(int i=0; i<5; i++){
			DirectionalNbLight light = new DirectionalNbLight(vertex.branch);
			light.setAmbientColor(0.2, 0.2, 0.2, 0.0);
			light.setDiffuseColor(0.3, 0.3, 0.3, 0.0);
			light.setSpecularColor(1.0, 1.0, 1.0, 0.0);
			light.setDirectionVector(SWGL_Vector3d.sphericalRadial(1.0, i*dPhi, Math.PI*0.25));

			lights.add(light);
		}

		dPhi = Math.PI*1.8/3; 
		for(int i=0; i<3; i++){

			DirectionalNbLight light = new DirectionalNbLight(vertex.branch);
			light.setAmbientColor(0.0, 0.0, 0.0, 0.0);
			light.setDiffuseColor(0.4, 0.4, 0.4, 0.0);
			light.setSpecularColor(1.0, 1.0, 1.0, 0.0);
			light.setDirectionVector(MathVector3d.sphericalRadial(1.0, Math.PI*0.45+i*dPhi, Math.PI*0.65));

			lights.add(light);
		}

		// set lights
		setDirectionalLights(lights);
		
		// environment

		/*
	        let rootPathname = "/nebulae/assets/skycube";
	        environment.radiance = NbTextureCubeMap.create(rootPathname+"/std2/radiance/face", ".png", 6);
	        environment.irradiance = NbTextureCubeMap.create(rootPathname+"/std2/irradiance/face", ".png", 1);
		 */
	}



	public void setRadiance(NbTextureCubeMap cubeMap) {
		vertex.setObj("radiance", cubeMap);
	}
	
	public void setIrradiance(NbTextureCubeMap cubeMap) {
		vertex.setObj("irradiance", cubeMap);
	}
}
