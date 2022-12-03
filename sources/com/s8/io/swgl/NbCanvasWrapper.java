package com.s8.ng.geo.nebulae;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.scene.NbScene;


/**
 * 
 * @author pierreconvert
 *
 */
public class NbCanvasWrapper extends CubeElement {

	public NbCanvasWrapper(NeBranch branch) {
		super(branch, "/s8-ng-geo/nebulae/NbCanvasWrapper");
	}

	public void setScene(NbScene scene) {
		vertex.setObj("scene", scene);
	}

}
