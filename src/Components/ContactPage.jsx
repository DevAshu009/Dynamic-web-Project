import React from 'react';
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import Footer from './Footer';

const ContactPage = () => {
  return (
    <>
    <div className="min-h-[88vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-3xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <div className="space-y-2">
          <div className="flex items-center">
            <IoLocationOutline className="text-2xl text-blue-500 mr-4" />
            <p className="text-lg">Hajipur,Patna,Bihar</p>
          </div>
          <div className="flex items-center">
            <IoCallOutline className="text-2xl text-blue-500 mr-4" />
            <p className="text-lg">+91 9473268...</p>
          </div>
          <div className="flex items-center">
            <IoMailOutline className="text-2xl text-blue-500 mr-4" />
            <p className="text-lg hover:text-blue-500 hover:underline"><a href="www.gmail.com">ashukumar73268@gmail.com</a></p>
          </div>
        </div>
        <form className="mt-8 space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full p-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
              rows="5"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;
