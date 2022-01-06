

/**
 * WebGL_Object. Building blocks for more complex 3D scenes.
 * a model must be defined
 * an instance must be defined
 */
export class WebGL_Object {

	constructor(appearance, mesh, affines) {
		this.appearance = appearance;
		this.mesh = mesh;
		this.affines = affines;

		// rendering pipe handles
		this.wirePipeHandle = null;
		this.surfacePipeHandle = null;
	}

	render(view, program) {

		// bind vertex attributes buffer handles (program is doing the
		// picking of the appropriate vertices attributes)
		program.setShape(this.mesh);

		// affine
		for (let affine of this.affines) {

			// update stack
			view.setModel(affine);

			// set appearance
			program.setAppearance(this.appearance);

			// bind matrices
			// trigger render by drawing elements
			//gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
			program.draw(view, this.mesh);
		}
	}


	setShape(shape) {
		this.shape = shape;
	}

	setAppearance(appearance) {
		this.appearance = appearance;
	}

	update(scene) {

		// material part
		let config = this.mesh.configuration;

		let appearance = this.appearance;

		let prgmId = null;

		// wire
		prgmId = appearance.wireProgramId;
		if (config.isWireEnabled && this.wireProgramId != prgmId) {
			if (this.wirePipeHandle != null) {
				this.wirePipeHandle.isRemoved = true;
			}
			this.wireProgramId = prgmId;
			if (prgmId) {
				this.wirePipeHandle = scene.getPipe(prgmId).append(this);
			}
		}

		// surface
		prgmId = appearance.surfaceProgramId;
		if (config.isSurfaceEnabled && this.surfaceProgramId != prgmId) {
			if (this.surfacePipeHandle != null) {
				this.surfacePipeHandle.isRemoved = true;
			}
			this.surfaceProgramId = prgmId;
			if (prgmId) {
				this.surfacePipeHandle = scene.getPipe(prgmId).append(this);
			}
		}
	}

	dispose() {
		if (this.wirePipeHandle != null) {
			this.wirePipeHandle.isRemoved = true;
		}
		if (this.surfacePipeHandle != null) {
			this.surfacePipeHandle.isRemoved = true;
		}
	}
}
