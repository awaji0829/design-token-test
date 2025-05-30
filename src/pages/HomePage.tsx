import React from "react";
import ColorCamera from "../components/ColorCamera";
import ColorPicker from "../components/ColorPicker";
import ColorRecommendations from "../components/ColorRecommendations";
import ColorHistory from "../components/ColorHistory";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Perfect Color Combinations
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Capture colors from your camera or select them manually, and let our AI recommend harmonious color palettes that work beautifully together.
          </p>
        </section> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <ColorCamera />
            <ColorPicker />
            <ColorHistory />
          </div>
          <div>
            <ColorRecommendations />
          </div>
        </div>

        <section className="bg-indigo-50 rounded-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number={1}
              title="Capture or Select Colors"
              description="Use your camera to capture colors from your surroundings or use the color picker to select any color."
            />
            <StepCard
              number={2}
              title="AI Processing"
              description="Our AI analyzes your selected color and determines the most harmonious combinations based on color theory."
            />
            <StepCard
              number={3}
              title="Explore & Use"
              description="Browse the recommended palettes, copy color codes, and use them in your designs or home decor projects."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

type StepCardProps = {
  number: number;
  title: string;
  description: string;
};

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm relative">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
