

/*
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



/**
 * No argument constructor
 */
function WebGL_Matrix4() {
	this.c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}




/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
export class WebGL_Matrix4 {

	/**
	 * Define PI (Shared by all Vector4 Objects)
	 */
	static PI = 3.14159265;




	/**
	 * @param c00 : the coefficient at line 0 and column 0
	 * @param c10 : the coefficient at line 1 and column 0
	 * @param c20 : the coefficient at line 2 and column 0
	 * @param c30 : the coefficient at line 3 and column 0
	 * 
	 * @param c01 : the coefficient at line 0 and column 1
	 * @param c11 : the coefficient at line 1 and column 1
	 * @param c21 : the coefficient at line 2 and column 1
	 * @param c31 : the coefficient at line 3 and column 1
	 * 
	 * @param c02 : the coefficient at line 0 and column 2
	 * @param c12 : the coefficient at line 1 and column 2
	 * @param c22 : the coefficient at line 2 and column 2
	 * @param c32 : the coefficient at line 3 and column 2
	 * 
	 * @param c03 : the coefficient at line 0 and column 3
	 * @param c13 : the coefficient at line 1 and column 3
	 * @param c23 : the coefficient at line 2 and column 3
	 * @param c33 : the coefficient at line 3 and column 3
	 * 
	 */
	constructor(
		c00 = 1, c01 = 0, c02 = 0, c03 = 0,
		c10 = 0, c11 = 1, c12 = 0, c13 = 0,
		c20 = 0, c21 = 0, c22 = 1, c23 = 0,
		c30 = 0, c31 = 0, c32 = 0, c33 = 1) {

		// Column 0
		this.c00 = c00;
		this.c01 = c01;
		this.c02 = c02;
		this.c03 = c03; //3

		// Column 1
		this.c10 = c10;
		this.c11 = c11;
		this.c12 = c12;
		this.c13 = c13; //7

		// Column 2
		this.c20 = c20;
		this.c21 = c21;
		this.c22 = c22;
		this.c23 = c23; //11

		// Column 3
		this.c30 = c30;
		this.c31 = c31;
		this.c32 = c32;
		this.c33 = c33; //15
	}


	setAffine(affine) {

		let matrix = affine.matrix;

		// Column 0
		this.c00 = matrix.c0;
		this.c01 = matrix.c1;
		this.c02 = matrix.c2;
		this.c03 = 0.0;

		// Column 1
		this.c10 = matrix.c3;
		this.c11 = matrix.c4;
		this.c12 = matrix.c5;
		this.c13 = 0.0;

		// Column 2
		this.c20 = matrix.c6;
		this.c21 = matrix.c7;
		this.c22 = matrix.c8;
		this.c23 = 0.0;

		let vector = affine.vector;

		// Column 3
		this.c30 = vector.x;
		this.c31 = vector.y;
		this.c32 = vector.z;
		this.c33 = 1.0;
	}



	/**
	 * Clone this Matrix4
	 */
	copy() {
		return new WebGL_Matrix4(
			this.c00, this.c01, this.c02, this.c03, 	// Column 0
			this.c10, this.c11, this.c12, this.c13, 	// Column 1
			this.c20, this.c21, this.c22, this.c23, 	// Column 2
			this.c30, this.c31, this.c32, this.c33); 	// Column 3
	}


	/**
	 * Add a vector to the current vector
	 */
	add(right) {
		return new WebGL_Matrix4(
			this.c00 + right.c00, this.c01 + right.c01, this.c02 + right.c02, this.c03 + right.c03,
			this.c10 + right.c10, this.c11 + right.c11, this.c12 + right.c12, this.c13 + right.c13,
			this.c20 + right.c20, this.c21 + right.c21, this.c22 + right.c22, this.c23 + right.c23,
			this.c30 + right.c30, this.c31 + right.c31, this.c32 + right.c32, this.c33 + right.c33);
	}

