
/*
 * Define all standard vectors.
 * Optimized for passing coefficients to shader
 */


/*
 * Vector 2
 */



/**
 * No argument constructor
 */
function Vector2(){
	this.c = [];
}


/**
 * @param x : the 1st coordinate
 * @param y : the 2nd coordinate
 * @param z : the 3rd coordinate
 */
function Vector2(x, y, z){
	this.c = [];
	this.c[0] = x;
	this.c[1] = y;
}


/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
Vector2.prototype = {

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
			return new Vector4(this.c[0], this.c[1]);
		},
		

		/**
		 * Add a vector to the current vector
		 */
		add: function(right) {
			this.c[0]+=right.c[0];
			this.c[1]+=right.c[1];
		},

		/**
		 * Substract a vector to the current vector
		 */
		substract : function(right){
			this.c[0]-=right.c[0];
			this.c[1]-=right.c[1];
		},
		

		/**
		 * 
		 */
		multiply : function(scalar){
			this.c[0]*=scalar;
			this.c[1]*=scalar;
		},

		
		/**
		 * 
		 */
		modulus : function(){
			var x = this.c[0];
			var y = this.c[1];
			return Math.sqrt(x*x + y*y);
		},


		/**
		 * Dot product
		 */
		dotProduct : function(right){
			return this.c[0]*right.c[0] + this.c[1]*right.c[1];
		},
		
		
		/**
		 * Dot product
		 */
		crossProduct : function(right){
			return this.c[0]*right.c[1] - this.c[1]*right.c[0];
		},


		/**
		 * Opposite method 
		 */
		opposite : function(){
			this.c[0] = -this.c[0];
			this.c[1] = -this.c[1];
		},


		/**
		 * Normalize vector 
		 */
		normalize : function(){
			var x = this.c[0];
			var y = this.c[1];
			var modulus = Math.sqrt(x*x + y*y);
			
			this.c[0] = x/modulus;
			this.c[1] = y/modulus;
		}

};

