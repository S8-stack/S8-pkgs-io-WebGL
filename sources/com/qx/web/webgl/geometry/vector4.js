
/*
 * Vector 4
 */



/**
 * No argument constructor
 */
function Vector4(){
	this.c = [];
}


/**
 * @param x : the 1st coordinate
 * @param y : the 2nd coordinate
 * @param z : the 3rd coordinate
 * @param w : the 4th coordinate
 */
function Vector4(x, y, z, w){
	this.c = [];
	this.c[0] = x;
	this.c[1] = y;
	this.c[2] = z;
	this.c[3] = w;
}


/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
Vector4.prototype = {

		/**
		 * Define the constructor
		 */
		constructor : Vector4,
		
		/**
		 * Define PI (Shared by all Vector4 Objects)
		 */
		PI : 3.14159265,
		
		/**
		 * Clone this Vector3
		 */
		clone: function(){
			return new Vector4(this.c[0], this.c[1], this.c[2], this.c[3]);
		},
		

		/**
		 * Add a vector to the current vector
		 */
		add: function(right) {
			this.c[0]+=right.c[0];
			this.c[1]+=right.c[1];
			this.c[2]+=right.c[2];
			this.c[3]+=right.c[3];
		},

		/**
		 * Substract a vector to the current vector
		 */
		substract : function(right){
			this.c[0]-=right.c[0];
			this.c[1]-=right.c[1];
			this.c[2]-=right.c[2];
			this.c[3]-=right.c[3];
		},
		

		/**
		 * 
		 */
		multiply : function(scalar){
			this.c[0]*=scalar;
			this.c[1]*=scalar;
			this.c[2]*=scalar;
			this.c[3]*=scalar;
		},

		
		/**
		 * 
		 */
		modulus : function(){
			var x = this.c[0];
			var y = this.c[1];
			var z = this.c[2];
			var w = this.c[3];
			return Math.sqrt(x*x + y*y + z*z + w*w);
		},


		/**
		 * Dot product
		 */
		dotProduct : function(right){
			return this.c[0]*right.c[0] + this.c[1]*right.c[1] + this.c[2]*right.c[2] + this.c[3]*right.c[3];
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
			this.c[3] = -this.c[3];
		},


		/**
		 * Normalize vector 
		 */
		normalize : function(){
			var x = this.c[0];
			var y = this.c[1];
			var z = this.c[2];
			var w = this.c[3];
			var modulus = Math.sqrt(x*x + y*y + z*z + w*w);
			
			this.c[0] = x/modulus;
			this.c[1] = y/modulus;
			this.c[2] = z/modulus;
			this.c[3] = w/modulus;
		}

};



function testVector4() {

	var v = new Vector4(0, 4, 2, 23.1).clone();
	var v2 = new Vector4(12, -1.25, 2, 0);
	v.substract(v2);
	alert("done "+v.c[0]+", "+v.modulus() );

}

