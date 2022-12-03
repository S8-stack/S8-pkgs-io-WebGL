
function BdController(scene){

	this.scene = scene;

	// define camera
	this.camera = new WebGL_Camera(scene);

	// define modes
	this.modes = [
		new WebGL_RotateViewController(this.camera),
		new WebGL_ZoomViewController(this.camera),
		new WebGL_HighlightController(this.camera),
		new BdCtrlPlanePositionner(this.camera)];

	this.nModes = this.modes.length;

	this.camera.refresh();
};

BdController.prototype = {
		start : WebGL_Controller.prototype.start,
		stop : WebGL_Controller.prototype.stop
};


