
/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @returns 
 */
export function create(x = 0, y = 0, z = 0) {
	let v = new Float32Array(3);
	v[0] = x; v[1] = y; v[2] = z;
	return v;
}

/**
 * Add a vector to the current vector
 */
export function add(vL, vR, target) {
	target[0] = vL[0] + vR[0];
	target[1] = vL[1] + vR[1];
	target[2] = vL[2] + vR[2];
}


export function substract(vL, vR, target) {
	target[0] = vL[0] - vR[0];
	target[1] = vL[1] - vR[1];
	target[2] = vL[2] - vR[2];
}


export function distance(vL, vR) {
	let dx = vL[0] - vR[0], dy = vL[1] - vR[1], dz = vL[2] - vR[2];
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
}


export function squaredDistance(vL, vR) {
	let dx = vL[0] - vR[0], dy = vL[1] - vR[1], dz = vL[2] - vR[2];
	return dx * dx + dy * dy + dz * dz;
}


export function copy(v, target) {
	target[0] = v[0];
	target[1] = v[1];
	target[2] = v[2];
};


export function scale(v, scalar, target) {
	target[0] = v[0] * scalar;
	target[1] = v[1] * scalar;
	target[2] = v[2] * scalar;
};

/**
 * 
 */
export function modulus(v) {
	let x = v[0], y = v[1], z = v[2];
	return Math.sqrt(x * x + y * y + z * z);
}


/**
 * Dot product
 */
export function dotProduct(vL, vR) {
	return vL[0] * vR[0] + vL[1] * vR[1] + vL[2] * vR[2];
}


/**
 * Dot product
 */
export function crossProduct(vL, vR, target) {
	target[0] = vL[1] * vR[2] - vL[2] * vR[1];
	target[1] = vL[2] * vR[0] - vL[0] * vR[2];
	target[2] = vL[0] * vR[1] - vL[1] * vR[0];
}

/**
 * Opposite method 
 */
export function opposite(v, target) {
	target[0] = -v[0];
	target[1] = -v[1];
	target[2] = -v[2];
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
}


/**
 * 
 * @param r 
 * @param phi (in rad)
 * @param theta (in rad)
 */
export function spherical_radial(r, phi, theta, target) {
	let s = Math.sin(theta);
	target[0] = r * Math.cos(phi) * s;
	target[1] = r * Math.sin(phi) * s;
	target[2] = r * Math.cos(theta);
}

/**
 * 
 * @param r 
 * @param phi (in rad)
 * @param theta (in rad)
 */
export function eyeVector(r, phi, theta) {
	let s = Math.sin(theta);
	target[0] = -r * Math.cos(phi) * s;
	target[1] = -r * Math.sin(phi) * s;
	target[2] = -r * Math.cos(theta);
}
