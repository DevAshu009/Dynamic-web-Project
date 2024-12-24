import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import Footer from './Footer';

const ImageDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, query } = location.state || {};

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDownload = async () => {
    try {
      if (!image || !image.src || !image.src.original) {
        throw new Error("Image URL not available.");
      }

      const url = image.src.original;
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = query || "image.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error in handleDownload:", error);
      alert("There was an error downloading the image. Please try again.");
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const newScale = Math.min(Math.max(scale - e.deltaY * zoomFactor, 1), 3);

    // Calculate the new position to zoom towards the cursor
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const newPosX = (offsetX - position.x) * (newScale / scale - 1);
    const newPosY = (offsetY - position.y) * (newScale / scale - 1);

    setScale(newScale);
    setPosition({
      x: position.x - newPosX,
      y: position.y - newPosY,
    });
  };

  const handleDoubleClick = () => {
    setScale((prevScale) => (prevScale === 1 ? prevScale+1  : 1));
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative bg-gray-900 text-white font-serif p-4 h-[91vh] flex flex-col"
      onWheel={handleDoubleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex justify-between items-center h-8 mb-4">
        <div className="absolute left-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center py-2 px-6 bg-blue-500 text-black rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>
        <div className="absolute right-4">
          <button
            onClick={handleDownload}
            className="flex items-center py-2 px-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <FaDownload className="mr-2" /> Download
          </button>
        </div>
      </div>
      <div
        className="flex flex-grow justify-center items-center overflow-hidden"
        style={{ position: 'relative' }}
      >
        {image ? (
          <div
            className="relative flex justify-center mt-1 items-center"
            style={{
              maxHeight: '80vh',
              maxWidth: '100%',
              overflow: 'hidden',
              cursor: scale > 1 ? 'zoom-out' : 'zoom-in',
            }}
          >
            <img
              src={image.src.original}
              alt={image.alt}
              className="object-contain mt-2"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center',
                transition: 'transform 0.3s ease',
                maxHeight: '100%',
                maxWidth: '100%',
                willChange: 'transform',
              }}
            />
          </div>
        ) : (
          <p className="text-lg text-center">Image not found</p>
        )}
      </div>
     
    </div>
  );
};

export default ImageDetailsPage;
