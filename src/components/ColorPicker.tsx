import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useColorContext } from '../context/ColorContext';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../utils/colorUtils';

const ColorPicker: React.FC = () => {
  const [hexValue, setHexValue] = useState('#6366F1');
  const [isValid, setIsValid] = useState(true);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const { setSelectedColor, addToHistory } = useColorContext();

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    
    // Check if it's a valid hex color
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    setIsValid(isValidHex);
    
    if (isValidHex) {
      setSelectedColor(value);
      addToHistory(value);
      
      // Update the color picker visual
      if (colorPickerRef.current) {
        colorPickerRef.current.value = value;
      }
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    setIsValid(true);
    setSelectedColor(value);
    addToHistory(value);
  };

  // Ensure hex value always has the # prefix
  useEffect(() => {
    if (hexValue && !hexValue.startsWith('#')) {
      setHexValue(`#${hexValue}`);
    }
  }, [hexValue]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Palette className="h-5 w-5 mr-2 text-indigo-600" />
          Color Picker
        </h3>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div 
            className="w-full h-32 rounded-lg shadow-inner overflow-hidden relative transition-colors"
            style={{ backgroundColor: isValid ? hexValue : '#e2e8f0' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="hexInput" className="block text-sm font-medium text-gray-700 mb-1">
                Hex Color Code
              </label>
              <div className="relative">
                <input
                  id="hexInput"
                  type="text"
                  value={hexValue}
                  onChange={handleHexChange}
                  className={`block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    isValid
                      ? 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  }`}
                  placeholder="#RRGGBB"
                />
                {isValid && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {!isValid && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid hex color code (e.g., #FF5733)
                </p>
              )}
            </div>
            
            <div className="flex-1">
              <label htmlFor="colorPicker" className="block text-sm font-medium text-gray-700 mb-1">
                Color Selector
              </label>
              <input
                ref={colorPickerRef}
                id="colorPicker"
                type="color"
                value={isValid ? hexValue : '#6366F1'}
                onChange={handleColorPickerChange}
                className="h-10 w-full rounded cursor-pointer border border-gray-300"
              />
            </div>
          </div>
          
          <button
            onClick={() => {
              if (isValid) {
                setSelectedColor(hexValue);
                addToHistory(hexValue);
              }
            }}
            disabled={!isValid}
            className={`w-full py-2 rounded-lg font-medium flex items-center justify-center ${
              isValid
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            <Palette className="h-4 w-4 mr-2" />
            Use This Color
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;