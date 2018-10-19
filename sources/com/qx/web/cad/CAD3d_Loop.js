
/**
 * @param curves : CAD2d_Curve[]
 * @param isClosed : boolean
 */
function CAD3d_Loop(curves, isClosed){
	this.curves = curves;
	this.isClosed = isClosed;
}


CAD3d_Loop.prototype = {
	
	sweep : function(section, wire, settings){
		for(let curve of this.curves){
			curve.draw(affine, wire, settings);
		}
	}

};
