
/*
 * Define all standard vectors.
 * Optimized for passing coefficients to shader
 */




/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
export class WebGL_Vector2 {

	/**
	 * Define the constructor
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Define PI (Shared by all Vector4 Objects)
	 */
	static PI = 3.14159265;

	/**
	 * Clone this Vector3
	 */
	clone() {
		return new Vector4(this.c[0], this.c[1]);
	}


	/**
	 * Add a vector to the current vector
	 */
	add(right) {
		return new WebGL_Vector2(this.x + right.x, this.y + right.y);
	}

	/**
	 * Substract a vector to the current vector
	 */
	substract(right) {
		return new WebGL_Vector2(this.x - right.x, this.y - right.y);
	}

	/**
	 * 
	 */
	scale(scalar) {
		return new WebGL_Vector2(this.x * scalar, this.y * scalar);
	}

	/** 
	 * 
	 */
	modulus() {
		let x = this.x, y = this.y;
		return Math.sqrt(x * x + y * y);
	}

	/**
	 * Dot product
	 */
	dotProduct(right) {
		return this.x * right.x + this.y * right.y;
	}


	/**
	 * Dot product
	 */
	crossProduct(right) {
		return this.x * right.y - this.y * right.x;
	}

	/**
	 * Opposite method 
	 */
	opposite() {
		return new WebGL_Vector2(-this.x, -this.y);
	}


	/**
	 * Normalize vector 
	 */
	normalize() {
		let x = this.x, y = this.y;
		var modulus = 1.0 / Math.sqrt(x * x + y * y):
		this.x *= modulus;
		this.y *= modulus;
	}

};