

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
function Matrix3(){
	this.c = [];
}




/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
Matrix3.prototype = {

		/**
		 * Define the constructor
		 */
		constructor : Matrix3,

		/**
		 * Define PI (Shared by all Vector4 Objects)
		 */
		PI : 3.14159265,

		/**
		 * Clone this Vector3
		 */
		copy: function(argument){

			// first column
			this.c[0] = argument.c[0];
			this.c[1] = argument.c[1];
			this.c[2] = argument.c[2];

			// second column
			this.c[3] = argument.c[3];
			this.c[4] = argument.c[4];
			this.c[5] = argument.c[5];

			// third column
			this.c[6] = argument.c[6];
			this.c[7] = argument.c[7];
			this.c[8] = argument.c[8];
		},
		
		/**
		 * 
		 * @param Matrix4 argument 
		 */
		copy4: function(argument){

			this.c[0] = argument.c[0];
			this.c[1] = argument.c[1];
			this.c[2] = argument.c[2];

			this.c[3] =  argument.c[4];
			this.c[4] = argument.c[5];
			this.c[5] = argument.c[6];

			this.c[6] = argument.c[8];
			this.c[7] = argument.c[9];
			this.c[8] = argument.c[10];

		},


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
		 * 
		 */
		set : function(c00, c01, c02, 
				c10, c11, c12,
				c20, c21, c22){

			this.c = [];

			// Column 0
			this.c[0] = c00;
			this.c[1] = c01;
			this.c[2] = c02;

			// Column 1
			this.c[3] = c10;
			this.c[4] = c11;
			this.c[5] = c12;

			// Column 2
			this.c[6] = c20;
			this.c[7] = c21;
			this.c[8] = c22;
		},


		/**
		 * Add the right vector to the current vector and write result in the destination vector
		 * @param : left
		 * @param : right
		 */
		add: function(left, right) {
			for(var i=0; i<9; i++){
				this.c[i]=left.c[i]+right.c[i];	
			}
		},

		/**
		 * Substract the right vector to the current vector and write result in the destination vector
		 * @param : left
		 * @param : right
		 */
		substract : function(left, right) {
			for(var i=0; i<9; i++){
				this.c[i]=left.c[i]-right.c[i];	
			}
		},


		/**
		 * Transposes a mat4 (flips the values over the diagonal)
		 *
		 * @param {Matrix4} destination : Matrix4 receiving transposed values. If not specified result is written to this
		 */
		transpose : function (destination) {
			// If we are transposing ourselves we can skip a few steps but have to cache some values
			if (this === destination || destination==null) {
				var a01 = this.c[1],
				a02 = this.c[2],
				a12 = this.c[5];

				this.c[1] = this.c[3];
				this.c[3] = a01;

				this.c[2] = this.c[6];
				this.c[6] = a02;

				this.c[5] = this.c[7];
				this.c[7] = a12;
			}
			else{

				destination.c[0] = this.c[0];
				destination.c[1] = this.c[3];
				destination.c[2] = this.c[6];

				destination.c[3] = this.c[1];
				destination.c[4] = this.c[4];
				destination.c[5] = this.c[7];

				destination.c[6] = this.c[2];
				destination.c[7] = this.c[5];
				destination.c[8] = this.c[8];
			}
		},

		/**
		 * @param right : right member of the binary operator
		 * @param d : destination
		 */
		multiply : function(right, destination) {

			// Cache the matrix values (Allow huge speed increase)
			var

			a00 = this.c[0],	a01 = this.c[1],	a02 = this.c[2],
			a10 = this.c[3],	a11 = this.c[4],	a12 = this.c[5],
			a20 = this.c[6],	a21 = this.c[7],	a22 = this.c[8],

			b00 = right.c[0],	b01 = right.c[1],	b02 = right.c[2],
			b10 = right.c[3],	b11 = right.c[4],	b12 = right.c[5],
			b20 = right.c[6],	b21 = right.c[7],	b22 = right.c[8];

			destination.c[0] = b00 * a00 + b01 * a10 + b02 * a20;
			destination.c[1] = b00 * a01 + b01 * a11 + b02 * a21;
			destination.c[2] = b00 * a02 + b01 * a12 + b02 * a22;

			destination.c[3] = b10 * a00 + b11 * a10 + b12 * a20;
			destination.c[4] = b10 * a01 + b11 * a11 + b12 * a21;
			destination.c[5] = b10 * a02 + b11 * a12 + b12 * a22;

			destination.c[6] = b20 * a00 + b21 * a10 + b22 * a20;
			destination.c[7] = b20 * a01 + b21 * a11 + b22 * a21;
			destination.c[8] = b20 * a02 + b21 * a12 + b22 * a22;

		},


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
		inverse : function(arg) {
			// Cache the matrix values (makes for huge speed increases!)
			var

			a00 = this.c[0],	a01 = this.c[1],	a02 = this.c[2],
			a10 = this.c[3],	a11 = this.c[4],	a12 = this.c[5],
			a20 = this.c[6],	a21 = this.c[7],	a22 = this.c[8],

			b01 =  a22 * a11 - a12 * a21,
			b11 = -a22 * a10 + a12 * a20,
			b21 =  a21 * a10 - a11 * a20,

			d = a00 * b01 + a01 * b11 + a02 * b21,
			id = 1 / d;

			this.c[0] = b01 * id;
			this.c[1] = (-a22 * a01 + a02 * a21) * id;
			this.c[2] = (a12 * a01 - a02 * a11) * id;
			this.c[3] = b11 * id;
			this.c[4] = (a22 * a00 - a02 * a20) * id;
			this.c[5] = (-a12 * a00 + a02 * a10) * id;
			this.c[6] = b21 * id;
			this.c[7] = (-a21 * a00 + a01 * a20) * id;
			this.c[8] = (a11 * a00 - a01 * a10) * id;
		},


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
		transposeInverse : function(matrix4) {
			// Cache the matrix values (makes for huge speed increases!)
			var

			a00 = matrix4.c[0],	a01 = matrix4.c[1],	a02 = matrix4.c[2],
			a10 = matrix4.c[3],	a11 = matrix4.c[4],	a12 = matrix4.c[5],
			a20 = matrix4.c[6],	a21 = matrix4.c[7],	a22 = matrix4.c[8],

			b01 =  a22 * a11 - a12 * a21,
			b11 = -a22 * a10 + a12 * a20,
			b21 =  a21 * a10 - a11 * a20,

			d = a00 * b01 + a01 * b11 + a02 * b21,
			id = 1 / d;

			if (destination == null) {
				destination = this;
			}

			this.c[0] = b01 * id;
			this.c[1] = (-a22 * a01 + a02 * a21) * id;
			this.c[2] = (a12 * a01 - a02 * a11) * id;
			this.c[3] = b11 * id;
			this.c[4] = (a22 * a00 - a02 * a20) * id;
			this.c[5] = (-a12 * a00 + a02 * a10) * id;
			this.c[6] = b21 * id;
			this.c[7] = (-a21 * a00 + a01 * a20) * id;
			this.c[8] = (a11 * a00 - a01 * a10) * id;
		},



		/**
		 * 
		 * @param argument is a Matrix4
		 */
		transposeInverse4 : function(argument) {

			// Cache the matrix values (Allow huge speed increase)
			var

			a00 = argument.c[0],	a01 = argument.c[4],	a02 = argument.c[8],	a03 = argument.c[12],
			a10 = argument.c[1],	a11 = argument.c[5],	a12 = argument.c[9],	a13 = argument.c[13],
			a20 = argument.c[2],	a21 = argument.c[6],	a22 = argument.c[10],	a23 = argument.c[14],
			a30 = argument.c[3],	a31 = argument.c[7],	a32 = argument.c[11],	a33 = argument.c[15],

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
			invDet = 1.0/d;

			this.c[0] =	( a11 * b11 - a21 * b10 + a31 * b09) * invDet;
			this.c[1] = (-a01 * b11 + a21 * b08 - a31 * b07) * invDet;
			this.c[2] = ( a01 * b10 - a11 * b08 + a31 * b06) * invDet;

			this.c[3] =	(-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
			this.c[4] = ( a00 * b11 - a20 * b08 + a30 * b07) * invDet;
			this.c[5] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;

			this.c[6] = ( a13 * b05 - a23 * b04 + a33 * b03) * invDet;
			this.c[7] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
			this.c[8] = ( a03 * b04 - a13 * b02 + a33 * b00) * invDet;

		},


		/**
		 * return a String representation of the matrix
		 */
		toString : function() {
			return "["+this.c[0]+",\t"+this.c[1]+",\t"+this.c[2]+"]\n"+
			"["+this.c[3]+",\t"+this.c[4]+",\t"+this.c[5]+"]\n"+
			"["+this.c[6]+",\t"+this.c[7]+",\t"+this.c[8]+"]\n";
		}

};



Matrix3.random = function(destination) {
	for(var i=0; i<9; i++){
		destination.c[i]=Math.random();	
	}
};


Matrix3.test = function() {

	var m = new Matrix3();
	Matrix3.random(m);
	var inv = m.clone();
	inv.inverse();
	inv.multiply(m, inv);
	alert(inv.toString());

};
