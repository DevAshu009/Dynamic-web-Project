import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoDownloadOutline } from 'react-icons/io5';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById('videoPlayer');
    
    const handleLoadedData = () => {
      setLoading(false);
    };

    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleLoadedData);
      
      // Cleanup event listener on component unmount
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [video]);

  const handleDownloadClick = () => {
    if (!video?.video_files[0]?.link) {
      console.error('Video link is not available');
      return;
    }

    const link = document.createElement('a');
    link.href = video.video_files[0].link;
    link.download = 'video.mp4'; // Optional: You can set a more dynamic filename based on the video metadata
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!video) {
    return <div>No video available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin"></div>
          </div>
        )}
        <video
          id="videoPlayer"
          controls
          className={`w-full h-80 object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
          onCanPlayThrough={() => setLoading(false)} // Another approach to handle loading state
        >
          <source src={video.video_files[0]?.link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={handleDownloadClick}
          className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          title="Download Video"
        >
          <IoDownloadOutline className="text-xl" />
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
      >
        <IoArrowBackOutline className="mr-2 text-lg" />
        Back
      </button>
    </div>
  );
};

export default VideoPlayer;
