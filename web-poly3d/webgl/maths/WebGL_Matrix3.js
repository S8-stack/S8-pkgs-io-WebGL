

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



/**
 * No argument constructor
 */
export class WebGL_Matrix3 {

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
	constructor(
		c00 = 1, c01 = 0, c02 = 0,
		c10 = 0, c11 = 1, c12 = 0,
		c20 = 0, c21 = 0, c22 = 1) {

		// Column 0
		this.c00 = c00;
		this.c01 = c01;
		this.c02 = c02;

		// Column 1
		this.c10 = c10;
		this.c11 = c11;
		this.c12 = c12;

		// Column 2
		this.c20 = c20;
		this.c21 = c21;
		this.c22 = c22;
	}

	/**
	 * Define PI (Shared by all Vector4 Objects)
	 */
	static PI = 3.14159265;

	/**
	 * Clone this Vector3
	 */
	copy() {
		return new WebGL_Matrix3(
			this.c00, this.c01, this.c02,
			this.c10, this.c11, this.c12,
			this.c20, this.c21, this.c22);
	}

	/**
	 * 
	 * @param Matrix4 argument 
	 */
	copy4(argument) {

		this.c[0] = argument.c[0];
		this.c[1] = argument.c[1];
		this.c[2] = argument.c[2];

		this.c[3] = argument.c[4];
		this.c[4] = argument.c[5];
		this.c[5] = argument.c[6];

		this.c[6] = argument.c[8];
		this.c[7] = argument.c[9];
		this.c[8] = argument.c[10];

	}


	/**
	 * Add the right vector to the current vector and write result in the destination vector
	 * @param : left
	 * @param : right
	 */
	add(right) {
		return new WebGL_Matrix3(
			this.c00 + right.c00, this.c01 + right.c01, this.c02 + right.c02, // vector 0
			this.c10 + right.c10, this.c11 + right.c11, this.c12 + right.c12, // vector 1
			this.c20 + right.c20, this.c21 + right.c21, this.c22 + right.c22);// vector 2
	}

	/**
	 * Substract the right vector to the current vector and write result in the destination vector
	 * @param : left
	 * @param : right
	 */
	substract(right) {
		return new WebGL_Matrix3(
			this.c00 - right.c00, this.c01 - right.c01, this.c02 - right.c02,
			this.c10 - right.c10, this.c11 - right.c11, this.c12 - right.c12,
			this.c20 - right.c20, this.c21 - right.c21, this.c22 - right.c22);
	}


	/**
	 * Transposes a mat4 (flips the values over the diagonal)
	 *
	 */
	transpose() {
		return new WebGL_Matrix3(
			this.c00, this.c10, this.c20,
			this.c01, this.c11, this.c21,
			this.c02, this.c12, this.c22);
	}

