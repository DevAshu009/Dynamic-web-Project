import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Import the Navbar component

import ImagesPage from './Components/ImagePage';
import ImageDetailsPage from './Components/ImageDetailsPage';
import Home from './Components/Home';
import SearchImage from './Components/SearchImage';
import VideosPage from './Components/VideosPage';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';
import Footer from './Components/Footer';
import GetStarted from './Components/GetStarted';
import Login from './Components/LoginPage';
import VideoPlayer from './Components/videoPlayer';


function App() {
  return (
    <Router>
      <div className="min-h-screen  text-white">
        <Navbar />
       
        <Routes>
         
        <Route path="/" element={<Home />} />
          <Route path="/images" element={<ImagesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/image-details" element={<ImageDetailsPage />} />
          <Route path="/search/images" element={<SearchImage />} />
          <Route path="/search/videos" element={<VideosPage />} />
          <Route path="/getstarted" element={<GetStarted/>} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/videoPage" element={<VideoPlayer/>} /> 
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;
