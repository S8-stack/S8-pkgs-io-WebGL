


/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @returns 
 */
 export function create(x = 0, y = 0, z = 0, w = 0) {
	let v = new Float32Array(4);
	v[0] = x; v[1] = y; v[2] = z; v[3] = w;
	return v;
}


/**
 * Add a vector to the current vector
 */
 export function add(vL, vR, target) {
	target[0] = vL[0] + vR[0];
	target[1] = vL[1] + vR[1];
	target[2] = vL[2] + vR[2];
	target[3] = 0; // Only vectors can be added up, so stay vector 
}

/**
 * 
 * @param {*} vL 
 * @param {*} vR 
 * @param {*} target 
 */
export function substract(vL, vR, target) {
	target[0] = vL[0] - vR[0];
	target[1] = vL[1] - vR[1];
	target[2] = vL[2] - vR[2];
	target[3] = vL[3] - vR[3];
}


/**
 * 
 * @param {*} v 
 * @param {*} target 
 */
export function copy(v, target) {
	target[0] = v[0];
	target[1] = v[1];
	target[2] = v[2];
	target[3] = v[3];
};


/**
 * 
 * @param {*} v 
 * @param {*} scalar 
 * @param {*} target 
 */
export function scale(v, scalar, target) {
	target[0] = v[0] * scalar;
	target[1] = v[1] * scalar;
	target[2] = v[2] * scalar;
	target[3] = v[3] * scalar;
};

/**
 * 
 */
export function modulus(v) {
	let x = v[0], y = v[1], z = v[2];
	return Math.sqrt(x * x + y * y + z * z);
}



/**
 * Opposite method 
 */
export function opposite(v, target) {
	target[0] = -v[0];
	target[1] = -v[1];
	target[2] = -v[2];
	target[3] = v[3];
}

/**
 * Normalize vector 
 */
export function normalize(v, target) {
	let x = v[0], y = v[1], z = v[2];
	var mod = 1.0 / Math.sqrt(x * x + y * y + z * z);
	target[0] = x * mod;
	target[1] = y * mod;
	target[2] = z * mod;
	target[3] = v[3];
}