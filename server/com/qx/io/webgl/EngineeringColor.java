package com.qx.io.webgl;

import com.qx.maths.vector.MathVector3d;

public class EngineeringColor {


	public final static MathVector3d
	YELLOW = new MathVector3d(0.8, 0.75, 0.1),
	RED = new MathVector3d(1.0, 0.0, 0.0),
	GOLDEN = new MathVector3d(1.0, 0.65, 0.0),
	GREEN = new MathVector3d(0.0, 1.0, 0.0),
	DARKGREEN = new MathVector3d(0.0, 0.5, 0.0),
	
	WIRE_STD = new MathVector3d(0.1, 0.1, 0.1),
	
	PICKING_NULL = new MathVector3d(10.0/255.0, 0, 0);
	

    public final static MathVector3d BLUE = new MathVector3d(0.2, 0.2, 1.0);
    

    public final static MathVector3d MEDIUM_BLUE = createColor(100, 100, 255);
    
    public final static MathVector3d LIGHT_BLUE = createColor(200, 200, 255);


    /**
     * The Vector3d white.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d WHITE = createColor(255, 255, 255);


    /**
     * The Vector3d light gray.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d LIGHT_GRAY = createColor(192, 192, 192);
    
    /**
     * The Vector3d gray.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d GRAY = createColor(128, 128, 128);


    /**
     * The Vector3d dark gray.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d DARK_GRAY = createColor(64, 64, 64);

    /**
     * The Vector3d black.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d BLACK = createColor(0, 0, 0);
    
    /**
     * The Vector3d pink.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d PINK = createColor(255, 175, 175);

    /**
     * The Vector3d orange.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d ORANGE = createColor(255, 200, 0);

    /**
     * The Vector3d magenta.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d MAGENTA = createColor(255, 0, 255);

    /**
     * The Vector3d cyan.  In the default sRGB space.
     * @since 1.4
     */
    public final static MathVector3d CYAN = createColor(0, 255, 255);



    /*
     * Utilities
     */
	
    /**
     * params in integer in [0, 255]
     * @param r: red, integer in [0, 255]
     * @param g: green, integer in [0, 255]
     * @param b: blue, integer in [0, 255]
     * @return
     */
	public static MathVector3d createColor(int r, int g, int b){
		return new MathVector3d(((double) r)/255.0, ((double) g)/255.0, ((double) b)/255.0);
	}
	
}
