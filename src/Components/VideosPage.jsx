import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackOutline, IoArrowUpOutline, IoArrowDownOutline, IoDownloadOutline } from 'react-icons/io5';
import Footer from './Footer';

const VideosPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results = [], query, currentPage = 1 } = location.state || {};

  const [videos, setVideos] = useState(results);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState({});

  const fetchMoreVideos = async () => {
    setLoading(true);
    try {
      const apiKey = 'EToZgwHzrvdNEcycFFDuqW0Hl5LXFQ9rJ4NJJTtf4iFQHqIJ1aBx42BJ';
      const url = `https://api.pexels.com/videos/search?query=${query}&page=${page + 1}&per_page=15`;

      const response = await axios.get(url, {
        headers: {
          Authorization: apiKey,
        },
      });

      setVideos((prevVideos) => [...prevVideos, ...response.data.videos]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching more videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    navigate('/videoPage', { state: { video } });
  };

  const handleDownloadClick = (videoLink) => {
    const link = document.createElement('a');
    link.href = videoLink;
    link.download = query ||  'video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVideoLoadStart = (index) => {
    setVideoLoading((prev) => ({ ...prev, [index]: true }));
  };

  const handleVideoLoadedData = (index) => {
    setVideoLoading((prev) => ({ ...prev, [index]: false }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos?.map((video, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl mb-4 transition-shadow duration-300"
            >
              {videoLoading[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                </div>
              )}
              <video
                controls
                className={`w-full h-40 object-cover cursor-pointer transform transition-transform duration-300 hover:scale-105 ${videoLoading[index] ? 'opacity-0' : 'opacity-100'}`}
                onClick={() => handleVideoClick(video)}
                onLoadStart={() => handleVideoLoadStart(index)}
                onLoadedData={() => handleVideoLoadedData(index)}
              >
                <source src={video.video_files[0]?.link} type="video/mp4" />
              </video>
              <button
                onClick={() => handleDownloadClick(video.video_files[0]?.link)}
                className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
                title="Download Video"
              >
                <IoDownloadOutline className="text-xl" />
              </button>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
          >
            <IoArrowBackOutline className="mr-2 text-lg" />
            Back
          </button>
          <button
            onClick={fetchMoreVideos}
            className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300 flex items-center"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'More'}
          </button>
        </div>
      </div>

      <div className="fixed bottom-16 right-4 flex flex-col gap-4">
        <button
          onClick={scrollToTop}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          title="Scroll to Top"
        >
          <IoArrowUpOutline className="text-2xl" />
        </button>
        <button
          onClick={scrollToBottom}
          className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
          title="Scroll to Bottom"
        >
          <IoArrowDownOutline className="text-2xl" />
        </button>
      </div>

      <Footer />
    </>
  );
};

export default VideosPage;
