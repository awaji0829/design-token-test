import React from 'react';
import { useColorContext } from '../context/ColorContext';
import { formatRgb, formatHsl, getContrastTextColor } from '../utils/colorUtils';
import { Copy, CheckCircle } from 'lucide-react';

const ColorRecommendations: React.FC = () => {
  const { selectedColor, recommendedColors } = useColorContext();
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  if (!selectedColor) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Color Selected</h3>
        <p className="text-gray-600">
          Use the color picker or camera to select a color and get AI recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Color Harmony Recommendations</h3>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-700">Selected Color</h4>
            <span className="text-sm text-gray-500">{selectedColor.toUpperCase()}</span>
          </div>
          <div 
            className="h-20 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{ 
              backgroundColor: selectedColor,
              color: getContrastTextColor(selectedColor)
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
            <div className="relative z-10 space-y-1 text-center">
              <div>{formatRgb(selectedColor)}</div>
              <div>{formatHsl(selectedColor)}</div>
            </div>
          </div>
        </div>

        <h4 className="font-medium text-gray-700 mb-3">Recommended Color Palette</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {recommendedColors.slice(0, 6).map((color, index) => (
            <div key={index} className="group">
              <div
                className="h-24 rounded-lg shadow-sm overflow-hidden relative cursor-pointer transition-transform transform group-hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  {copiedColor === color ? (
                    <CheckCircle className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Copy className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
              <div className="mt-1 text-xs font-medium text-gray-600 flex justify-between items-center">
                <span>{color.toUpperCase()}</span>
                <button
                  onClick={() => copyToClipboard(color)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label={`Copy ${color}`}
                >
                  {copiedColor === color ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <ColorTag label="Complementary" />
          <ColorTag label="Analogous" />
          <ColorTag label="Triadic" />
          <ColorTag label="Monochromatic" />
        </div>
      </div>
    </div>
  );
};

const ColorTag: React.FC<{ label: string }> = ({ label }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      {label}
    </span>
  );
};

export default ColorRecommendations;