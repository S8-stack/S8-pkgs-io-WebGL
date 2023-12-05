

/*
 * Matrix 3
 * 
 * 
 * 	To be consistent with OpenGL instructions, the matrix is stored as an array in the column major order.
 * 
 * 					column 0 :		column 1 :		column 2 :
 * 
 * 		line 0 :	c[0]			c[3]			c[6]
 *	 	line 1 :	c[1]			c[4]			c[7]
 * 		line 2 :	c[2]			c[5]			c[8]
 * 
 */


export function create() {
	return new Float32Array(9);
}



/**
 * @param c00 : the coefficient at line 0 and column 0
 * @param c01 : the coefficient at line 1 and column 0
 * @param c02 : the coefficient at line 2 and column 0
 * 
 * @param c10 : the coefficient at line 0 and column 1
 * @param c11 : the coefficient at line 1 and column 1
 * @param c12 : the coefficient at line 2 and column 1
 * 
 * @param c20 : the coefficient at line 0 and column 2
 * @param c21 : the coefficient at line 1 and column 2
 * @param c22 : the coefficient at line 2 and column 2
 */
export function setCoefficients(
	c00 = 1, c01 = 0, c02 = 0,
	c10 = 0, c11 = 1, c12 = 0,
	c20 = 0, c21 = 0, c22 = 1) {

	m[0] = c00; m[1] = c01; m[2] = c02; // Column 0
	m[3] = c10; m[4] = c11; m[5] = c12; // Column 1
	m[6] = c20; m[7] = c21; m[8] = c22; // Column 2
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

	// Column 1
	target[3] = source[3];
	target[4] = source[4];
	target[5] = source[5];

	// Column 2
	target[6] = source[6];
	target[7] = source[7];
	target[8] = source[8];
}



export function transformVector3d(m, v, target) {
	let x = v[0], y = v[1], z = v[2];
	target[0] = m[0] * x + m[3] * y + m[6] * z;
	target[1] = m[1] * x + m[4] * y + m[7] * z;
	target[2] = m[2] * x + m[5] * y + m[8] * z;
}


/**
 * Add a vector to the current vector
 */
export function add(mL, mR, target) {
	// column 0
	target[0] = mL[0] + mR[0];
	target[1] = mL[1] + mR[1];
	target[2] = mL[2] + mR[2];

	// column 1
	target[3] = mL[3] + mR[3];
	target[4] = mL[4] + mR[4];
	target[5] = mL[5] + mR[5];

	// column 2
	target[6] = mL[6] + mR[6];
	target[7] = mL[7] + mR[7];
	target[8] = mL[8] + mR[8];
};


/**
 * Add a vector to the current vector
 */
export function subtsract(mL, mR, target) {
	// column 0
	target[0] = mL[0] - mR[0];
	target[1] = mL[1] - mR[1];
	target[2] = mL[2] - mR[2];

	// column 1
	target[3] = mL[3] - mR[3];
	target[4] = mL[4] - mR[4];
	target[5] = mL[5] - mR[5];

	// column 2
	target[6] = mL[6] - mR[6];
	target[7] = mL[7] - mR[7];
	target[8] = mL[8] - mR[8];
};



/**
 * 
 * @param {Float32Array} m 
 * @param {Float32Array} target 
 */
export function transpose(m, target) {
	// column 0
	target[0] = m[0];
	target[1] = mL[3];
	target[2] = mL[6];

	// column 1
	target[3] = m[1];
	target[4] = m[4];
	target[5] = m[7];

	// column 2
	target[6] = m[2];
	target[7] = m[5];
	target[8] = m[8];
}


/**
 * 
 * @param {Float32Array} mL 
 * @param {Float32Array} mR 
 * @param {Float32Array} target 
 */
export function multiply(mL, mR, target) {

	// Cache the matrix values (Allow huge speed increase)
	let a00 = mL[0], a01 = mL[1], a02 = mL[2],
		a10 = mL[3], a11 = mL[4], a12 = mL[5],
		a20 = mL[6], a21 = mL[7], a22 = mL[8],

		b00 = mR[0], b01 = mR[1], b02 = mR[2],
		b10 = mR[3], b11 = mR[4], b12 = mR[5],
		b20 = mR[6], b21 = mR[7], b22 = mR[8];

	// vector 0
	target[0] = b00 * a00 + b01 * a10 + b02 * a20;
	target[1] = b00 * a01 + b01 * a11 + b02 * a21;
	target[2] = b00 * a02 + b01 * a12 + b02 * a22;

	// vector 1
	target[3] = b10 * a00 + b11 * a10 + b12 * a20;
	target[4] = b10 * a01 + b11 * a11 + b12 * a21;
	target[5] = b10 * a02 + b11 * a12 + b12 * a22;

	// vector 2
	target[6] = b20 * a00 + b21 * a10 + b22 * a20;
	target[7] = b20 * a01 + b21 * a11 + b22 * a21;
	target[8] = b20 * a02 + b21 * a12 + b22 * a22;
}



