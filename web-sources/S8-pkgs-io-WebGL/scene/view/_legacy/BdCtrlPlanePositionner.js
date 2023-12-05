

/**
 * basic mode for zooming
 */
function BdCtrlPlanePositionner(camera){
	this.camera = camera;
	this.view = camera.view;
	this.isEnabled = false;
}

BdCtrlPlanePositionner.prototype = {
		
		enable : function(planeAffine, objectAffine){
			this.planeAffine = planeAffine; // input affine
			this.planeInvAffine = new MathAffine3d(); // input affine
			planeAffine.inverse(this.planeInvAffine);
			this.objectAffine = objectAffine; // output affine
			this.isEnabled = true;
		},
		
		disable : function(){
			this.isEnabled = false;
		},

		onMouseDown : function(event){
			return false;
		},

		onMouseUp : function(event){
			return false;
		},

		onMouseMove : function(event) {
			if(this.isEnabled){
				var ray = this.view.castRay(event.clientX, event.clientY);	
				ray.transform(this.planeInvAffine, ray);
				var zrv = ray.vector.z;
				if(Math.abs(zrv)>1e-3){ // intersection angle is not too small
					var rayCoordinate = -ray.point.z/zrv;
					var objectAffineCoordinates = new MathVector3d();
					ray.evaluate(rayCoordinate, objectAffineCoordinates);
					this.planeAffine.transformPoint(objectAffineCoordinates, this.objectAffine.vector);
				}
				else{
					this.objectAffine.vector.zero();
				}
				this.camera.refresh();
				return true; // capture event
			}
			else{
				return false;
			}
		},

		onMouseWheel : function(event) {
			return false;
		},

		onKeyDown : function(event) {
			return false;
		},

		onKeyUp : function(event) {
			return false;
		}
};

