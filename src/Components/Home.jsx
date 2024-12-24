import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const Home = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [mediaType, setMediaType] = useState('images'); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchButtonRef = useRef(null); 
  const inputRef = useRef(null); 

  
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Fetch images or videos based on the mediaType
  const fetchMedia = async (type) => {
    if (query.trim() === '') {
      alert('Please enter a search');
      return;
    }

    const apiKey = 'EToZgwHzrvdNEcycFFDuqW0Hl5LXFQ9rJ4NJJTtf4iFQHqIJ1aBx42BJ';
    const url = type === 'images'
      ? `https://api.pexels.com/v1/search?query=${query}&per_page=16`
      : `https://api.pexels.com/videos/search?query=${query}&per_page=16`; // Use video search API for videos

    try {
      setLoading(true); // Show loading spinner
      const response = await axios.get(url, {
        headers: {
          Authorization: apiKey
        }
      });
      const data = type === 'images' ? response.data.photos : response.data.videos;
      navigate(`/search/${type}`, { state: { results: data, query } });
      updateHistory(query);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle search button click
  const handleSearch = debounce(() => {
    if (mediaType) {
      fetchMedia(mediaType);
    }
  }, 300);

  // Update search history
  const updateHistory = (searchTerm) => {
    setHistory((prevHistory) => [searchTerm, ...prevHistory.slice(0, 4)]);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch();
  };

  // Handle key down event for Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      if (query.trim() !== '') {
        searchButtonRef.current.click(); // Simulate button click
      }
    }
  };

  // Add event listener to the document for keydown events
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [query]);

  return (
    <>
      <div className="min-h-[86vh] bg-blue-200 flex flex-col items-center justify-center">
        <div className="text-center    ">
          <h2 className='text-xl  font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>IMAGE & VIDEO</h2>
          <h1 className="text-3xl  font-extrabold text-gray-800 mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text shadow-lg ">
            DOWNLOADER
            {/* Search Images & Videos */}
          </h1>

          <div className="flex flex-col items-center w-full max-w-xl mx-auto px-4">
            <div className="flex lg:flex-col items-center w-full lg:mb-0 mb-4 ">
              <input
                ref={inputRef} // Assign ref to the input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search images or videos..."
                className="w-full px-4 py-2 text-xl border lg:w-[45rem] text-black rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                className="ml-4 px-4 py-2 lg:w-full lg:ml-0 lg:mt-4 lg:mb-2 bg-[#a829e3] rounded-md"
              >
                <option value="images">Images</option>
                <option value="videos">Videos</option>
              </select>
            </div>

            <div className="w-full relative">
              <button
                onClick={handleSearch} // Use onClick to trigger search
                ref={searchButtonRef} // Assign ref to the button
                className="p-2 text-xl w-full lg:w-[50%] sm:w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:shadow-lg focus:outline-none transition-transform duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4z"
                    />
                  </svg>
                ) : (
                  'Search'
                )}
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="w-full mt-4 bg-white border rounded-md shadow-md">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
