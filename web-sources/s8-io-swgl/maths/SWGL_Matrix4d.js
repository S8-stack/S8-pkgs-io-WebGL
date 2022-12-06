

/**
 * Matrix 4
 * 
 * 
 * 	To be consistent with OpenGL instructions, the matrix is stored as an array in the column major order.
 * 
 * 					column 0 :		column 1 :		column 2 :		column 3 :
 * 
 * 		line 0 :	c[0]			c[4]			c[8]			c[12]
 *	 	line 1 :	c[1]			c[5]			c[9]			c[13]
 * 		line 2 :	c[2]			c[6]			c[10]			c[14]
 * 		line 3 :	c[3]			c[7]			c[11]			c[15]
 * 
 * @returns {Float32Array}
 */
export function create() {
	return new Float32Array(16);
}




/**
 * @param {Array} target : the target matrix
 * 
 * @param {number} c00 : the coefficient at line 0 and column 0
 * @param {number} c10 : the coefficient at line 1 and column 0
 * @param {number} c20 : the coefficient at line 2 and column 0
 * @param {number} c30 : the coefficient at line 3 and column 0
 * 
 * @param {number} c01 : the coefficient at line 0 and column 1
 * @param {number} c11 : the coefficient at line 1 and column 1
 * @param {number} c21 : the coefficient at line 2 and column 1
 * @param {number} c31 : the coefficient at line 3 and column 1
 * 
 * @param {number} c02 : the coefficient at line 0 and column 2
 * @param {number} c12 : the coefficient at line 1 and column 2
 * @param {number} c22 : the coefficient at line 2 and column 2
 * @param {number} c32 : the coefficient at line 3 and column 2
 * 
 * @param {number} c03 : the coefficient at line 0 and column 3
 * @param {number} c13 : the coefficient at line 1 and column 3
 * @param {number} c23 : the coefficient at line 2 and column 3
 * @param {number} c33 : the coefficient at line 3 and column 3
 * 
 */
export function setCoefficients(
	c00 = 1, c01 = 0, c02 = 0, c03 = 0,
	c10 = 0, c11 = 1, c12 = 0, c13 = 0,
	c20 = 0, c21 = 0, c22 = 1, c23 = 0,
	c30 = 0, c31 = 0, c32 = 0, c33 = 1, target) {

	// Column 0
	target[0] = c00;
	target[1] = c01;
	target[2] = c02;
	target[3] = c03; // 3

	// Column 1
	target[4] = c10;
	target[5] = c11;
	target[6] = c12;
	target[7] = c13; // 7

	// Column 2
	target[8] = c20;
	target[9] = c21;
	target[10] = c22;
	target[11] = c23; // 11

	// Column 3
	target[12] = c30;
	target[13] = c31;
	target[14] = c32;
	target[15] = c33; // 15
};



export function identity(target) {
	// Column 0
	target[0] = 1.0;
	target[1] = 0.0;
	target[2] = 0.0;
	target[3] = 0.0;

	// Column 1
	target[4] = 0.0;
	target[5] = 1.0;
	target[6] = 0.0;
	target[7] = 0.0;

	// Column 2
	target[8] = 0.0;
	target[9] = 0.0;
	target[10] = 1.0;
	target[11] = 0.0; // 11

	// Column 3
	target[12] = 0.0;
	target[13] = 0.0;
	target[14] = 0.0;
	target[15] = 1.0; // 15
};


/**
 * 
 * @param {*} source 
 * @param {*} target the target matrix 
 */
export function copy(source, target) {
	// Column 0
	target[0] = source[0];
	target[1] = source[1];
	target[2] = source[2];
	target[3] = source[3];

	// Column 1
	target[4] = source[4];
	target[5] = source[5];
	target[6] = source[6];
	target[7] = source[7];

	// Column 2
	target[8] = source[8];
	target[9] = source[9];
	target[10] = source[10];
	target[11] = source[11];

	// Column 3
	target[12] = source[12];
	target[13] = source[13];
	target[14] = source[14];
	target[15] = source[15];
}



