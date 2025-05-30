import React from 'react';
import { Camera, PaintBucket, Palette, Sparkles, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Color Harmony</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              Color Harmony is an innovative tool designed to help everyone discover beautiful color combinations. Whether you're a designer, photographer, artist, or just someone looking to find matching colors for your home decor, our application makes color coordination simple and intuitive.
            </p>
            <p>
              Using advanced AI algorithms and color theory principles, we analyze your selected colors and provide recommendations that create visually pleasing palettes. Our technology considers complementary, analogous, triadic, and monochromatic relationships to suggest colors that work harmoniously together.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Camera className="h-6 w-6 text-indigo-600" />}
              title="Real-time Color Detection"
              description="Capture colors directly from your camera, allowing you to find color codes from objects in your environment."
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-indigo-600" />}
              title="Color Harmony AI"
              description="Our intelligent algorithm suggests the perfect color combinations based on established color theory principles."
            />
            <FeatureCard
              icon={<PaintBucket className="h-6 w-6 text-indigo-600" />}
              title="Multiple Color Formats"
              description="View and copy colors in HEX, RGB, and HSL formats for use in different applications and scenarios."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-indigo-600" />}
              title="Intuitive Interface"
              description="Designed for ease of use with a clean, responsive interface that works on all your devices."
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How To Use Color Harmony</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">For Designers</h3>
              <p className="text-gray-600 mb-4">
                Find the perfect color palette for your next project. Capture inspiration from the world around you or fine-tune your existing color schemes.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Create cohesive brand identities</li>
                <li>Design user interfaces with accessible color combinations</li>
                <li>Build visually harmonious presentations and graphics</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">For Home Decor</h3>
              <p className="text-gray-600 mb-4">
                Ensure your home colors coordinate perfectly. Capture colors from existing furniture or wall colors to find matching accent colors.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Match paint colors with existing furniture</li>
                <li>Create coordinated room color schemes</li>
                <li>Find complementary accent colors for accessories</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">For Artists</h3>
              <p className="text-gray-600 mb-4">
                Expand your color palette and discover new combinations. Find harmonious colors based on your existing artwork elements.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Discover new color relationships for paintings</li>
                <li>Create balanced color compositions</li>
                <li>Find subtle color variations for detailed work</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
            <Heart className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Made with Passion for Color Enthusiasts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Color Harmony was created by a team passionate about colors and design. We believe that everyone deserves access to tools that make their creative and home projects more beautiful.
          </p>
        </section>
      </div>
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AboutPage;