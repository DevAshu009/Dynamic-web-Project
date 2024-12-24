import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { FaArrowUp } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import Footer from './Footer';

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { images: searchImages, query } = location.state || {};

  useEffect(() => {
    if (searchImages) {
      setImages((prevImages) => shuffleArray([...prevImages, ...searchImages]));
      setNoData(searchImages.length === 0 && images.length === 0);
    } else if (images.length === 0) {
      fetchImages(query || 'nature');
    }
  }, [searchImages]);

  const fetchImages = async (searchQuery) => {
    const apiKey = 'EToZgwHzrvdNEcycFFDuqW0Hl5LXFQ9rJ4NJJTtf4iFQHqIJ1aBx42BJ';
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&page=${page}&per_page=15`;

    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: apiKey,
        },
      });
      const newImages = response.data.photos;
      setImages((prevImages) => shuffleArray([...prevImages, ...newImages]));
      setNoData(newImages.length === 0 && images.length === 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleImageClick = (image) => {
    navigate('/image-details', { state: { image, query } });
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBackClick = () => {
    navigate(-2);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchImages(query || 'nature');
    }
  }, [page]);

  // Define the breakpoints for the Masonry layout
  const breakpointColumnsObj = {
    default: 4, // Number of columns for default screen size
    1100: 3,    // Number of columns for screen size 1100px and above
    700: 2,     // Number of columns for screen size 700px and above
    500: 2,     // Adjusted for 2 cards per column for screens smaller than 500px
  };

  return (
    <>
    <div className="min-h-screen text-white font-serif p-4">
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="w-12 h-12 animate-spin text-white" />
        </div>
      )}

      {!loading && noData && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">No data found</p>
        </div>
      )}

      {!loading && !noData && (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex gap-4"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-4"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src.large}
                  alt={image.alt}
                  className="w-full h-auto object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </Masonry>
          <div className="flex justify-center items-center gap-4 mt-8">
            {searchImages && (
              <button
                onClick={handleBackClick}
                className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Back
              </button>
            )}
            <button
              onClick={handleLoadMore}
              className="py-2 px-6 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'More Images'}
            </button>
          </div>
        </>
      )}

      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}
       
    </div>
    <Footer/>
    </>
    
  );
};

export default ImagesPage;
