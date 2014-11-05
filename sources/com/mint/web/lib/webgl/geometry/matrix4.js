

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
function Matrix4(){
	this.c = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
}




/**
 * In place operations are preferred to keep pointer to the scene object when updated.  
 */
Matrix4.prototype = {

		/**
		 * Define the constructor
		 */
		constructor : Matrix4(),

		/**
		 * Define PI (Shared by all Vector4 Objects)
		 */
		PI : 3.14159265,

		
		

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
		setCoefficients : function (
				c00, c01, c02, c03,
				c10, c11, c12, c13,
				c20, c21, c22, c23,
				c30, c31, c32, c33	){

			// Column 0
			this.c[0] = c00;
			this.c[1] = c10;
			this.c[2] = c20;
			this.c[3] = c30;

			// Column 1
			this.c[4] = c01;
			this.c[5] = c11;
			this.c[6] = c21;
			this.c[7] = c32;

			// Column 2
			this.c[8] = c02;
			this.c[9] = c12;
			this.c[10] = c22;
			this.c[11] = c32;

			// Column 3
			this.c[12] = c03;
			this.c[13] = c13;
			this.c[14] = c23;
			this.c[15] = c33;
		},
		
		
		set : function (coefficient, line, column){
			this.c[line+column*4] = coefficent;
		},
		
		get : function (line, column){
			return this.c[line+column*4];
		},
		
		/**
		 * Clone this Matrix4
		 */
		copy: function(argument){

			this.c[0] = argument.c[0];
			this.c[1] = argument.c[1];
			this.c[2] = argument.c[2];
			this.c[3] = argument.c[3];

			this.c[4] = argument.c[4];
			this.c[5] = argument.c[5];
			this.c[6] = argument.c[6];
			this.c[7] = argument.c[7];

			this.c[8] = argument.c[8];
			this.c[9] = argument.c[9];
			this.c[10] = argument.c[10];
			this.c[11] = argument.c[11];

			this.c[12] = argument.c[12];
			this.c[13] = argument.c[13];
			this.c[14] = argument.c[14];
			this.c[15] = argument.c[15];
		},


		/**
		 * Add a vector to the current vector
		 */
		add: function(left, right) {
			for(var i=0; i<16; i++){
				this.c[i]= left.c[i] + right.c[i];	
			}
		},

		/**
		 * Substract a vector to the current vector
		 */
		substract : function(left, right){
			for(var i=0; i<16; i++){
				this.c[i] = left.c[i] - right.c[i];		
			}
		},


		/**
		 * Transposes a mat4 (flips the values over the diagonal)
		 *
		 * @param {Matrix4} destination : Matrix4 receiving transposed values. If not specified result is written to this
		 */
		transpose : function (argument) {
			
			// Cache the matrix values (Allow huge speed increase)
			var

			a00 = argument.c[0],	a01 = argument.c[4],	a02 = argument.c[8],	a03 = argument.c[12],
			a10 = argument.c[1],	a11 = argument.c[5],	a12 = argument.c[9],	a13 = argument.c[13],
			a20 = argument.c[2],	a21 = argument.c[6],	a22 = argument.c[10],	a23 = argument.c[14],
			a30 = argument.c[3],	a31 = argument.c[7],	a32 = argument.c[11],	a33 = argument.c[15];


			this.c[0] = a00;
			this.c[1] = a01;
			this.c[2] = a02;
			this.c[3] = a03;

			this.c[4] = a10;
			this.c[5] = a11;
			this.c[6] = a12;
			this.c[7] = a13;

			this.c[8] = a20;
			this.c[9] = a21;
			this.c[10] = a22;
			this.c[11] = a23;

			this.c[12] = a30;
			this.c[13] = a31;
			this.c[14] = a32;
			this.c[15] = a33;
		},


		dotVector4 : function(v) {
			var r = [];
			
			r[0] = this.c[0]*v[0] + this.c[4]*v[1] + this.c[8]*v[2] + this.c[12]*v[3];
			r[1] = this.c[1]*v[0] + this.c[5]*v[1] + this.c[9]*v[2] + this.c[13]*v[3];
			r[2] = this.c[2]*v[0] + this.c[6]*v[1] + this.c[10]*v[2]+ this.c[14]*v[3];
			r[3] = this.c[3]*v[0] + this.c[7]*v[1] + this.c[11]*v[2]+ this.c[15]*v[3];
			
			return r;
		},
		
		dotVector3 : function(v) {
			var r = [
			         this.c[0]*v[0] + this.c[4]*v[1] + this.c[8]*v[2],
			         this.c[1]*v[0] + this.c[5]*v[1] + this.c[9]*v[2],
			         this.c[2]*v[0] + this.c[6]*v[1] + this.c[10]*v[2]
			         ];
			return r;
		},
		
		
		getTranslation : function() {
			return [this.c[12], this.c[13], this.c[14]];
		},
		

		/**
		 * Checked on 12/04/2012
		 * @param right : right member of the binary operator
		 * @param d : destination
		 */
		multiply : function(left, right) {

			// Cache the matrix values (Allow huge speed increase)
			var

			a00 = left.c[0],	a01 = left.c[4],	a02 = left.c[8],	a03 = left.c[12],
			a10 = left.c[1],	a11 = left.c[5],	a12 = left.c[9],	a13 = left.c[13],
			a20 = left.c[2],	a21 = left.c[6],	a22 = left.c[10],	a23 = left.c[14],
			a30 = left.c[3],	a31 = left.c[7],	a32 = left.c[11],	a33 = left.c[15],
			
			b00 = right.c[0],	b01 = right.c[4],	b02 = right.c[8],	b03 = right.c[12],
			b10 = right.c[1],	b11 = right.c[5],	b12 = right.c[9],	b13 = right.c[13],
			b20 = right.c[2],	b21 = right.c[6],	b22 = right.c[10],	b23 = right.c[14],
			b30 = right.c[3],	b31 = right.c[7],	b32 = right.c[11],	b33 = right.c[15];
			
			this.c[0]  = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
			this.c[1]  = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
			this.c[2]  = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
			this.c[3]  = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;

			this.c[4]  = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
			this.c[5]  = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
			this.c[6]  = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
			this.c[7]  = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;

			this.c[8]  = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
			this.c[9]  = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
			this.c[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
			this.c[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;

			this.c[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
			this.c[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
			this.c[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
			this.c[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
		},
		
		
		/**
		 * @param destination : destination
		 */
		inverse : function(argument) {

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
			this.c[1] =	(-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
			this.c[2] = ( a13 * b05 - a23 * b04 + a33 * b03) * invDet;
			this.c[3] = (-a12 * b05 + a22 * b04 - a32 * b03) * invDet;

			this.c[4] = (-a01 * b11 + a21 * b08 - a31 * b07) * invDet;
			this.c[5] = ( a00 * b11 - a20 * b08 + a30 * b07) * invDet;
			this.c[6] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
			this.c[7] = ( a02 * b05 - a22 * b02 + a32 * b01) * invDet;

			this.c[8] = ( a01 * b10 - a11 * b08 + a31 * b06) * invDet;
			this.c[9] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;
			this.c[10]= (a03 * b04 - a13 * b02 + a33 * b00) * invDet;
			this.c[11]= (-a02 * b04 + a12 * b02 - a32 * b00) * invDet;

			this.c[12]= (-a01 * b09 + a11 * b07 - a21 * b06) * invDet;
			this.c[13]= ( a00 * b09 - a10 * b07 + a20 * b06) * invDet;
			this.c[14]= (-a03 * b03 + a13 * b01 - a23 * b00) * invDet;
			this.c[15]= ( a02 * b03 - a12 * b01 + a22 * b00) * invDet;
		},



		/**
		 */
		transposeInverse : function(argument) {

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
			this.c[3]= (-a01 * b09 + a11 * b07 - a21 * b06) * invDet;
			
			this.c[4] =	(-a10 * b11 + a20 * b10 - a30 * b09) * invDet;
			this.c[5] = ( a00 * b11 - a20 * b08 + a30 * b07) * invDet;
			this.c[6] = (-a00 * b10 + a10 * b08 - a30 * b06) * invDet;
			this.c[7]= ( a00 * b09 - a10 * b07 + a20 * b06) * invDet;
			
			this.c[8] = ( a13 * b05 - a23 * b04 + a33 * b03) * invDet;
			this.c[9] = (-a03 * b05 + a23 * b02 - a33 * b01) * invDet;
			this.c[10]= (a03 * b04 - a13 * b02 + a33 * b00) * invDet;
			this.c[11]= (-a03 * b03 + a13 * b01 - a23 * b00) * invDet;
			
			this.c[12] = (-a12 * b05 + a22 * b04 - a32 * b03) * invDet;
			this.c[13] = ( a02 * b05 - a22 * b02 + a32 * b01) * invDet;
			this.c[14]= (-a02 * b04 + a12 * b02 - a32 * b00) * invDet;
			this.c[15]= ( a02 * b03 - a12 * b01 + a22 * b00) * invDet;
		},



		/**
		 * set-up coefficients of this matrix to identity
		 */
		identity : function() {
			this.c[0] = 1.0;	this.c[4] = 0.0;	this.c[8] = 0.0;	this.c[12]= 0.0;
			this.c[1] = 0.0;	this.c[5] = 1.0;	this.c[9] = 0.0;	this.c[13]= 0.0;
			this.c[2] = 0.0;	this.c[6] = 0.0;	this.c[10]= 1.0;	this.c[14]= 0.0;
			this.c[3] = 0.0;	this.c[7] = 0.0;	this.c[11]= 0.0;	this.c[15]= 1.0;
		},


		/**
		 * Randomize a matrix
		 */
		random : function() {
			for(var i=0; i<16; i++){
				this.c[i]=Math.random();	
			}
		},



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

			this.c[0] = f / ratio;
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
		frustum : function (left, right, bottom, top, near, far) {

			var rl = (right - left),
			tb = (top - bottom),
			fn = (far - near);

			this.c[0] = (near * 2) / rl;
			this.c[1] = 0;
			this.c[2] = 0;
			this.c[3] = 0;

			this.c[4] = 0;
			this.c[5] = (near * 2) / tb;
			this.c[6] = 0;
			this.c[7] = 0;

			this.c[8] = (right + left) / rl;
			this.c[9] = (top + bottom) / tb;
			this.c[10] = -(far + near) / fn;
			this.c[11] = -1;

			this.c[12] = 0;
			this.c[13] = 0;
			this.c[14] = -(far * near * 2) / fn;
			this.c[15] = 0;
		},


		/**
		 * Generates a perspective projection matrix with the given bounds
		 *
		 * @param {number} fovy : Vertical field of view (fovea angle)
		 * @param {number} aspect : Aspect ratio. typically viewport width/height
		 * @param {number} near : Near bound of the frustum
		 * @param {number} far : Far bound of the frustum
		 */
		perspectiveProjection : function (fovy, aspect, near, far) {
			var top = near * Math.tan(fovy * Math.PI / 360.0),
			right = top * aspect;
			this.frustum(-right, right, -top, top, near, far);
		},

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
		orthogonalProjection : function (left, right, bottom, top, near, far) {
			var rl = (right - left),
			tb = (top - bottom),
			fn = (far - near);
			this.c[0] = 2 / rl;
			this.c[1] = 0;
			this.c[2] = 0;
			this.c[3] = 0;

			this.c[4] = 0;
			this.c[5] = 2 / tb;
			this.c[6] = 0;
			this.c[7] = 0;

			this.c[8] = 0;
			this.c[9] = 0;
			this.c[10] = -2 / fn;
			this.c[11] = 0;

			this.c[12] = -(left + right) / rl;
			this.c[13] = -(top + bottom) / tb;
			this.c[14] = -(far + near) / fn;
			this.c[15] = 1;
		},



		/**
		 * Generates a look-at matrix with the given eye position, focal point, and up axis
		 *
		 * @param {Vector3} eye Position of the viewer
		 * @param {Vector3} center Point the viewer is looking at
		 * @param {Vector3} up vec3 pointing "up"
		 */
		lookAt : function (eye, center, up) {

			var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
			eyex = eye.c[0],
			eyey = eye.c[1],
			eyez = eye.c[2],
			upx = up.c[0],
			upy = up.c[1],
			upz = up.c[2],
			centerx = center.c[0],
			centery = center.c[1],
			centerz = center.c[2];

			if (eyex == centerx && eyey == centery && eyez == centerz) {
				this.identity();
			}

			//vec3.direction(eye, center, z);
			z0 = eyex - centerx;
			z1 = eyey - centery;
			z2 = eyez - centerz;

			// normalize (no check needed for 0 because of early return)
			len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
			z0 *= len;
			z1 *= len;
			z2 *= len;

			//vec3.normalize(vec3.cross(up, z, x));
			x0 = upy * z2 - upz * z1;
			x1 = upz * z0 - upx * z2;
			x2 = upx * z1 - upy * z0;
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
			y0 = z1 * x2 - z2 * x1;
			y1 = z2 * x0 - z0 * x2;
			y2 = z0 * x1 - z1 * x0;

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

			this.c[0] = x0;
			this.c[1] = y0;
			this.c[2] = z0;
			this.c[3] = 0;

			this.c[4] = x1;
			this.c[5] = y1;
			this.c[6] = z1;
			this.c[7] = 0;

			this.c[8] = x2;
			this.c[9] = y2;
			this.c[10] = z2;
			this.c[11] = 0;

			this.c[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
			this.c[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
			this.c[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
			this.c[15] = 1;
		},


		

		/**
		 * Rotates a matrix by the given angle around the X axis
		 *
		 * @param {mat4} mat mat4 to rotate
		 * @param {number} angle Angle (in radians) to rotate
		 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
		 *
		 * @returns {mat4} dest if specified, mat otherwise
		 */
		rotateX : function (angle) {
			
		    var s = Math.sin(angle),
		        c = Math.cos(angle),
		        
		        a10 = this.c[4],
		        a11 = this.c[5],
		        a12 = this.c[6],
		        a13 = this.c[7],
		        
		        a20 = this.c[8],
		        a21 = this.c[9],
		        a22 = this.c[10],
		        a23 = this.c[11];

		    // Perform axis-specific matrix multiplication
		    this.c[4] = a10 * c + a20 * s;
		    this.c[5] = a11 * c + a21 * s;
		    this.c[6] = a12 * c + a22 * s;
		    this.c[7] = a13 * c + a23 * s;

		    this.c[8] = a10 * -s + a20 * c;
		    this.c[9] = a11 * -s + a21 * c;
		    this.c[10] = a12 * -s + a22 * c;
		    this.c[11] = a13 * -s + a23 * c;
		},

		/**
		 * Rotates a matrix by the given angle around the Y axis
		 *
		 * @param {mat4} mat mat4 to rotate
		 * @param {number} angle Angle (in radians) to rotate
		 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
		 *
		 * @returns {mat4} dest if specified, mat otherwise
		 */
		rotateY : function (angle) {
		    var s = Math.sin(angle),
		        c = Math.cos(angle),
		        a00 = this.c[0],
		        a01 = this.c[1],
		        a02 = this.c[2],
		        a03 = this.c[3],
		        a20 = this.c[8],
		        a21 = this.c[9],
		        a22 = this.c[10],
		        a23 = this.c[11];

		
		    // Perform axis-specific matrix multiplication
		    this.c[0] = a00 * c + a20 * -s;
		    this.c[1] = a01 * c + a21 * -s;
		    this.c[2] = a02 * c + a22 * -s;
		    this.c[3] = a03 * c + a23 * -s;

		    this.c[8] = a00 * s + a20 * c;
		    this.c[9] = a01 * s + a21 * c;
		    this.c[10] = a02 * s + a22 * c;
		    this.c[11] = a03 * s + a23 * c;
		},

		/**
		 * Rotates a matrix by the given angle around the Z axis
		 *
		 * @param {mat4} mat mat4 to rotate
		 * @param {number} angle Angle (in radians) to rotate
		 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
		 *
		 * @returns {mat4} dest if specified, mat otherwise
		 */
		rotateZ : function (angle) {
		    var s = Math.sin(angle),
		        c = Math.cos(angle),
		        a00 = this.c[0],
		        a01 = this.c[1],
		        a02 = this.c[2],
		        a03 = this.c[3],
		        a10 = this.c[4],
		        a11 = this.c[5],
		        a12 = this.c[6],
		        a13 = this.c[7];

		    // Perform axis-specific matrix multiplication
		    this.c[0] = a00 * c + a10 * s;
		    this.c[1] = a01 * c + a11 * s;
		    this.c[2] = a02 * c + a12 * s;
		    this.c[3] = a03 * c + a13 * s;

		    this.c[4] = a00 * -s + a10 * c;
		    this.c[5] = a01 * -s + a11 * c;
		    this.c[6] = a02 * -s + a12 * c;
		    this.c[7] = a03 * -s + a13 * c;

		},
		
		/**
		 * return a String representation of the matrix
		 */
		toString : function() {
			return "["+this.c[0]+",\t"+this.c[4]+",\t"+this.c[8]+",\t"+this.c[12]+"]\n"+
			"["+this.c[1]+",\t"+this.c[5]+",\t"+this.c[9]+",\t"+this.c[13]+"]\n"+
			"["+this.c[2]+",\t"+this.c[6]+",\t"+this.c[10]+",\t"+this.c[14]+"]\n"+
			"["+this.c[3]+",\t"+this.c[7]+",\t"+this.c[11]+",\t"+this.c[15]+"]\n";
		}

};


Matrix4.test01 = function() {

	var m = new Matrix4(), inv = new Matrix4(), tr = new Matrix4(), trinv = new Matrix4(), result = new Matrix4(),
	trinv3 = new Matrix3(), trinv3c = new Matrix3(), result3 = new Matrix3();
	m.random();
	inv.inverse(m);
	tr.transpose(inv);
	trinv.transposeInverse(m);
	
	result.substract(tr,trinv);
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



Matrix4.rotationX = function(angle){
	
    var rot = new Matrix4();
    rot.identity();

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    
    // Perform axis-specific matrix multiplication
    rot.c[5] = cos;
    rot.c[6] = sin;
    rot.c[9] =-sin;
    rot.c[10]= cos;
    return rot;
};


Matrix4.rotationY = function(angle){
    var rot = new Matrix4();
    rot.identity();

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    
    // Perform axis-specific matrix multiplication
    rot.c[0] = cos;
    rot.c[2] = sin;
    rot.c[8] =-sin;
    rot.c[10]= cos;
    return rot;
};

Matrix4.rotationZ = function(angle){
    var rot = new Matrix4();
    rot.identity();

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    
    // Perform axis-specific matrix multiplication
    rot.c[0] = cos;
    rot.c[1] = sin;
    rot.c[4] =-sin;
    rot.c[5]= cos;
    return rot;
};


/**
 * Average multiplication time less than 600 nanoseconds.
 */
Matrix4.testPerformance = function(){

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





