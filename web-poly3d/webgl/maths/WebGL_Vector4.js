


/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
export class WebGL_Vector4 {

	/**
	 * @param x : the 1st coordinate
	 * @param y : the 2nd coordinate
	 * @param z : the 3rd coordinate
	 * @param w : the 4th coordinate
	 */
	constructor(x = 0, y = 0, z = 0, w = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}


	/**
	 * Clone this Vector3
	 */
	clone() {
		return new WebGL_Vector4(this.x, this.y, this.z, this.w);
	}

	/**
	 * Add a vector to the current vector
	 */
	add(right) {
		return new WebGL_Vector4(this.x + right.x, this.y + right.y, this.z + right.z, this.w + right.w);
	}

	/**
	 * Substract a vector to the current vector
	 */
	substract(right) {
		return new WebGL_Vector4(this.x - right.x, this.y - right.y, this.z - right.z, this.w - right.w);
	}


	/**
	 * 
	 */
	scale(scalar) {
		return new WebGL_Vector4(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
	}

	/**
	 * 
	 */
	modulus() {
		let x = this.x, y = this.y, z = this.z, w = this.w;
		return Math.sqrt(x * x + y * y + z * z + w * w);
	}


	/**
	 * Dot product
	 */
	dotProduct(right) {
		return this.x * right.x + this.y * right.y + this.z * right.z + this.w * right.w;
	}


	/**
	 * Dot product
	 */
	crossProduct(right) {
		return new Vector3(
			this.y * right.z - this.z * right.y,
			this.z * right.x - this.x * right.z,
			this.x * right.y - this.y * right.x);
	}


	/**
	 * Opposite method 
	 */
	opposite() {
		return new WebGL_Vector4(-this.x, -this.y, -this.z, -this.w);
	}


	/**
	 * Normalize vector 
	 */
	normalize() {
		let x = this.x, y = this.y, z = this.z, w = this.w;
		let smod = 1.0 / Math.sqrt(x * x + y * y + z * z + w * w);
		return new WebGL_Vector4(this.x*smod, this.y*smod, this.z*smod, this.w*smod);
	}



	static testVector4() {
		var v = new Vector4(0, 4, 2, 23.1).clone();
		var v2 = new Vector4(12, -1.25, 2, 0);
		v.substract(v2);
		alert("done " + v.x + ", " + v.modulus());
	}
}
