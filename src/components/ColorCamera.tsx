import React, { useRef, useState, useEffect } from "react";
import { Camera, Aperture, XCircle } from "lucide-react";
import { extractDominantColor } from "../utils/colorUtils";
import { useColorContext } from "../context/ColorContext";

const ColorCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const { setSelectedColor, addToHistory } = useColorContext();

  const waitForVideoRef = async () => {
    let attempts = 0;
    while (!videoRef.current && attempts < 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
    return videoRef.current;
  };
  const startCamera = async () => {
    try {
      setError(null);
      await waitForVideoRef(); // <- videoRef가 연결될 때까지 기다림

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        console.log("stream?", stream);
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Unable to access camera. Please make sure you have granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
      setIsCameraActive(false);
      setCurrentColor(null);
    }
  };

  const captureColor = () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get color at center point (or specified position)
        const x = position.x || Math.floor(canvas.width / 2);
        const y = position.y || Math.floor(canvas.height / 2);

        // Create a small sample area around the point (5x5 pixels)
        const imageData = context.getImageData(x - 2, y - 2, 5, 5);
        const color = extractDominantColor(imageData);

        setCurrentColor(color);
        setSelectedColor(color);
        addToHistory(color);
      }
    }
  };

  const handleVideoClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      const scaleX = videoRef.current.videoWidth / rect.width;
      const scaleY = videoRef.current.videoHeight / rect.height;

      // Calculate position in original video coordinates
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      setPosition({ x, y });

      // Immediately capture color at this position
      setTimeout(() => captureColor(), 0);
    }
  };

  useEffect(() => {
    // Clean up camera on component unmount
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Camera className="h-5 w-5 mr-2 text-indigo-600" />
          Color Camera
        </h3>
      </div>

      <div className="p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
          {true ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover cursor-crosshair"
                onClick={handleVideoClick}
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-white rounded-full opacity-50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              {currentColor && (
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-70 rounded-lg p-3"
                  style={{
                    borderLeft: `4px solid ${currentColor}`,
                  }}
                >
                  <div className="text-white text-sm uppercase">
                    {currentColor}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={captureColor}
                      className="p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors"
                      aria-label="Capture current color"
                    >
                      <Aperture className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-white">
              <Camera className="h-12 w-12 mb-4 text-indigo-400" />
              <p className="text-center mb-4">
                Enable your camera to detect colors from your surroundings
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          {!isCameraActive ? (
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Camera className="h-4 w-4 mr-2" />
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Stop Camera
            </button>
          )}
        </div>
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ColorCamera;
