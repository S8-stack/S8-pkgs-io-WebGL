
/**
 * 
 */

import { SWGL_Model } from "../SWGL_Model";

import * as V2 from '../../../maths/SWGL_Vector2d';
import * as V3 from '../../../maths/SWGL_Vector3d';

export class HexahedronNbMeshBuilder {

	/** @type {number} ax */
	ax = 1.0;

	/** @type {number} ay */
	ay = 1.0;

	/** @type {number} az */
	az = 1.0;

	/** @type {number} shift */
	shift = 0.001;

	/** @type {number} tex coordinates scale */
	texCoordScale = 1.0;


	constructor() {
	}

	/**
	 * 
	 * @param {SWGL_Model} mesh 
	 * @returns 
	 */
	buildSurface(mesh) {

		/* vertex index offset */
		let vertexOffset = mesh.vertexOffset;

		// dimensions
		let ax = this.ax / 2.0;
		let ay = this.ay / 2.0;
		let az = this.az / 2.0;

		if (mesh.isVertexAttributeEnabled) { // vertices
			let vertices = mesh.vertexAttributes;
			let offset = 3 * vertexOffset;

			// face ax+
			V3.set(ax, -ay, -az, vertices, offset); offset+=3;
			V3.set(ax, ay, -az, vertices, offset); offset+=3;
			V3.set(ax, ay, az, vertices, offset); offset+=3;
			V3.set(ax, -ay, az, vertices, offset); offset+=3;

			// face ax-
			V3.set(-ax, ay, -az, vertices, offset); offset+=3;
			V3.set(-ax, -ay, -az, vertices, offset); offset+=3;
			V3.set(-ax, -ay, az, vertices, offset); offset+=3;
			V3.set(-ax, ay, az, vertices, offset); offset+=3;

			// face ay+
			V3.set(-ax, ay, -az, vertices, offset); offset+=3;
			V3.set(ax, ay, -az, vertices, offset); offset+=3;
			V3.set(ax, ay, az, vertices, offset); offset+=3;
			V3.set(-ax, ay, az, vertices, offset); offset+=3;

			// face ay-
			V3.set(-ax, -ay, -az, vertices, offset); offset+=3;
			V3.set(ax, -ay, -az, vertices, offset); offset+=3;
			V3.set(ax, -ay, az, vertices, offset); offset+=3;
			V3.set(-ax, -ay, az, vertices, offset); offset+=3;

			// face az+
			V3.set(-ax, -ay, az, vertices, offset); offset+=3;
			V3.set(ax, -ay, az, vertices, offset); offset+=3;
			V3.set(ax, ay, az, vertices, offset); offset+=3;
			V3.set(-ax, ay, az, vertices, offset); offset+=3;

			// face az-
			V3.set(-ax, -ay, -az, vertices, offset); offset+=3;
			V3.set(-ax, ay, -az, vertices, offset); offset+=3;
			V3.set(ax, ay, -az, vertices, offset); offset+=3;
			V3.set(ax, -ay, -az, vertices, offset); offset+=3;

			mesh.vertexOffset += 24;
		}

		if (mesh.isNormalAttributeEnabled) {
			let normals = mesh.normalAttributes;
			let offset = 3 * vertexOffset;

			// face ax+
			V3.set(1.0, 0.0, 0.0, normals, offset); offset+=3;
			V3.set(1.0, 0.0, 0.0, normals, offset); offset+=3;
			V3.set(1.0, 0.0, 0.0, normals, offset); offset+=3;
			V3.set(1.0, 0.0, 0.0, normals, offset); offset+=3;

			// face ax-
			V3.set(-1.0, 0.0, 0.0, normals, offset); offset+=3;
			V3.set(-1.0, 0.0, 0.0, normals, offset); offset+=3;
			V3.set(-1.0, 0.0, 0.0, normals, offset); offset+=3;
			V3.set(-1.0, 0.0, 0.0, normals, offset); offset+=3;

			// face ay+
			V3.set(0.0, 1.0, 0.0, normals, offset); offset+=3;
			V3.set(0.0, 1.0, 0.0, normals, offset); offset+=3;
			V3.set(0.0, 1.0, 0.0, normals, offset); offset+=3;
			V3.set(0.0, 1.0, 0.0, normals, offset); offset+=3;

			// face ay-
			V3.set(0.0, -1.0, 0.0, normals, offset); offset+=3;
			V3.set(0.0, -1.0, 0.0, normals, offset); offset+=3;
			V3.set(0.0, -1.0, 0.0, normals, offset); offset+=3;
			V3.set(0.0, -1.0, 0.0, normals, offset); offset+=3;

			// face az+
			V3.set(0.0, 0.0, 1.0, normals, offset); offset+=3;
			V3.set(0.0, 0.0, 1.0, normals, offset); offset+=3;
			V3.set(0.0, 0.0, 1.0, normals, offset); offset+=3;
			V3.set(0.0, 0.0, 1.0, normals, offset); offset+=3;

			// face az-
			V3.set(0.0, 0.0, -1.0, normals, offset); offset+=3;
			V3.set(0.0, 0.0, -1.0, normals, offset); offset+=3;
			V3.set(0.0, 0.0, -1.0, normals, offset); offset+=3;
			V3.set(0.0, 0.0, -1.0, normals, offset); offset+=3;
		}

		if (mesh.isTexCoordAttributeEnabled) {

			let texCoords = mesh.texCoords;
			let texCoordScale = this.texCoordScale;
			let offset = 2 * vertexOffset;

			// face ax+
			V2.set(0.0, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ay / texCoordScale, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ay / texCoordScale, 2 * az / texCoordScale, texCoords, offset); offset += 2;
			V2.set(0.0, 2 * az / texCoordScale, texCoords, offset); offset += 2;

			// face ax-
			V2.set(0.0, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ay / texCoordScale, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ay / texCoordScale, 2 * az / texCoordScale, texCoords, offset); offset += 2;
			V2.set(0.0, 2 * az / texCoordScale, texCoords, offset); offset += 2;

			// face ay+
			V2.set(0.0, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 2 * az / texCoordScale, texCoords, offset); offset += 2;
			V2.set(0.0, 2 * az / texCoordScale, texCoords, offset); offset += 2;

			// face ay-
			V2.set(0.0, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 2 * az / texCoordScale, texCoords, offset); offset += 2;
			V2.set(0.0, 2 * az / texCoordScale, texCoords, offset); offset += 2;

			// face az+
			V2.set(0.0, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 2 * ay / texCoordScale, texCoords, offset); offset += 2;
			V2.set(0.0, 2 * ay / texCoordScale, texCoords, offset); offset += 2;

			// face az-
			V2.set(0.0, 0.0, offset, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 0.0, texCoords, offset); offset += 2;
			V2.set(2 * ax / texCoordScale, 2 * ay / texCoordScale, texCoords, offset); offset += 2;
			V2.set(0.0, 2 * ay / texCoordScale, texCoords, offset); offset += 2;

		}


		/* <indices> */

		let indices = mesh.indices;
		let offset = vertexOffset;

		// face ax+
		indices.set(offset + 0, offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3, offset + 0);
		offset += 4;

		// face ax-
		indices.set(offset + 0, offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3, offset + 0);
		offset += 4;

		// face ay+
		indices.set(offset + 0, offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3, offset + 0);
		offset += 4;

		// face ay-
		indices.set(offset + 0, offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3, offset + 0);
		offset += 4;

		// face az+
		indices.set(offset + 0, offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3, offset + 0);
		offset += 4;

		// face az-
		indices.set(offset + 0, offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3, offset + 0);
		offset += 4;
		/* </indices> */
	}



