


// space 2d
import { MathVector2d } from './MathVector2d.js';
import { MathMatrix2d } from './MathMatrix2d.js';
import { MathAffine2d } from './MathAffine2d.js';

// space 3d
import { MathVector3d } from './MathVector3d.js';
import { MathMatrix3d } from './MathMatrix3d.js';
import { MathAffine3d } from './MathAffine3d.js';
import { MathRay3d } from './MathRay3d.js';
import { MathSegment3d } from './MathSegment3d.js';

// plane
import { MathPlane } from './MathPlane.js';
import { MathCylinder } from './MathCylinder.js';



/*
    0x04 --> utilities sets
    0x02 --> maths == 0x02
*/

export const MATHS_BOHR_TYPE_CODES = {

    // 0x02 -> space2d
    "04020200" : MathVector2d,
    "04020201" : MathMatrix2d,
    "04020202" : MathAffine2d,

    // 0x03 -> space2d
    "04020300" : MathVector3d,
    "04020301" : MathMatrix3d,
    "04020302" : MathAffine3d,
    "04020503" : MathRay3d,
    "04020504" : MathSegment3d,

    // 0x04 --> primitives 2d

    // 0x05 --> primitives 3d
    "04020501" : MathPlane,
    "04020502" : MathCylinder
};


