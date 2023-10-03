package com.s8.io.swgl.scene.environment;

import java.util.ArrayList;
import java.util.List;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.maths.SWGL_Vector;
import com.s8.io.swgl.scene.environment.lights.SWGL_DirectionalLight;


public class SWGL_Environment extends WebS8Object {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_Environment(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/environment/SWGL_Environment");
	}



	/**
	 * 
	 * @param lights
	 */
	public void setDirectionalLights(List<SWGL_DirectionalLight> lights) {
		vertex.fields().setObjectListField("directionalLights", lights);
	}


	public void initialize_PRESET0() {

		List<SWGL_DirectionalLight> lights = new ArrayList<>();

		double dPhi = Math.PI*1.8/5;

		for(int i=0; i<5; i++){
			SWGL_DirectionalLight light = new SWGL_DirectionalLight(vertex.getSession());
			light.setAmbientColor(0.2, 0.2, 0.2, 0.0);
			light.setDiffuseColor(0.3, 0.3, 0.3, 0.0);
			light.setSpecularColor(1.0, 1.0, 1.0, 0.0);
			light.setDirectionVector(SWGL_Vector.sphericalRadial3d(1.0, i*dPhi, Math.PI*0.25));

			lights.add(light);
		}

		dPhi = Math.PI*1.8/3; 
		for(int i=0; i<3; i++){

			SWGL_DirectionalLight light = new SWGL_DirectionalLight(vertex.getSession());
			light.setAmbientColor(0.0, 0.0, 0.0, 0.0);
			light.setDiffuseColor(0.4, 0.4, 0.4, 0.0);
			light.setSpecularColor(1.0, 1.0, 1.0, 0.0);
			light.setDirectionVector(SWGL_Vector.sphericalRadial3d(1.0, Math.PI*0.45+i*dPhi, Math.PI*0.65));

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



	public void setRadiance(SWGL_TextureCubeMap cubeMap) {
		vertex.fields().setObjectField("radiance", cubeMap);
	}
	
	public void setIrradiance(SWGL_TextureCubeMap cubeMap) {
		vertex.fields().setObjectField("irradiance", cubeMap);
	}
}
