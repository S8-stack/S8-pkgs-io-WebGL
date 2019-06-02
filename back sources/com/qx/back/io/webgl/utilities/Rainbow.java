package com.qx.back.io.webgl.utilities;

import java.util.Hashtable;

import com.qx.back.maths.vector.MathVector3d;



/**
 * The Rainbow class by default maps the range 0 to 100 (inclusive) to the colours of the rainbow 
 * (i.e., a gradient transitioning from red to yellow to lime to blue)
 * @author Sophiah (Zing-Ming)
 *
 */
public class Rainbow {

	private int nbGradients;
	private ColourGradient[] gradients;	

	
	/**
	 * 
	 * @param value in the range [0.0, 1.0]
	 * @return
	 */
	public double[] colourAt(double value) {
		if (nbGradients==1) {
			return gradients[0].colourAt(value);
		} else {
			int index = (int) Math.floor(value*nbGradients);
			if(index<0){ index = 0; }
			if(index>nbGradients-1){ index = nbGradients-1; }
			return gradients[index].colourAt(value);
		}
	}
	

	/**
	 * Sets the spectrum of the Rainbow object. By default, the spectrum is a rainbow. 
	 * You must have a minimum of two colours, but you can specify more than two colours. 
	 * Colours can be in the form "red", "ff0000", or "#ff0000". 
	 * For example, <code>rainbow.setSpectrum("red", "yellow", "white");</code>
	 * makes the "Rainbow" a colour gradient from red to yellow to white. 
	 * @param spectrum Two or more Strings representing HTML colours,
	 * or pass in a whole String array of length 2 or greater
	 * @throws HomogeneousRainbowException if there is less than two arguments
	 * @throws InvalidColourException if one of the arguments is an invalid colour
	 */
	public Rainbow(){
		setSpectrum(new String[]{"red", "yellow", "lime", "blue"});
	}
	
	public Rainbow(String ... spectrum){
		setSpectrum(spectrum);
	}
	
	
	
	
	private void setSpectrum(String ... spectrum){
		if (spectrum.length < 2) {
			throw new RuntimeException("Homogeneous rainbow exception");
		}
		
		nbGradients = spectrum.length-1;
		double dv = 1.0/nbGradients;
		gradients = new ColourGradient[nbGradients];
		double min=0, max;
		double[] startColour=getColor(spectrum[0]), endColour;
		for(int i=0; i<nbGradients; i++){
			max = (i+1)*dv;
			endColour = getColor(spectrum[i+1]);
			gradients[i] = new ColourGradient(min, max, startColour, endColour);
			min = max;
			startColour = endColour;
		}
	}


	private static double[] getColor(String name) {
		return htmlColors.get(name);
	}


	private static Hashtable<String, double[]> htmlColors;

	static {

		double h = 128.0/255.0;
		double t = 192.0/255.0;

		htmlColors = new Hashtable<String, double[]>();
		htmlColors.put("black", new double[]{0, 0, 0});
		htmlColors.put("navy", new double[]{0, 0, h});		
		htmlColors.put("blue", new double[]{0, 0, 1});			
		htmlColors.put("green", new double[]{0, h, 0});
		htmlColors.put("teal", new double[]{0, h, h});			
		htmlColors.put("lime", new double[]{0, 1, 0});			
		htmlColors.put("aqua", new double[]{0, 1, 1});			
		htmlColors.put("maroon", new double[]{h, 0, 0});			
		htmlColors.put("purple", new double[]{h, 0, h});				
		htmlColors.put("olive", new double[]{h, h, 0});			
		htmlColors.put("grey", new double[]{h, h, h});
		htmlColors.put("gray", new double[]{h, h, h});
		htmlColors.put("silver", new double[]{t, t, t});				
		htmlColors.put("red", new double[]{1, 0, 0});			
		htmlColors.put("fuchsia", new double[]{1, 0, 1});		
		htmlColors.put("orange", new double[]{1, h, 0});				
		htmlColors.put("yellow", new double[]{1, 1, 0});			
		htmlColors.put("white", new double[]{1, 1, 1});
	}
	

	private class ColourGradient {

		private double min;
		
		private double rFactor, gFactor, bFactor;
		
		private double r0, g0, b0;
		
		public ColourGradient(double min, double max, double[] startColour, double[] endColour){
			this.min = min;
			
			r0 = startColour[0];
			g0 = startColour[1];
			b0 = startColour[2];
			
			double span = (max-min);
			rFactor = (endColour[0]-startColour[0])/span;
			gFactor = (endColour[1]-startColour[1])/span;
			bFactor = (endColour[2]-startColour[2])/span;
		}

		public double[] colourAt(double value) {
			value-=min;
			return new double[]{r0+rFactor*value, g0+gFactor*value, b0+bFactor*value};
		}
	}
	
	
	
	public static void main(String[] args){
		Rainbow rainbow = new Rainbow();
		
		System.out.println(new MathVector3d(rainbow.colourAt(0.5)));
	}
	
}