export function cast4to3(m, target) {

	// Cache the matrix values (Allow huge speed increase)
	// Cache the matrix values (Allow huge speed increase)
	let a00 = m[0], a01 = m[4], a02 = m[8],
		a10 = m[1], a11 = m[5], a12 = m[9],
		a20 = m[2], a21 = m[6], a22 = m[10];

	// vector 0
	target[0] = a00;
	target[1] = a10;
	target[2] = a20;

	// vector 1
	target[3] = a01;
	target[4] = a11;
	target[5] = a21;

	// vector 2
	target[6] = a02;
	target[7] = a12;
	target[8] = a22;
}


/**
 * Inverse the matrix
 * 
 * @param destination : if destination is non null, the inverse is stored in destination.
 * If destination is null, the inverse is stored in this Matrix3
 * 
 * (Matrix3) a, b;
 * 
 * Case 1 : a.inverse(b) : a is inverted and stored in b (leaving a unaffected)
 * Case 2 : a.inverse(); a is inverted in place;
 */
export function inverse(m, target) {

	// Cache the matrix values (Allow huge speed increase)
	let a00 = m[0], a01 = m[1], a02 = m[2],
		a10 = m[3], a11 = m[4], a12 = m[5],
		a20 = m[6], a21 = m[7], a22 = m[8],

		b01 = a22 * a11 - a12 * a21,
		b11 = -a22 * a10 + a12 * a20,
		b21 = a21 * a10 - a11 * a20,

		d = a00 * b01 + a01 * b11 + a02 * b21,
		id = 1 / d;

	target[0] = b01 * id;
	target[1] = (-a22 * a01 + a02 * a21) * id;
	target[2] = (a12 * a01 - a02 * a11) * id;

	target[3] = b11 * id;
	target[4] = (a22 * a00 - a02 * a20) * id;
	target[5] = (-a12 * a00 + a02 * a10) * id;

	target[6] = b21 * id;
	target[7] = (-a21 * a00 + a01 * a20) * id;
	target[8] = (a11 * a00 - a01 * a10) * id;
}


/**
 * Inverse the matrix
 * 
 * @param destination : if destination is non null, the inverse is stored in destination.
 * If destination is null, the inverse is stored in this Matrix3
 * 
 * (Matrix3) a, b;
 * 
 * Case 1 : a.inverse(b) : a is inverted and stored in b (leaving a unaffected)
 * Case 2 : a.inverse(); a is inverted in place;
 */
export function transposeInverse(m, target) {

	// Cache the matrix values (Allow huge speed increase)
	let a00 = m[0], a01 = m[1], a02 = m[2],
		a10 = m[3], a11 = m[4], a12 = m[5],
		a20 = m[6], a21 = m[7], a22 = m[8],

		b01 = a22 * a11 - a12 * a21,
		b11 = -a22 * a10 + a12 * a20,
		b21 = a21 * a10 - a11 * a20,

		d = a00 * b01 + a01 * b11 + a02 * b21,
		id = 1 / d;

	target[0] = b01 * id;
	target[1] = (-a22 * a01 + a02 * a21) * id;
	target[2] = (a12 * a01 - a02 * a11) * id;

	target[3] = b11 * id;
	target[4] = (a22 * a00 - a02 * a20) * id;
	target[5] = (-a12 * a00 + a02 * a10) * id;

	target[6] = b21 * id;
	target[7] = (-a21 * a00 + a01 * a20) * id;
	target[8] = (a11 * a00 - a01 * a10) * id;
};



/**
 * return a String representation of the matrix
 */
export function toString(m) {
	return `[${m[0]},\t${m[1]},\t${m[2]}]\n
		[${m[3]},\t${m[4]},\t${m[5]}]\n
		[${m[6]},\t${m[7]},\t${m[8]}]`;
}


export function random(target) {
	for (let i = 0; i < 9; i++) { target[i] = Math.random(); }
};