	/**
	 * 
	 * @param {SWGL_Model} mesh 
	 */
	buildWire(mesh) {

		
		let vertexOffset = mesh.vertexOffset;

		// dimensions
		let ax = this.ax / 2.0 + this.shift;
		let ay = this.ay / 2.0 + this.shift;
		let az = this.az / 2.0 + this.shift;

		// <wire>
		if (mesh.isVertexAttributeEnabled) {

			let vertices = mesh.vertexAttributes;
			let offset = vertexOffset;
			//  vertices
			V3.set(-ax,-ay,-az, vertices, offset); offset += 3;
			V3.set( ax,-ay,-az, vertices, offset); offset += 3;
			V3.set( ax, ay,-az, vertices, offset); offset += 3;
			V3.set(-ax, ay,-az, vertices, offset); offset += 3;
			V3.set(-ax,-ay, az, vertices, offset); offset += 3;
			V3.set( ax,-ay, az, vertices, offset); offset += 3;
			V3.set( ax, ay, az, vertices, offset); offset += 3;
			V3.set(-ax, ay, az, vertices, offset); offset += 3;

			mesh.vertexOffset += 8;
		}

		/* <indices> */
		let indices = mesh.indices;
		let offset = vertexOffset;
		indices.set(offset + 0, offset + 1);
		indices.set(offset + 1, offset + 2);
		indices.set(offset + 2, offset + 3);
		indices.set(offset + 3, offset + 0);

		indices.set(offset + 4, offset + 5);
		indices.set(offset + 5, offset + 6);
		indices.set(offset + 6, offset + 7);
		indices.set(offset + 7, offset + 4);

		indices.set(offset + 0, offset + 4);
		indices.set(offset + 1, offset + 5);
		indices.set(offset + 2, offset + 6);
		indices.set(offset + 3, offset + 7);

		/* </indices> */
	}
}

