import React from 'react';
import { useColorContext } from '../context/ColorContext';
import { Clock, Trash2 } from 'lucide-react';
import { getContrastTextColor } from '../utils/colorUtils';

const ColorHistory: React.FC = () => {
  const { colorHistory, setSelectedColor, clearHistory } = useColorContext();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-indigo-600" />
          Recently Selected Colors
        </h3>
        {colorHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Clear history"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="p-4">
        {colorHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p>Your selected colors will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {colorHistory.map((color, index) => (
              <button
                key={index}
                className="aspect-square rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform hover:scale-105 relative group"
                style={{ backgroundColor: color, color: getContrastTextColor(color) }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color}`}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono">
                  {color}
                </span>
                <div className="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-10 transition-colors"></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorHistory;