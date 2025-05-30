import React, { createContext, useState, useContext } from 'react';
import { generateHarmoniousColors } from '../utils/colorUtils';

type ColorContextType = {
  selectedColor: string | null;
  recommendedColors: string[];
  colorHistory: string[];
  setSelectedColor: (color: string) => void;
  addToHistory: (color: string) => void;
  clearHistory: () => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [recommendedColors, setRecommendedColors] = useState<string[]>([]);
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const handleSetSelectedColor = (color: string) => {
    setSelectedColor(color);
    const harmoniousColors = generateHarmoniousColors(color);
    setRecommendedColors(harmoniousColors);
  };

  const addToHistory = (color: string) => {
    setColorHistory((prevHistory) => {
      if (prevHistory.includes(color)) {
        return prevHistory;
      }
      return [...prevHistory, color].slice(-10); // Keep only the latest 10 colors
    });
  };

  const clearHistory = () => {
    setColorHistory([]);
  };

  return (
    <ColorContext.Provider
      value={{
        selectedColor,
        recommendedColors,
        colorHistory,
        setSelectedColor: handleSetSelectedColor,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};