	/**
	 * Substract a vector to the current vector
	 */
	substract(right) {
		return new WebGL_Matrix4(
			this.c00 - right.c00, this.c01 - right.c01, this.c02 - right.c02, this.c03 - right.c03,
			this.c10 - right.c10, this.c11 - right.c11, this.c12 - right.c12, this.c13 - right.c13,
			this.c20 - right.c20, this.c21 - right.c21, this.c22 - right.c22, this.c23 - right.c23,
			this.c30 - right.c30, this.c31 - right.c31, this.c32 - right.c32, this.c33 - right.c33);
	}


	/**
	 * Transposes a mat4 (flips the values over the diagonal)
	 *
	 * @param {Matrix4} destination : Matrix4 receiving transposed values. If not specified result is written to this
	 */
	transpose() {
		return new WebGL_Matrix4(
			this.c00, this.c10, this.c20, this.c30, 	// Column 0
			this.c01, this.c11, this.c21, this.c31, 	// Column 1
			this.c02, this.c12, this.c22, this.c32, 	// Column 2
			this.c03, this.c13, this.c23, this.c33); 	// Column 3
	}



	transform(argument) {
		let x = argument[0], y = argument[1], z = argument[2], w = argument[3];
		let target = new Array(4);
		target[0] = this.c00 * x + this.c10 * y + this.c20 * z + this.c30 * w;
		target[1] = this.c01 * x + this.c11 * y + this.c21 * z + this.c31 * w;
		target[2] = this.c02 * x + this.c12 * y + this.c22 * z + this.c32 * w;
		target[3] = this.c03 * x + this.c13 * y + this.c23 * z + this.c33 * w;
		return target;
	}

	dotVector4(v) {
		let v0 = v[0], v1 = v[1], v2 = v[2], v3 = v[3];
		let r = new Array(4);

		// r
		r[0] = this.c00 * v0 + this.c10 * v1 + this.c20 * v2 + this.c30 * v3;
		r[1] = this.c01 * v0 + this.c11 * v1 + this.c21 * v2 + this.c31 * v3;
		r[2] = this.c02 * v0 + this.c12 * v1 + this.c22 * v2 + this.c32 * v3;
		r[3] = this.c03 * v0 + this.c13 * v1 + this.c23 * v2 + this.c33 * v3;
		return r;
	}

	dotVector3(v) {
		let v0 = v[0], v1 = v[1], v2 = v[2];
		return [
			this.c00 * v0 + this.c10 * v1 + this.c20 * v2,
			this.c01 * v0 + this.c11 * v1 + this.c21 * v2,
			this.c02 * v0 + this.c12 * v1 + this.c22 * v2
		];
	}

	getTranslation() {
		return [this.c30, this.c31, this.c32];
	}


	/**
	 * @param right : right member of the binary operator
	 * @param d : destination
	 */
	multiply(left) {

		// Cache the matrix values (Allow huge speed increase)
		let

			a00 = this.c00, a01 = this.c10, a02 = this.c20, a03 = this.c30,
			a10 = this.c01, a11 = this.c11, a12 = this.c21, a13 = this.c31,
			a20 = this.c02, a21 = this.c12, a22 = this.c22, a23 = this.c32,
			a30 = this.c03, a31 = this.c13, a32 = this.c23, a33 = this.c33,

			b00 = rightc00, b01 = right.c10, b02 = right.c20, b03 = right.c30,
			b10 = right.c01, b11 = right.c11, b12 = right.c21, b13 = right.c31,
			b20 = right.c02, b21 = right.c12, b22 = right.c22, b23 = right.c32,
			b30 = right.c03, b31 = right.c13, b32 = right.c23, b33 = right.c33;


		return new WebGL_Matrix4(
			a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
			a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
			a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
			a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,

			a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
			a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
			a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
			a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,

			a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
			a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
			a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
			a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,

			a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
			a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
			a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
			a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33);
	}


