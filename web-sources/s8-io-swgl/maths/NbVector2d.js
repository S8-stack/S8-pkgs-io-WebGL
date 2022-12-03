
/*
 * Define all standard vectors.
 * Optimized for passing coefficients to shader
 */






/**
 * 
 * @param {Number} x
 * @param {Number} y
 * @returns 
 */
 export function create(x = 0, y = 0) {
	let v = new Float32Array(3);
	v[0] = x; v[1] = y;
	return v;
}


/**
 * Set
 * @param {Float32Array} target 
 * @param {number} x 
 * @param {number} y 
 * @param {number} offset 
 */
 export function set(x = 0, y = 0, target, offset=0) {
	target[offset + 0] = x; 
	target[offset + 1] = y;
}


/**
 * Push vector to an array
 * @param {number} x 
 * @param {number} y 
 * @param {Float32Array} target 
 */
 export function push(x, y, target) {
	target.push(x); 
	target.push(y);
}



/**
 * 
 * @param {Float32Array} v 
 * @param {Float32Array} w 
 * @param {Number} vOffset 
 * @param {Number} wOffset 
 */
export function copy(v, w, vOffset=0, wOffset=0) {
	w[wOffset + 0] = v[vOffset + 0];
	w[wOffset + 1] = v[vOffset + 1];
};

/**
 * Add a vector to the current vector
 */
export function add(vL, vR, target) {
	target[0] = vL[0] + vR[0];
	target[1] = vL[1] + vR[1];
}

/**
 * Substract a vector to the current vector
 */
export function substract(vL, vR, target) {
	target[0] = vL[0] - vR[0];
	target[1] = vL[1] - vR[1];
}

export function distance(vL, vR) {
	let dx = vL[0] - vR[0], dy = vL[1] - vR[1];
	return Math.sqrt(dx * dx + dy * dy);
}

export function squaredDistance(vL, vR) {
	let dx = vL[0] - vR[0], dy = vL[1] - vR[1];
	return dx * dx + dy * dy;
}

/**
 * 
 */
export function scale(v, scalar, target) {
	target[0] = v[0] * scalar;
	target[1] = v[1] * scalar;
}

/** 
 * 
 */
export function modulus(v) {
	let x = v[0], y = v[1];
	return Math.sqrt(x * x + y * y);
}

/**
 * Dot product
 */
export function dotProduct(vL, vR) { return vL[0] * vR[0] + vL[1] * vR[1]; }


/**
 * Dot product
 */
export function crossProduct(vL, vR) { return vL[0] * vR[1] - vL[0] * vR[1]; }

/**
 * Opposite method 
 */
export function opposite(v, target) {
	target[0] = -v[0];
	target[1] = -v[1];
}


/**
 * Normalize vector 
 */
export function normalize(v, target) {
	let x = v[0], y = v[1];
	var modulus = 1.0 / Math.sqrt(x * x + y * y);
	target[0] = x * modulus;
	target[0] = y * modulus;
}