
var profile = new WebGL_Profile2([
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.0,
	12.0, -23.3], true);

var wire = new WebGL_WireModel();
var surface = new WebGL_SurfaceModel();
profile.fullyRevolve(wire, surface, 20);
model.renderables = [wire, surface];