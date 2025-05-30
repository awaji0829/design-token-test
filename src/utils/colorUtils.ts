// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
};

// Convert HSL to RGB
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

// Generate complementary color
export const getComplementaryColor = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Rotate hue by 180 degrees for complementary color
  const newH = (h + 0.5) % 1;
  const { r: newR, g: newG, b: newB } = hslToRgb(newH, s, l);
  
  return rgbToHex(newR, newG, newB);
};

// Generate analogous colors
export const getAnalogousColors = (hex: string): string[] => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Generate colors 30 degrees apart on each side
  const colors: string[] = [];
  [-0.0833, 0.0833].forEach(offset => {
    const newH = ((h + offset) % 1 + 1) % 1; // Ensure positive value between 0-1
    const { r: newR, g: newG, b: newB } = hslToRgb(newH, s, l);
    colors.push(rgbToHex(newR, newG, newB));
  });
  
  return colors;
};

// Generate triadic colors
export const getTriadicColors = (hex: string): string[] => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Generate colors 120 degrees apart
  const colors: string[] = [];
  [0.3333, 0.6667].forEach(offset => {
    const newH = (h + offset) % 1;
    const { r: newR, g: newG, b: newB } = hslToRgb(newH, s, l);
    colors.push(rgbToHex(newR, newG, newB));
  });
  
  return colors;
};

// Generate monochromatic colors (same hue, different lightness/saturation)
export const getMonochromaticColors = (hex: string): string[] => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  const colors: string[] = [];
  
  // Generate 4 variations with different lightness values
  [0.2, 0.4, 0.6, 0.8].forEach(lightness => {
    if (Math.abs(l - lightness) > 0.1) { // Avoid colors too similar to original
      const { r: newR, g: newG, b: newB } = hslToRgb(h, s, lightness);
      colors.push(rgbToHex(newR, newG, newB));
    }
  });
  
  return colors.slice(0, 3); // Return at most 3 colors
};

// Generate a set of harmonious colors based on color theory
export const generateHarmoniousColors = (hex: string): string[] => {
  const complementary = getComplementaryColor(hex);
  const analogous = getAnalogousColors(hex);
  const triadic = getTriadicColors(hex);
  const monochromatic = getMonochromaticColors(hex);
  
  // Combine all the colors, removing any duplicates
  const allColors = [
    ...analogous, 
    complementary, 
    ...triadic,
    ...monochromatic
  ];
  
  // Remove any duplicates
  const uniqueColors = [...new Set(allColors)];
  
  return uniqueColors;
};

// Extract dominant color from ImageData
export const extractDominantColor = (imageData: ImageData): string => {
  const data = imageData.data;
  const colorCounts: Record<string, number> = {};
  
  // Sample pixels (not every pixel to improve performance)
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Skip transparent pixels
    if (data[i + 3] < 128) continue;
    
    // Create a simplified color key (reduce precision to group similar colors)
    const key = `${Math.floor(r/10)},${Math.floor(g/10)},${Math.floor(b/10)}`;
    
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }
  
  // Find the most common color
  let maxCount = 0;
  let dominantColorKey = '0,0,0';
  
  for (const key in colorCounts) {
    if (colorCounts[key] > maxCount) {
      maxCount = colorCounts[key];
      dominantColorKey = key;
    }
  }
  
  // Convert back to real RGB values (take the middle of the bucket)
  const [rBucket, gBucket, bBucket] = dominantColorKey.split(',').map(Number);
  const r = rBucket * 10 + 5;
  const g = gBucket * 10 + 5;
  const b = bBucket * 10 + 5;
  
  return rgbToHex(r, g, b);
};

// Format RGB color for display
export const formatRgb = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

// Format HSL color for display
export const formatHsl = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

// Get contrasting text color (black or white) based on background color
export const getContrastTextColor = (bgColor: string): string => {
  const { r, g, b } = hexToRgb(bgColor);
  // Calculate luminance using the formula for relative luminance in sRGB space
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? '#000000' : '#ffffff';
};