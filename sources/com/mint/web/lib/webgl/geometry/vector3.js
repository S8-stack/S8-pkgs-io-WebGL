


/*
 * Vector 3
 */



/**
 * No argument constructor
 */
function Vector3(){
	this.c = [];
}


/**
 * @param x : the 1st coordinate
 * @param y : the 2nd coordinate
 * @param z : the 3rd coordinate
 */
function Vector3(x, y, z){
	this.c = [];
	this.c[0] = x;
	this.c[1] = y;
	this.c[2] = z;
}


/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
Vector3.prototype = {

		/**
		 * Define the constructor
		 */
		constructor : Vector3,
		
		/**
		 * Define PI (Shared by all Vector4 Objects)
		 */
		PI : 3.14159265,
		
		/**
		 * Clone this Vector3
		 */
		clone: function(){
			return new Vector4(this.c[0], this.c[1], this.c[2]);
		},
		
		
		/**
		 * Add a vector to the current vector
		 */
		set: function(right) {
			this.c[0] = right.c[0];
			this.c[1] = right.c[1];
			this.c[2] = right.c[2];
		},

		
		/**
		 * Add a vector to the current vector
		 */
		add: function(right) {
			return new Vector3(this.c[0]+right.c[0], this.c[1]+right.c[1], this.c[2]+right.c[2]);
		},
		
		/**
		 * Add a vector to the current vector
		 */
		add_inPlace: function(right) {
			this.c[0]+=right.c[0];
			this.c[1]+=right.c[1];
			this.c[2]+=right.c[2];
		},

		/**
		 * Substract a vector to the current vector
		 */
		substract : function(right){
			return new Vector3(this.c[0]-right.c[0], this.c[1]-right.c[1], this.c[2]-right.c[2]);
		},
		

		/**
		 * 
		 */
		multiply : function(scalar){
			return new Vector3(this.c[0]*scalar, this.c[1]*scalar, this.c[2]*scalar);
		},

		
		/**
		 * 
		 */
		modulus : function(){
			var x = this.c[0];
			var y = this.c[1];
			var z = this.c[2];
			return Math.sqrt(x*x + y*y + z*z);
		},


		/**
		 * Dot product
		 */
		dotProduct : function(right){
			return this.c[0]*right.c[0] + this.c[1]*right.c[1] + this.c[2]*right.c[2];
		},
		
		
		/**
		 * Dot product
		 */
		crossProduct : function(right){
			return new Vector3(
				this.c[1]*right.c[2] - this.c[2]*right.c[1],
				this.c[2]*right.c[0] - this.c[0]*right.c[2],
				this.c[0]*right.c[1] - this.c[1]*right.c[0]);
		},


		/**
		 * Opposite method 
		 */
		opposite : function(){
			this.c[0] = -this.c[0];
			this.c[1] = -this.c[1];
			this.c[2] = -this.c[2];
		},


		/**
		 * Normalize vector 
		 */
		normalize : function(){
			var x = this.c[0];
			var y = this.c[1];
			var z = this.c[2];
			var modulus = Math.sqrt(x*x + y*y + z*z);
			
			this.c[0] = x/modulus;
			this.c[1] = y/modulus;
			this.c[2] = z/modulus;
		},
		
		
		/**
		 * 
		 * @param r 
		 * @param phi (in rad)
		 * @param theta (in rad)
		 */
		spherical_radial : function(r, phi, theta){
			this.c[0] = r*Math.cos(phi)*Math.sin(theta);
			this.c[1] = r*Math.sin(phi)*Math.sin(theta);
			this.c[2] = r*Math.cos(theta);
		},
		
		/**
		 * 
		 * @param r 
		 * @param phi (in rad)
		 * @param theta (in rad)
		 */
		eyeVector : function(r, phi, theta){
			this.c[0] = -r*Math.cos(phi)*Math.sin(theta);
			this.c[1] = -r*Math.sin(phi)*Math.sin(theta);
			this.c[2] = -r*Math.cos(theta);
		}
};