export function transformVector4d(m, source, target, sOffset = 0, tOffset = 0) {
	let x = source[sOffset + 0], y = source[sOffset + 1], z = source[sOffset + 2], w = source[sOffset + 3];
	target[tOffset + 0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	target[tOffset + 1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	target[tOffset + 2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	target[tOffset + 3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
};



/**
 * 
 * @param {Float32Array} m 
 * @param {Float32Array} source 
 * @param {number} sOffset 
 * @param {Float32Array} target 
 * @param {number} tOffset 
 */
export function transformVector3d(m, source, target, sOffset = 0, tOffset = 0) {
	let x = source[sOffset + 0], y = source[sOffset + 1], z = source[sOffset + 2];
	target[tOffset + 0] = m[0] * x + m[4] * y + m[8] * z;
	target[tOffset + 1] = m[1] * x + m[5] * y + m[9] * z;
	target[tOffset + 2] = m[2] * x + m[6] * y + m[10] * z;
};




/**
 * 
 * @param {Float32Array} m matrix (matrices)
 * @param {Float32Array} source points array
 * @param {number} sOffset source offset
 * @param {Float32Array} target points array
 * @param {number} tOffset target offset
 */
export function transformPoint3d(m, source, target, sOffset = 0, tOffset = 0) {
	let x = source[sOffset + 0], y = source[sOffset + 1], z = source[sOffset + 2];
	target[tOffset + 0] = m[0] * x + m[4] * y + m[8] * z + m[12];
	target[tOffset + 1] = m[1] * x + m[5] * y + m[9] * z + m[13];
	target[tOffset + 2] = m[2] * x + m[6] * y + m[10] * z + m[14];
};



/**
 * Add a vector to the current vector
 */
export function add(mL, mR, target) {
	// column 0
	target[0] = mL[0] + mR[0];
	target[1] = mL[1] + mR[1];
	target[2] = mL[2] + mR[2];
	target[3] = mL[3] + mR[3];

	// column 1
	target[4] = mL[4] + mR[4];
	target[5] = mL[5] + mR[5];
	target[6] = mL[6] + mR[6];
	target[7] = mL[7] + mR[7];

	// column 2
	target[8] = mL[8] + mR[8];
	target[9] = mL[9] + mR[9];
	target[10] = mL[10] + mR[10];
	target[11] = mL[11] + mR[11];

	// column 3
	target[12] = mL[12] + mR[12];
	target[13] = mL[13] + mR[13];
	target[14] = mL[14] + mR[14];
	target[15] = mL[15] + mR[15];
};



/**
 * Add a vector to the current vector
 */
export function substract(mL, mR, target) {
	// column 0
	target[0] = mL[0] - mR[0];
	target[1] = mL[1] - mR[1];
	target[2] = mL[2] - mR[2];
	target[3] = mL[3] - mR[3];

	// column 1
	target[4] = mL[4] - mR[4];
	target[5] = mL[5] - mR[5];
	target[6] = mL[6] - mR[6];
	target[7] = mL[7] - mR[7];

	// column 2
	target[8] = mL[8] - mR[8];
	target[9] = mL[9] - mR[9];
	target[10] = mL[10] - mR[10];
	target[11] = mL[11] - mR[11];

	// column 3
	target[12] = mL[12] - mR[12];
	target[13] = mL[13] - mR[13];
	target[14] = mL[14] - mR[14];
	target[15] = mL[15] - mR[15];
};




/**
 * Transposes a mat4 (flips the values over the diagonal)
 *
 * @param {Matrix4} destination : Matrix4 receiving transposed values. If not specified result is written to this
 */
export function transpose(m, target) {
	// column 0
	target[0] = m[0];
	target[1] = mL[4];
	target[2] = mL[8];
	target[3] = mL[12];

	// column 1
	target[4] = m[1];
	target[5] = m[5];
	target[6] = m[9];
	target[7] = m[13];

	// column 2
	target[8] = m[2];
	target[9] = m[6];
	target[10] = m[10];
	target[11] = m[14];

	// column 3
	target[12] = m[3];
	target[13] = m[7];
	target[14] = m[11];
	target[15] = m[15];
}


export function multiply(mL, mR, target) {

	// Cache the matrix values (Allow huge speed increase)
	let

		a00 = mL[0], a01 = mL[4], a02 = mL[8], a03 = mL[12],
		a10 = mL[1], a11 = mL[5], a12 = mL[9], a13 = mL[13],
		a20 = mL[2], a21 = mL[6], a22 = mL[10], a23 = mL[14],
		a30 = mL[3], a31 = mL[7], a32 = mL[11], a33 = mL[15],

		b00 = mR[0], b01 = mR[4], b02 = mR[8], b03 = mR[12],
		b10 = mR[1], b11 = mR[5], b12 = mR[9], b13 = mR[13],
		b20 = mR[2], b21 = mR[6], b22 = mR[10], b23 = mR[14],
		b30 = mR[3], b31 = mR[7], b32 = mR[11], b33 = mR[15];


	target[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	target[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
	target[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
	target[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;

	target[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	target[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
	target[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
	target[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;

	target[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	target[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
	target[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
	target[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;

	target[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
	target[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
	target[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
	target[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
}



/**
 * @param destination : destination
 */
export function inverse(m, target) {

	// Cache the matrix values (Allow huge speed increase)
	let a00 = m[0], a01 = m[4], a02 = m[8], a03 = m[12],
		a10 = m[1], a11 = m[5], a12 = m[9], a13 = m[13],
		a20 = m[2], a21 = m[6], a22 = m[10], a23 = m[14],
		a30 = m[3], a31 = m[7], a32 = m[11], a33 = m[15];

	let b00 = a00 * a11 - a10 * a01,
		b01 = a00 * a21 - a20 * a01,
		b02 = a00 * a31 - a30 * a01,
		b03 = a10 * a21 - a20 * a11,
		b04 = a10 * a31 - a30 * a11,
		b05 = a20 * a31 - a30 * a21,
		b06 = a02 * a13 - a12 * a03,
		b07 = a02 * a23 - a22 * a03,
		b08 = a02 * a33 - a32 * a03,
		b09 = a12 * a23 - a22 * a13,
		b10 = a12 * a33 - a32 * a13,
		b11 = a22 * a33 - a32 * a23;

	// Calculate the determinant
	let d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

	// determinant is assumed to be non zero
	let invDet = 1.0 / d;


	// vector 0
	target[0] = (a11 * b11 - a21 * b10 + a31 * b09) * invDet;
	target[1] = (-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
	target[2] = (a13 * b05 - a23 * b04 + a33 * b03) * invDet;
	target[3] = (-a12 * b05 + a22 * b04 - a32 * b03) * invDet;

	// vector 1
	target[4] = (-a01 * b11 + a21 * b08 - a31 * b07) * invDet;
	target[5] = (a00 * b11 - a20 * b08 + a30 * b07) * invDet;
	target[6] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
	target[7] = (a02 * b05 - a22 * b02 + a32 * b01) * invDet;

	// vector 2
	target[8] = (a01 * b10 - a11 * b08 + a31 * b06) * invDet;
	target[9] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;
	target[10] = (a03 * b04 - a13 * b02 + a33 * b00) * invDet;
	target[11] = (-a02 * b04 + a12 * b02 - a32 * b00) * invDet;

	// vector 3
	target[12] = (-a01 * b09 + a11 * b07 - a21 * b06) * invDet;
	target[13] = (a00 * b09 - a10 * b07 + a20 * b06) * invDet;
	target[14] = (-a03 * b03 + a13 * b01 - a23 * b00) * invDet;
	target[15] = (a02 * b03 - a12 * b01 + a22 * b00) * invDet;
}



/**
 * 
 * @param {Float32Array} m 
 * @param {Float32Array} target 
 */
export function transposeInverse(m, target) {

	// Cache the matrix values (Allow huge speed increase)
	let a00 = m[0], a01 = m[4], a02 = m[8], a03 = m[12],
		a10 = m[1], a11 = m[5], a12 = m[9], a13 = m[13],
		a20 = m[2], a21 = m[6], a22 = m[10], a23 = m[14],
		a30 = m[3], a31 = m[7], a32 = m[11], a33 = m[15];

	// start calculating intermediaries
	let b00 = a00 * a11 - a10 * a01,
		b01 = a00 * a21 - a20 * a01,
		b02 = a00 * a31 - a30 * a01,
		b03 = a10 * a21 - a20 * a11,
		b04 = a10 * a31 - a30 * a11,
		b05 = a20 * a31 - a30 * a21,
		b06 = a02 * a13 - a12 * a03,
		b07 = a02 * a23 - a22 * a03,
		b08 = a02 * a33 - a32 * a03,
		b09 = a12 * a23 - a22 * a13,
		b10 = a12 * a33 - a32 * a13,
		b11 = a22 * a33 - a32 * a23,

		// Calculate the determinant
		d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),

		// determinant is assumed to be non zero
		invDet = 1.0 / d;


	target[0] = (a11 * b11 - a21 * b10 + a31 * b09) * invDet;
	target[1] = (-a01 * b11 + a21 * b08 - a31 * b07) * invDet;
	target[2] = (a01 * b10 - a11 * b08 + a31 * b06) * invDet;
	target[3] = (-a01 * b09 + a11 * b07 - a21 * b06) * invDet;

	target[4] = (-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
	target[5] = (a00 * b11 - a20 * b08 + a30 * b07) * invDet;
	target[6] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;
	target[7] = (a00 * b09 - a10 * b07 + a20 * b06) * invDet;

	target[8] = (a13 * b05 - a23 * b04 + a33 * b03) * invDet;
	target[9] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
	target[10] = (a03 * b04 - a13 * b02 + a33 * b00) * invDet;
	target[11] = (-a03 * b03 + a13 * b01 - a23 * b00) * invDet;

	target[12] = (-a12 * b05 + a22 * b04 - a32 * b03) * invDet;
	target[13] = (a02 * b05 - a22 * b02 + a32 * b01) * invDet;
	target[14] = (-a02 * b04 + a12 * b02 - a32 * b00) * invDet;
	target[15] = (a02 * b03 - a12 * b01 + a22 * b00) * invDet;
}


/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {number} left : Left bound of the frustum
	 * @param {number} right :  Right bound of the frustum
	 * @param {number} bottom : Bottom bound of the frustum
	 * @param {number} top : Top bound of the frustum
	 * @param {number} near : Near bound of the frustum
	 * @param {number} far : Far bound of the frustum
	 */
export function frustum(left, right, bottom, top, near, far, target) {

	let rl = (right - left),
		tb = (top - bottom),
		fn = (far - near);

	// vector 0
	target[0] = (2 * near) / rl;
	target[1] = 0;
	target[2] = 0;
	target[3] = 0;

	// vector 1
	target[4] = 0;
	target[5] = (2 * near) / tb;
	target[6] = 0;
	target[7] = 0;

	// vector 2
	target[8] = (right + left) / rl,
		target[9] = (top + bottom) / tb,
		target[10] = -(far + near) / fn,
		target[11] = -1,

		// vector 3
		target[12] = 0,
		target[13] = 0,
		target[14] = -(2 * far * near) / fn,
		target[15] = 0;
}


/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {number} fovy : Vertical field of view (fovea angle)
 * @param {number} aspect : Aspect ratio. typically viewport width/height
 * @param {number} near : Near bound of the frustum
 * @param {number} far : Far bound of the frustum
 */
export function perspectiveProjection_CENTERED(fovy, aspect, near, far, target) {
	let top = near * Math.tan(fovy * Math.PI / 360.0),
		right = top * aspect;
	frustum(-right, right, -top, top, near, far, target);
}




/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {number} fovy : Vertical field of view (fovea angle)
 * @param {number} aspect : Aspect ratio. typically viewport width/height
 * @param {number} near : Near bound of the frustum
 * @param {number} far : Far bound of the frustum
 */
export function perspectiveProjection_RIGHT_SIDE(fovy, aspect, near, far, target) {
	let tan = Math.tan(fovy * Math.PI / 360.0);
	let fn = (far - near);

	// vector 0
	target[0] = 1.0 / (aspect * tan);
	target[1] = 0;
	target[2] = 0;
	target[3] = 0;

	// vector 1
	target[4] = 0;
	target[5] = 1.0 / tan;
	target[6] = 0;
	target[7] = 0;

	// vector 2
	target[8] = 0,
		target[9] = 0,
		target[10] = -(far + near) / fn,
		target[11] = -1,

		// vector 3
		target[12] = 0,
		target[13] = 0,
		target[14] = -(2 * far * near) / fn,
		target[15] = 0;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 */
export function orthographicProjection(left, right, bottom, top, near, far, target) {
	let rl = (right - left),
		tb = (top - bottom),
		fn = (far - near);

	// vector 0
	target[0] = 2 / rl;
	target[1] = 0;
	target[2] = 0;
	target[3] = 0;

	// vector 1
	target[4] = 0;
	target[5] = 2 / tb;
	target[6] = 0;
	target[7] = 0;

	// vector 2
	target[8] = 0;
	target[9] = 0;
	target[10] = -2 / fn;
	target[11] = 0;

	// vector 3
	target[12] = -(left + right) / rl;
	target[13] = -(top + bottom) / tb;
	target[14] = -(far + near) / fn;
	target[15] = 1.0;
}



/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {Float32Array} eye Position of the viewer
 * @param {Float32Array} center Point the viewer is looking at
 * @param {Float32Array} up vec3 pointing "up"
 * @param {Float32Array} target matrix
 */
export function lookAt(eye, center, up, target) {

	// load numbers

	let eyex = eye[0], eyey = eye[1], eyez = eye[2];

	let upx = up[0], upy = up[1], upz = up[2];

	let centerx = center[0],
		centery = center[1],
		centerz = center[2];

	if (eyex == centerx && eyey == centery && eyez == centerz) {
		identity(target);
	}

	//vec3.direction(eye, center, z);
	let
		z0 = eyex - centerx,
		z1 = eyey - centery,
		z2 = eyez - centerz,

		// normalize (no check needed for 0 because of early return)
		len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;

	//vec3.normalize(vec3.cross(up, z, x));
	let x0 = upy * z2 - upz * z1;
	let x1 = upz * z0 - upx * z2;
	let x2 = upx * z1 - upy * z0;
	len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	if (!len) {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	} else {
		len = 1 / len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	}

	//vec3.normalize(vec3.cross(z, x, y));
	let y0 = z1 * x2 - z2 * x1;
	let y1 = z2 * x0 - z0 * x2;
	let y2 = z0 * x1 - z1 * x0;

	len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	if (!len) {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	} else {
		len = 1 / len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	}

	// set coefficients
	target[0] = x0;
	target[1] = y0;
	target[2] = z0;
	target[3] = 0;

	target[4] = x1;
	target[5] = y1;
	target[6] = z1;
	target[7] = 0;

	target[8] = x2;
	target[9] = y2;
	target[10] = z2;
	target[11] = 0;

	target[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	target[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	target[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	target[15] = 1;
}




/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} mat mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
export function rotateX(m, angle, target) {

	let s = Math.sin(angle),
		c = Math.cos(angle),
		a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
		a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];

	// Perform axis-specific matrix multiplication
	target[4] = a10 * c + a20 * s;
	target[5] = a11 * c + a21 * s;
	target[6] = a12 * c + a22 * s;
	target[7] = a13 * c + a23 * s;

	target[8] = a10 * -s + a20 * c;
	target[9] = a11 * -s + a21 * c;
	target[11] = a12 * -s + a22 * c;
	target[12] = a13 * -s + a23 * c;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} mat mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
export function rotateY(m, angle, target) {
	let s = Math.sin(angle),
		c = Math.cos(angle),
		a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
		a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];


	// Perform axis-specific matrix multiplication
	target[0] = a00 * c + a20 * -s;
	target[1] = a01 * c + a21 * -s;
	target[2] = a02 * c + a22 * -s;
	target[3] = a03 * c + a23 * -s;

	target[8] = a00 * s + a20 * c;
	target[9] = a01 * s + a21 * c;
	target[10] = a02 * s + a22 * c;
	target[11] = a03 * s + a23 * c;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} m mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 */
export function rotateZ(m, angle, target) {
	let s = Math.sin(angle),
		c = Math.cos(angle),
		a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
		a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];

	// Perform axis-specific matrix multiplication
	target[0] = a00 * c + a10 * s;
	target[1] = a01 * c + a11 * s;
	target[2] = a02 * c + a12 * s;
	target[3] = a03 * c + a13 * s;

	target[4] = a00 * -s + a10 * c;
	target[5] = a01 * -s + a11 * c;
	target[6] = a02 * -s + a12 * c;
	target[7] = a03 * -s + a13 * c;
}

/**
 * return a String representation of the matrix
 */
export function toString(m) {
	return `[${m[0]},\t${m[1]},\t${m[2]},\t${m[3]}]\n
		[${m[4]},\t${m[5]},\t${m[6]},\t${m[7]}]\n
		[${m[8]},\t${m[9]},\t${m[10]},\t${m[11]}]\n
		[${m[12]},\t${m[13]},\t${m[14]},\t${m[15]}]`;
}





export function createIdentity() {

	let coefficients = new Float32Array(16);

	// Column 0
	coefficients[0] = 1.0;
	coefficients[1] = 0.0;
	coefficients[2] = 0.0;
	coefficients[3] = 0.0;

	// Column 1
	coefficients[4] = 0.0;
	coefficients[5] = 1.0;
	coefficients[6] = 0.0;
	coefficients[7] = 0.0;

	// Column 2
	coefficients[8] = 0.0;
	coefficients[9] = 0.0;
	coefficients[10] = 1.0;
	coefficients[11] = 0.0; // 11

	// Column 3
	coefficients[12] = 0.0;
	coefficients[13] = 0.0;
	coefficients[14] = 0.0;
	coefficients[15] = 1.0; // 15

	return coefficients;
};





export function rotationX(angle) {

	var rot = new Matrix4();
	rot.identity();

	var cos = Math.cos(angle);
	var sin = Math.sin(angle);

	// Perform axis-specific matrix multiplication
	rot.c11 = cos;
	rot.c12 = sin;
	rot.c21 = -sin;
	rot.c22 = cos;
	return rot;
}

export function rotationY(angle) {
	var rot = new Matrix4();
	rot.identity();

	var cos = Math.cos(angle);
	var sin = Math.sin(angle);

	// Perform axis-specific matrix multiplication
	rotc00 = cos;
	rot.c02 = sin;
	rot.c20 = -sin;
	rot.c22 = cos;
	return rot;
}

export function rotationZ(angle) {
	var rot = new Matrix4();
	rot.identity();

	var cos = Math.cos(angle);
	var sin = Math.sin(angle);

	// Perform axis-specific matrix multiplication
	rotc00 = cos;
	rot.c01 = sin;
	rot.c10 = -sin;
	rot.c11 = cos;
	return rot;
}

export function random(target) {
	for (let i = 0; i < 16; i++) { target[i] = Math.random(); }
};



/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} theta 
 * @returns 
 */
export function pattern(x, y, z, theta) {

	let cosTheta = Math.cos(theta);
	let sinTheta = Math.sin(angle);

	let matrix = new Float32Array(16);

	// Column 0
	matrix[0] = cosTheta;
	matrix[1] = sinTheta;
	matrix[2] = 0.0;
	matrix[3] = 0.0;

	// Column 1
	matrix[4] = -sinTheta;
	matrix[5] = cosTheta;
	matrix[6] = 0.0;
	matrix[7] = 0.0;

	// Column 2
	matrix[8] = 0.0;
	matrix[9] = 0.0;
	matrix[10] = 1.0;
	matrix[11] = 0.0; // 11

	// Column 3
	matrix[12] = x;
	matrix[13] = y;
	matrix[14] = z;
	matrix[15] = 1.0; // 15

	return matrix;
}


/**
 * 
 */
export function WebGL_Matrix4_test01() {

	let m = create(), inv = create(), tr = create(), trinv = create(), result = create(),
		trinv3 = create(), trinv3c = create(), result3 = create();
	random(m);
	inverse(m, inv);
	transpose(inv, tr);
	transposeInverse(m, trinv);

	substract(tr, trinv, result);
	console.log(toString(result));

	multiply(inv, m, result);
	console.log(toString(result));

	transposeInverse(trinv3, m);
	copy(trinv3c, trinv);

	substract(trinv3, trinv3c, result3);
	console.log(result3.toString());
};



/**
 * Average multiplication time less than 600 nanoseconds.
 */
export function WebGL_Matrix4_testPerformance() {

	var A = new Matrix4();
	A.random();

	var B = new Matrix4();
	B.random();

	var C = new Matrix4();

	var n = 1e5;

	var start = new Date().getTime();
	for (var i = 0; i < n; ++i) {
		A.multiply(B, C);
	}


	var end = new Date().getTime();
	var time = end - start;
	alert("Execution time: " + time + " ms");
};
