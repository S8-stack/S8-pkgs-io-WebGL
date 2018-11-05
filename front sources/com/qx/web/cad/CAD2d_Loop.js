
/**
 * @param curves : CAD2d_Curve[]
 * @param isClosed : boolean
 */
function CAD2d_Loop(curves, isClosed){
	this.curves = curves;
	this.isClosed = isClosed;
}


CAD2d_Loop.prototype = {
	
	draw : function(affine3d, wire, shift){
		for(let curve of this.curves){
			curve.draw(affine3d, wire, shift);
		}
	}
};