	/**
	 * @param destination : destination
	 */
	inverse() {

		// Cache the matrix values (Allow huge speed increase)
		let
			a00 = this.c00, a01 = this.c10, a02 = this.c20, a03 = this.c30,
			a10 = this.c01, a11 = this.c11, a12 = this.c21, a13 = this.c31,
			a20 = this.c02, a21 = this.c12, a22 = this.c22, a23 = this.c32,
			a30 = this.c03, a31 = this.c13, a32 = this.c23, a33 = this.c33,

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

		return new WebGL_Matrix4(

			// vector 0
			(a11 * b11 - a21 * b10 + a31 * b09) * invDet,
			(-a10 * b11 + a20 * b10 - a30 * b09) * invDet,
			(a13 * b05 - a23 * b04 + a33 * b03) * invDet,
			(-a12 * b05 + a22 * b04 - a32 * b03) * invDet,

			// vector 1
			(-a01 * b11 + a21 * b08 - a31 * b07) * invDet,
			(a00 * b11 - a20 * b08 + a30 * b07) * invDet,
			(-a03 * b05 + a23 * b02 - a33 * b01) * invDet,
			(a02 * b05 - a22 * b02 + a32 * b01) * invDet,

			// vector 2
			(a01 * b10 - a11 * b08 + a31 * b06) * invDet,
			(-a00 * b10 + a10 * b08 - a30 * b06) * invDet,
			(a03 * b04 - a13 * b02 + a33 * b00) * invDet,
			(-a02 * b04 + a12 * b02 - a32 * b00) * invDet,

			// vector 3
			(-a01 * b09 + a11 * b07 - a21 * b06) * invDet,
			(a00 * b09 - a10 * b07 + a20 * b06) * invDet,
			(-a03 * b03 + a13 * b01 - a23 * b00) * invDet,
			(a02 * b03 - a12 * b01 + a22 * b00) * invDet);
	}



	/**
	 */
	transposeInverse() {

		// Cache the matrix values (Allow huge speed increase)
		let

			a00 = this.c00, a01 = this.c10, a02 = this.c20, a03 = this.c30,
			a10 = this.c01, a11 = this.c11, a12 = this.c21, a13 = this.c31,
			a20 = this.c02, a21 = this.c12, a22 = this.c22, a23 = this.c32,
			a30 = this.c03, a31 = this.c13, a32 = this.c23, a33 = this.c33,

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

		return new WebGL_Matrix4(
			(a11 * b11 - a21 * b10 + a31 * b09) * invDet,
			(-a01 * b11 + a21 * b08 - a31 * b07) * invDet,
			(a01 * b10 - a11 * b08 + a31 * b06) * invDet,
			(-a01 * b09 + a11 * b07 - a21 * b06) * invDet,

			(-a10 * b11 + a20 * b10 - a30 * b09) * invDet,
			(a00 * b11 - a20 * b08 + a30 * b07) * invDet,
			(-a00 * b10 + a10 * b08 - a30 * b06) * invDet,
			(a00 * b09 - a10 * b07 + a20 * b06) * invDet,

			(a13 * b05 - a23 * b04 + a33 * b03) * invDet,
			(-a03 * b05 + a23 * b02 - a33 * b01) * invDet,
			(a03 * b04 - a13 * b02 + a33 * b00) * invDet,
			(-a03 * b03 + a13 * b01 - a23 * b00) * invDet,

			(-a12 * b05 + a22 * b04 - a32 * b03) * invDet,
			(a02 * b05 - a22 * b02 + a32 * b01) * invDet,
			(-a02 * b04 + a12 * b02 - a32 * b00) * invDet,
			(a02 * b03 - a12 * b01 + a22 * b00) * invDet);
	}



	/**
	 * set-up coefficients of this matrix to identity
	 */
	identity() {
		this.c00 = 1.0; this.c10 = 0.0; this.c20 = 0.0; this.c30 = 0.0;
		this.c01 = 0.0; this.c11 = 1.0; this.c21 = 0.0; this.c31 = 0.0;
		this.c02 = 0.0; this.c12 = 0.0; this.c22 = 1.0; this.c32 = 0.0;
		this.c03 = 0.0; this.c13 = 0.0; this.c23 = 0.0; this.c33 = 1.0;
	}


