
var CAD3d_Patterns = {};



//classical XY pattern
CAD3d_Patterns.pattern_XY = function(affine, nx, xPitch, ny, yPitch){

	var itemAffine = new Math3d_Affine();
	affine.copy(itemAffine);

	var func = function(targetMatrix, mode, callback){

		switch(mode){


		case 0: // full rendering
			affine.vector.copy(itemAffine.vector);
			for(var ix=0; ix<nx; ix++){
				for(var iy=0; iy<ny; iy++){
					// affine
					affine.vector.add(new Math3d_Vector(ix*xPitch, iy*yPitch, 0.0), itemAffine.vector);
					itemAffine.copy(targetMatrix);
					callback();
				}
			}	
			break;


		case 1: // partial rendering
			affine.vector.copy(itemAffine.vector);

			//iy=0
			for(var ix=0; ix<nx; ix++){
				// affine
				affine.vector.add(new Math3d_Vector(ix*xPitch, 0.0, 0.0), itemAffine.vector);
				itemAffine.copy(targetMatrix);
				callback();
			}

			// iy=ny-1
			for(var ix=0; ix<nx; ix++){
				// affine
				affine.vector.add(new Math3d_Vector(ix*xPitch, (ny-1)*yPitch, 0.0), itemAffine.vector);
				itemAffine.copy(targetMatrix);
				callback();
			}

			//ix=0
			for(var iy=0; iy<ny; iy++){
				// affine
				affine.vector.add(new Math3d_Vector(0.0, iy*yPitch, 0.0), itemAffine.vector);
				itemAffine.copy(targetMatrix);
				callback();
			}

			//ix=nx-1
			for(var iy=0; iy<ny; iy++){
				// affine
				affine.vector.add(new Math3d_Vector((nx-1)*xPitch, iy*yPitch, 0.0), itemAffine.vector);
				itemAffine.copy(targetMatrix);
				callback();
			}
			break;
		}
	};

	func.nbInstances = nx*ny;

	return func;
}



/**
 * 
 */
CAD3d_Patterns.pattern_STHxTubes_Staggered = function(baseAffine,
		nx, xPitch, xEvenOffset, xOddOffset,
		ny, yPitch, yOffset,
		lod){

	var affine, affines, index;
	var xOffset;
	
	// switch againt level of details
	switch(lod){

	case 0: // full rendering

		affines = new Array(nx*ny);
		index=0;
		for(var iy=0; iy<ny; iy++){
			xOffset=(iy%2==0)?xEvenOffset:xOddOffset;

			for(var ix=0; ix<nx; ix++){
				// affine
				affine = new Math3d_Affine();
				affine.vector = new Math3d_Vector(xOffset+ix*xPitch, yOffset+iy*yPitch, 0.0);
				baseAffine.multiply(affine, affine);
				affines[index] = affine;
				index++;
			}
		}
		return affines;


	case 1: // partial rendering
		affines = new Array(2*(nx+ny));
		index=0;

		//iy=0
		xOffset = xEvenOffset;
		for(var ix=0; ix<nx; ix++){
			affine = new Math3d_Affine();
			affine.vector = new Math3d_Vector(xOffset+ix*xPitch, yOffset, 0.0);
			baseAffine.multiply(affine, affine);
			affines[index] = affine;
			index++;
		}

		// iy=ny-1
		xOffset=((ny-1)%2==0)?xEvenOffset:xOddOffset;
		for(var ix=0; ix<nx; ix++){
			affine = new Math3d_Affine();
			affine.vector = new Math3d_Vector(xOffset+ix*xPitch, yOffset+(ny-1)*yPitch, 0.0);
			baseAffine.multiply(affine, affine);
			affines[index] = affine;
			index++;
		}

		//ix=0
		for(var iy=0; iy<ny; iy++){
			xOffset=(iy%2==0)?xEvenOffset:xOddOffset;
			affine = new Math3d_Affine();
			affine.vector = new Math3d_Vector(xOffset, yOffset+iy*yPitch, 0.0);
			baseAffine.multiply(affine, affine);
			affines[index] = affine;
			index++;
		}

		//ix=nx-1
		for(var iy=0; iy<ny; iy++){
			// affine
			xOffset=(iy%2==0)?xEvenOffset:xOddOffset;
			affine = new Math3d_Affine();
			affine.vector = new Math3d_Vector(xOffset+(nx-1)*xPitch, yOffset+iy*yPitch, 0.0);
			baseAffine.multiply(affine, affine);
			affines[index] = affine;
			index++;
		}
		return affines;
	}
}