	/**
	 * @param right : right member of the binary operator
	 * @param d : destination
	 */
	multiply(right) {

		// Cache the matrix values (Allow huge speed increase)
		let
			a00 = this.c[0], a01 = this.c[1], a02 = this.c[2],
			a10 = this.c[3], a11 = this.c[4], a12 = this.c[5],
			a20 = this.c[6], a21 = this.c[7], a22 = this.c[8],

			b00 = right.c[0], b01 = right.c[1], b02 = right.c[2],
			b10 = right.c[3], b11 = right.c[4], b12 = right.c[5],
			b20 = right.c[6], b21 = right.c[7], b22 = right.c[8];

		return new WebGL_Matrix3(
			// vector 0
			b00 * a00 + b01 * a10 + b02 * a20,
			b00 * a01 + b01 * a11 + b02 * a21,
			b00 * a02 + b01 * a12 + b02 * a22,

			// vector 1
			b10 * a00 + b11 * a10 + b12 * a20,
			b10 * a01 + b11 * a11 + b12 * a21,
			b10 * a02 + b11 * a12 + b12 * a22,

			// vector 2
			b20 * a00 + b21 * a10 + b22 * a20,
			b20 * a01 + b21 * a11 + b22 * a21,
			b20 * a02 + b21 * a12 + b22 * a22);
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
	inverse() {
		// Cache the matrix values (makes for huge speed increases!)
		let

			a00 = this.c00, a01 = this.c01, a02 = this.c02,
			a10 = this.c10, a11 = this.c11, a12 = this.c12,
			a20 = this.c20, a21 = this.c21, a22 = this.c22,

			b01 = a22 * a11 - a12 * a21,
			b11 = -a22 * a10 + a12 * a20,
			b21 = a21 * a10 - a11 * a20,

			d = a00 * b01 + a01 * b11 + a02 * b21,
			id = 1 / d;

		return new WebGL_Matrix3(
			b01 * id,
			(-a22 * a01 + a02 * a21) * id,
			(a12 * a01 - a02 * a11) * id,

			b11 * id,
			(a22 * a00 - a02 * a20) * id,
			(-a12 * a00 + a02 * a10) * id,

			b21 * id,
			(-a21 * a00 + a01 * a20) * id,
			(a11 * a00 - a01 * a10) * id);
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
	transposeInverse() {
		let // Cache the matrix values (makes for huge speed increases!)
			a00 = this.c00, a01 = this.c01, a02 = this.c02,
			a10 = this.c10, a11 = this.c11, a12 = this.c12,
			a20 = this.c20, a21 = this.c21, a22 = this.c22,

			b01 = a22 * a11 - a12 * a21,
			b11 = -a22 * a10 + a12 * a20,
			b21 = a21 * a10 - a11 * a20,

			d = a00 * b01 + a01 * b11 + a02 * b21,
			id = 1 / d;

		return new WebGL_Matrix3(
			b01 * id,
			(-a22 * a01 + a02 * a21) * id,
			(a12 * a01 - a02 * a11) * id,
			b11 * id,
			(a22 * a00 - a02 * a20) * id,
			(-a12 * a00 + a02 * a10) * id,
			b21 * id,
			(-a21 * a00 + a01 * a20) * id,
			(a11 * a00 - a01 * a10) * id);
	}



	/**
	 * 
	 * @param argument is a Matrix4
	 */
	transposeInverse4() {

		let // Cache the matrix values (Allow huge speed increase)
			a00 = this.c00, a01 = this.c01, a02 = this.c02, a03 = this.c03,
			a10 = this.c10, a11 = this.c11, a12 = this.c12, a13 = this.c13,
			a20 = this.c20, a21 = this.c21, a22 = this.c22, a23 = this.c23,
			a30 = this.c30, a31 = this.c31, a32 = this.c32, a33 = this.c33,

			b00 = a00 * a11 - a10 * a01,
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

		return new WebGL_Matrix3(
			(a11 * b11 - a21 * b10 + a31 * b09) * invDet,
			(-a01 * b11 + a21 * b08 - a31 * b07) * invDet,
			(a01 * b10 - a11 * b08 + a31 * b06) * invDet,
			(-a10 * b11 + a20 * b10 - a30 * b09) * invDet,
			(a00 * b11 - a20 * b08 + a30 * b07) * invDet,
			(-a00 * b10 + a10 * b08 - a30 * b06) * invDet,
			(a13 * b05 - a23 * b04 + a33 * b03) * invDet,
			(-a03 * b05 + a23 * b02 - a33 * b01) * invDet,
			(a03 * b04 - a13 * b02 + a33 * b00) * invDet);
	}


	/**
	 * return a String representation of the matrix
	 */
	toString() {
		return "[" + this.c00 + ",\t" + this.c01 + ",\t" + this.c02 + "]\n" +
			"[" + this.c10 + ",\t" + this.c11 + ",\t" + this.c12 + "]\n" +
			"[" + this.c20 + ",\t" + this.c21 + ",\t" + this.c22 + "]\n";
	}

	random() {
		// Column 0
		this.c00 = Math.random();
		this.c01 = Math.random();
		this.c02 = Math.random();

		// Column 1
		this.c10 = Math.random();
		this.c11 = Math.random();
		this.c12 = Math.random();

		// Column 2
		this.c20 = Math.random();
		this.c21 = Math.random();
		this.c22 = Math.random();
	}
};


/*
export const WebGL_Matrix3_test02 = function () {

	let m = new Matrix3();
	Matrix3.random(m);
	var inv = m.clone();
	inv.inverse();
	inv.multiply(m, inv);
	alert(inv.toString());

};
*/