	/**
	 * Randomize a matrix
	 */
	random() {
		// Column 0
		this.c00 = Math.random();
		this.c01 = Math.random();
		this.c02 = Math.random();
		this.c03 = Math.random();

		// Column 1
		this.c10 = Math.random();
		this.c11 = Math.random();
		this.c12 = Math.random();
		this.c13 = Math.random();

		// Column 2
		this.c20 = Math.random();
		this.c21 = Math.random();
		this.c22 = Math.random();
		this.c23 = Math.random();

		// Column 3
		this.c30 = Math.random();
		this.c31 = Math.random();
		this.c32 = Math.random();
		this.c33 = Math.random();
	}



	/**
	 * Build a new projection matrix
	 * 
	 * @param fov : fovea
	 * @param ratio
	 * @param near
	 * @param far
	 * @return
	 */

	/*
	perspectiveProjection : function(fov, ratio, near, far) {

		var f = (1.0f / Math.tan(fov * (Math.PI / 360.0)));

		this.identity();

		this.c00 = f / ratio;
		this.c[1 * 4 + 1] = f;
		this.c[2 * 4 + 2] = (far + near) / (near - far);
		this.c[3 * 4 + 2] = (2.0f * far * near) / (near - far);
		this.c[2 * 4 + 3] = -1.0f;
		this.c[3 * 4 + 3] = 0.0f;
	}
	 */


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
	static frustum(left, right, bottom, top, near, far) {

		let rl = (right - left),
			tb = (top - bottom),
			fn = (far - near);

		// set coefficients
		return new WebGL_Matrix4(
		
		// vector 0
		(near * 2) / rl, 0, 0, 0,

		// vector 1
		0, (near * 2) / tb, 0, 0,

		// vector 2
		(right + left) / rl,
		(top + bottom) / tb,
		-(far + near) / fn,
		-1,

		// vector 3
		0,
		0,
		-(far * near * 2) / fn,
		0);
	}


	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {number} fovy : Vertical field of view (fovea angle)
	 * @param {number} aspect : Aspect ratio. typically viewport width/height
	 * @param {number} near : Near bound of the frustum
	 * @param {number} far : Far bound of the frustum
	 */
	static perspectiveProjection(fovy, aspect, near, far) {
		let top = near * Math.tan(fovy * Math.PI / 360.0),
			right = top * aspect;
		return frustum(-right, right, -top, top, near, far);
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
	static orthogonalProjection(left, right, bottom, top, near, far) {
		let rl = (right - left),
			tb = (top - bottom),
			fn = (far - near);

		// set coefficients
		return new WebGL_Matrix4(
		2 / rl, 0, 0, 0, // vector 0
		0, 2 / tb, 0, 0, // vector 1
		0, 0, -2 / fn, 0, // vector 2

		// vector 3
		-(left + right) / rl,
		-(top + bottom) / tb,
		-(far + near) / fn,
		1.0);
	}



	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {Vector3} eye Position of the viewer
	 * @param {Vector3} center Point the viewer is looking at
	 * @param {Vector3} up vec3 pointing "up"
	 */
	static lookAt(eye, center, up) {

		// load numbers
		let len;

		let eyex = eye.x, eyey = eye.y, eyez = eye.z,
			upx = up.x, upy = up.y, upz = up.z,
			centerx = center.x, centery = center.y, centerz = center.z;

		if (eyex == centerx && eyey == centery && eyez == centerz) {
			this.identity();
		}

		//vec3.direction(eye, center, z);
		let z0 = eyex - centerx;
		let z1 = eyey - centery;
		let z2 = eyez - centerz;

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
		return new WebGL_Matrix4(
			x0, y0, z0, 0,
			x1, y1, z1, 0,
			x2, y2, z2, 0,

			-(x0 * eyex + x1 * eyey + x2 * eyez),
			-(y0 * eyex + y1 * eyey + y2 * eyez),
			-(z0 * eyex + z1 * eyey + z2 * eyez),
			1);
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
	rotateX(angle) {

		let s = Math.sin(angle),
			c = Math.cos(angle),

			a10 = this.c10,
			a11 = this.c11,
			a12 = this.c12,
			a13 = this.c13,

			a20 = this.c20,
			a21 = this.c21,
			a22 = this.c22,
			a23 = this.c23;

		// Perform axis-specific matrix multiplication
		this.c10 = a10 * c + a20 * s;
		this.c11 = a11 * c + a21 * s;
		this.c12 = a12 * c + a22 * s;
		this.c13 = a13 * c + a23 * s;

		this.c20 = a10 * -s + a20 * c;
		this.c21 = a11 * -s + a21 * c;
		this.c22 = a12 * -s + a22 * c;
		this.c23 = a13 * -s + a23 * c;
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
	rotateY(angle) {
		let s = Math.sin(angle),
			c = Math.cos(angle),
			a00 = this.c00,
			a01 = this.c01,
			a02 = this.c02,
			a03 = this.c03,
			a20 = this.c20,
			a21 = this.c21,
			a22 = this.c22,
			a23 = this.c23;


		// Perform axis-specific matrix multiplication
		this.c00 = a00 * c + a20 * -s;
		this.c01 = a01 * c + a21 * -s;
		this.c02 = a02 * c + a22 * -s;
		this.c03 = a03 * c + a23 * -s;

		this.c20 = a00 * s + a20 * c;
		this.c21 = a01 * s + a21 * c;
		this.c22 = a02 * s + a22 * c;
		this.c23 = a03 * s + a23 * c;
	}

	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param {mat4} mat mat4 to rotate
	 * @param {number} angle Angle (in radians) to rotate
	 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
	 *
	 * @returns {mat4} dest if specified, mat otherwise
	 */
	rotateZ(angle) {
		let s = Math.sin(angle),
			c = Math.cos(angle),
			a00 = this.c00,
			a01 = this.c01,
			a02 = this.c02,
			a03 = this.c03,
			a10 = this.c10,
			a11 = this.c11,
			a12 = this.c12,
			a13 = this.c13;

		// Perform axis-specific matrix multiplication
		this.c00 = a00 * c + a10 * s;
		this.c01 = a01 * c + a11 * s;
		this.c02 = a02 * c + a12 * s;
		this.c03 = a03 * c + a13 * s;

		this.c10 = a00 * -s + a10 * c;
		this.c11 = a01 * -s + a11 * c;
		this.c12 = a02 * -s + a12 * c;
		this.c13 = a03 * -s + a13 * c;
	}

	/**
	 * return a String representation of the matrix
	 */
	toString() {
		return "[" + this.c00 + ",\t" + this.c10 + ",\t" + this.c20 + ",\t" + this.c30 + "]\n" +
			"[" + this.c01 + ",\t" + this.c11 + ",\t" + this.c21 + ",\t" + this.c31 + "]\n" +
			"[" + this.c02 + ",\t" + this.c12 + ",\t" + this.c22 + ",\t" + this.c32 + "]\n" +
			"[" + this.c03 + ",\t" + this.c13 + ",\t" + this.c23 + ",\t" + this.c33 + "]\n";
	}


	static rotationX(angle) {

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

	static rotationY(angle) {
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

	static rotationZ = function (angle) {
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
};


export const WebGL_Matrix4_test01 = function () {

	let m = new Matrix4(), inv = new Matrix4(), tr = new Matrix4(), trinv = new Matrix4(), result = new Matrix4(),
		trinv3 = new Matrix3(), trinv3c = new Matrix3(), result3 = new Matrix3();
	m.random();
	inv.inverse(m);
	tr.transpose(inv);
	trinv.transposeInverse(m);

	result.substract(tr, trinv);
	alert(result.toString());

	result.multiply(inv, m);
	alert(result.toString());

	trinv3.transposeInverse4(m);
	trinv3c.copy4(trinv);

	result3.substract(trinv3, trinv3c);
	alert(result3.toString());


};



/*
 * Rotation matrix
 */




/**
 * Average multiplication time less than 600 nanoseconds.
 */
export const WebGL_Matrix4_testPerformance = function () {

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
