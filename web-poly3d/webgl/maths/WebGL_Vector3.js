
/**
 * 
 */
export class WebGL_Vector3 {


	/**
	 * @param x : the 1st coordinate
	 * @param y : the 2nd coordinate
	 * @param z : the 3rd coordinate
	 */
	WebGL_Vector3(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * Define PI (Shared by all Vector4 Objects)
	 */
	static PI = 3.14159265;

	/**
	 * Clone this Vector3
	 */
	clone() {
		return new Vector4(this.x, this.y, this.z);
	}


	/**
	 * Add a vector to the current vector
	 */
	set(right) {
		this.x = right.x;
		this.y = right.y;
		this.z = right.z;
	}


	/**
	 * Add a vector to the current vector
	 */
	add(right) {
		return new Vector3(this.x + right.x, this.y + right.y, this.z + right.z);
	}

	/**
	 * Add a vector to the current vector
	 */
	add_inPlace(right) {
		this.x += right.x;
		this.y += right.y;
		this.z += right.z;
	}

	/**
	 * Substract a vector to the current vector
	 */
	substract(right) {
		return new Vector3(this.x - right.x, this.y - right.y, this.z - right.z);
	},


	/**
	 * 
	 */
	scale(scalar) {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
	}


	/**
	 * 
	 */
	modulus() {
		let x = this.x, y = this.y, z = this.z;
		return Math.sqrt(x * x + y * y + z * z);
	}


	/**
	 * Dot product
	 */
	dotProduct(right) {
		return this.x * right.x + this.y * right.y + this.z * right.z;
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
		return new Vector3(-this.x, -this.y, -this.z);
	}

	/**
	 * Normalize vector 
	 */
	normalize() {
		let x = this.x, y = this.y, z = this.z;
		var mod = 1.0 / Math.sqrt(x * x + y * y + z * z);
		return new WebGL_Vector3(x * mod, y * mod, z * mod);
	}


	/**
	 * 
	 * @param r 
	 * @param phi (in rad)
	 * @param theta (in rad)
	 */
	static spherical_radial(r, phi, theta) {
		let s = Math.sin(theta);
		return new WebGL_Vector3(
			r * Math.cos(phi) * s,
			r * Math.sin(phi) * s,
			r * Math.cos(theta));
	}

	/**
	 * 
	 * @param r 
	 * @param phi (in rad)
	 * @param theta (in rad)
	 */
	static eyeVector(r, phi, theta) {
		let s = Math.sin(theta);
		return new WebGL_Vector3(
			-r * Math.cos(phi) * s,
			-r * Math.sin(phi) * s,
			-r * Math.cos(theta));
	}
};