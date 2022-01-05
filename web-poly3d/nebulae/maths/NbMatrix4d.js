

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
 */
export function create(){
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



export function transformVector4d(m, v, target) {
	let x = v[0], y = v[1], z = v[2], w = v[3];
	target[0] = m[00] * x + m[04] * y + m[08] * z + m[12] * w;
	target[1] = m[01] * x + m[05] * y + m[09] * z + m[13] * w;
	target[2] = m[02] * x + m[06] * y + m[10] * z + m[14] * w;
	target[3] = m[03] * x + m[07] * y + m[11] * z + m[15] * w;
};

export function transformVector3d(m, v, target) {
	let x = v[0], y = v[1], z = v[2];
	target[0] = m[00] * x + m[04] * y + m[08] * z;
	target[1] = m[01] * x + m[05] * y + m[09] * z;
	target[2] = m[02] * x + m[06] * y + m[10] * z;
}



/**
 * Add a vector to the current vector
 */
export function add(mL, mR, target) {
	// column 0
	target[00] = mL[00] + mR[00];
	target[01] = mL[01] + mR[01];
	target[02] = mL[02] + mR[02];
	target[03] = mL[03] + mR[03];

	// column 1
	target[04] = mL[04] + mR[04];
	target[05] = mL[05] + mR[05];
	target[06] = mL[06] + mR[06];
	target[07] = mL[07] + mR[07];

	// column 2
	target[08] = mL[08] + mR[08];
	target[09] = mL[09] + mR[09];
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
	target[00] = mL[00] - mR[00];
	target[01] = mL[01] - mR[01];
	target[02] = mL[02] - mR[02];
	target[03] = mL[03] - mR[03];

	// column 1
	target[04] = mL[04] - mR[04];
	target[05] = mL[05] - mR[05];
	target[06] = mL[06] - mR[06];
	target[07] = mL[07] - mR[07];

	// column 2
	target[08] = mL[08] - mR[08];
	target[09] = mL[09] - mR[09];
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
	target[00] = m[00];
	target[01] = mL[04];
	target[02] = mL[08];
	target[03] = mL[12];

	// column 1
	target[04] = m[01];
	target[05] = m[05];
	target[06] = m[09];
	target[07] = m[13];

	// column 2
	target[08] = m[02];
	target[09] = m[06];
	target[10] = m[10];
	target[11] = m[14];

	// column 3
	target[12] = m[03];
	target[13] = m[07];
	target[14] = m[11];
	target[15] = m[15];
}


export function multiply(mL, mR, target) {

	// Cache the matrix values (Allow huge speed increase)
	let

		a00 = mL[00], a01 = mL[04], a02 = mL[08], a03 = mL[12],
		a10 = mL[01], a11 = mL[05], a12 = mL[09], a13 = mL[13],
		a20 = mL[02], a21 = mL[06], a22 = mL[10], a23 = mL[14],
		a30 = mL[03], a31 = mL[07], a32 = mL[11], a33 = mL[15],

		b00 = mR[00], b01 = mR[04], b02 = mR[08], b03 = mR[12],
		b10 = mR[01], b11 = mR[05], b12 = mR[09], b13 = mR[13],
		b20 = mR[02], b21 = mR[06], b22 = mR[10], b23 = mR[14],
		b30 = mR[03], b31 = mR[07], b32 = mR[11], b33 = mR[15];


	target[00] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	target[01] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
	target[02] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
	target[03] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;

	target[04] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	target[05] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
	target[06] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
	target[07] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;

	target[08] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	target[09] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
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
	let a00 = m[00], a01 = m[04], a02 = m[08], a03 = m[12],
		a10 = m[01], a11 = m[05], a12 = m[09], a13 = m[13],
		a20 = m[02], a21 = m[06], a22 = m[10], a23 = m[14],
		a30 = m[03], a31 = m[07], a32 = m[11], a33 = m[15];

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
	invDet = 1.0 / d;


	// vector 0
	target[00] = (a11 * b11 - a21 * b10 + a31 * b09) * invDet;
	target[01] = (-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
	target[02] = (a13 * b05 - a23 * b04 + a33 * b03) * invDet;
	target[03] = (-a12 * b05 + a22 * b04 - a32 * b03) * invDet;

	// vector 1
	target[04] = (-a01 * b11 + a21 * b08 - a31 * b07) * invDet;
	target[05] = (a00 * b11 - a20 * b08 + a30 * b07) * invDet;
	target[06] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
	target[07] = (a02 * b05 - a22 * b02 + a32 * b01) * invDet;

	// vector 2
	target[08] = (a01 * b10 - a11 * b08 + a31 * b06) * invDet;
	target[09] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;
	target[10] = (a03 * b04 - a13 * b02 + a33 * b00) * invDet;
	target[11] = (-a02 * b04 + a12 * b02 - a32 * b00) * invDet;

	// vector 3
	target[12] = (-a01 * b09 + a11 * b07 - a21 * b06) * invDet;
	target[13] = (a00 * b09 - a10 * b07 + a20 * b06) * invDet;
	target[14] = (-a03 * b03 + a13 * b01 - a23 * b00) * invDet;
	target[15] = (a02 * b03 - a12 * b01 + a22 * b00) * invDet;
}



/**
	 */
export function transposeInverse(m, target) {

	// Cache the matrix values (Allow huge speed increase)
	let a00 = m[00], a01 = m[04], a02 = m[08], a03 = m[12],
		a10 = m[01], a11 = m[05], a12 = m[09], a13 = m[13],
		a20 = m[02], a21 = m[06], a22 = m[10], a23 = m[14],
		a30 = m[03], a31 = m[07], a32 = m[11], a33 = m[15];

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


	target[00] = (a11 * b11 - a21 * b10 + a31 * b09) * invDet;
	target[01] = (-a01 * b11 + a21 * b08 - a31 * b07) * invDet;
	target[02] = (a01 * b10 - a11 * b08 + a31 * b06) * invDet;
	target[03] = (-a01 * b09 + a11 * b07 - a21 * b06) * invDet;

	target[04] = (-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
	target[05] = (a00 * b11 - a20 * b08 + a30 * b07) * invDet;
	target[06] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;
	target[07] = (a00 * b09 - a10 * b07 + a20 * b06) * invDet;

	target[08] = (a13 * b05 - a23 * b04 + a33 * b03) * invDet;
	target[09] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
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
	target[00] = (near * 2) / rl;
	target[01] = 0;
	target[02] = 0;
	target[03] = 0;

	// vector 1
	target[04] = 0;
	target[05] = (near * 2) / tb;
	target[06] = 0;
	target[07] = 0;

	// vector 2
	target[08] = (right + left) / rl,
		target[09] = (top + bottom) / tb,
		target[10] = -(far + near) / fn,
		target[11] = -1,

		// vector 3
		target[12] = 0,
		target[13] = 0,
		target[14] = -(far * near * 2) / fn,
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
export function perspectiveProjection(fovy, aspect, near, far, target) {
	let top = near * Math.tan(fovy * Math.PI / 360.0),
		right = top * aspect;
	frustum(-right, right, -top, top, near, far, target);
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
	target[00] = 2 / rl;
	target[01] = 0;
	target[02] = 0;
	target[03] = 0;

	// vector 1
	target[04] = 0;
	target[05] = 2 / tb;
	target[06] = 0;
	target[07] = 0;

	// vector 2
	target[08] = 0;
	target[09] = 0;
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
 * @param {Vector3} eye Position of the viewer
 * @param {Vector3} center Point the viewer is looking at
 * @param {Vector3} up vec3 pointing "up"
 */
export function lookAt(eye, center, up, target) {

	// load numbers
	let len;

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
	target[00] = x0; target[01] = y0; target[02] = z0; target[03] = 0;
	target[04] = x1; target[05] = y1; target[06] = z1; target[07] = 0;
	target[08] = x2; target[09] = y2; target[10] = z2; target[11] = 0;

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
		a10 = m[04], a11 = m[05], a12 = m[06], a13 = m[07],
		a20 = m[08], a21 = m[09], a22 = m[10], a23 = m[11];

	// Perform axis-specific matrix multiplication
	target[04] = a10 * c + a20 * s;
	target[05] = a11 * c + a21 * s;
	target[06] = a12 * c + a22 * s;
	target[07] = a13 * c + a23 * s;

	target[08] = a10 * -s + a20 * c;
	target[09] = a11 * -s + a21 * c;
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
		a00 = m[00], a01 = m[01], a02 = m[02], a03 = m[03],
		a20 = m[08], a21 = m[09], a22 = m[10], a23 = m[11];


	// Perform axis-specific matrix multiplication
	target[00] = a00 * c + a20 * -s;
	target[01] = a01 * c + a21 * -s;
	target[02] = a02 * c + a22 * -s;
	target[03] = a03 * c + a23 * -s;

	target[08] = a00 * s + a20 * c;
	target[09] = a01 * s + a21 * c;
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
		a00 = m[00], a01 = m[01], a02 = m[02], a03 = m[03],
		a10 = m[04], a11 = m[05], a12 = m[06], a13 = m[07];

	// Perform axis-specific matrix multiplication
	target[00] = a00 * c + a10 * s;
	target[01] = a01 * c + a11 * s;
	target[02] = a02 * c + a12 * s;
	target[03] = a03 * c + a13 * s;

	target[04] = a00 * -s + a10 * c;
	target[05] = a01 * -s + a11 * c;
	target[06] = a02 * -s + a12 * c;
	target[07] = a03 * -s + a13 * c;
}

/**
 * return a String representation of the matrix
 */
export function toString(m) {
	return `[${m[00]},\t${m[01]},\t${m[02]},\t${m[03]}]\n
		[${m[04]},\t${m[05]},\t${m[06]},\t${m[07]}]\n
		[${m[08]},\t${m[09]},\t${m[10]},\t${m[11]}]\n
		[${m[12]},\t${m[13]},\t${m[14]},\t${m[15]}]`;
}


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
 */
export function WebGL_Matrix4_test01(){

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
