import React from 'react';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <>
   <div>
       <div className="min-h-[88vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">About Me</h1>
        <p className="text-gray-600 mb-4">
          Hello! I'm <span className='font-bold'>ASHUTOSH Kr</span> , a passionate Web Developer  with over 2 years of experience in developing web applications. I enjoy solving complex problems and turning ideas into reality through code.
        </p>
        <p className="text-gray-600 mb-4">
          I specialize in full-stack development, particularly using React for front-end development and Node.js for back-end development. I'm always eager to learn new technologies and improve my skills.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Skills</h2>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>JavaScript (ES6+)</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
          <li>HTML & CSS</li>
          <li>Tailwind CSS</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Contact</h2>
        <p className="text-gray-600 mb-2">
          Feel free to reach out to me via email at <a href="gmail.com" className="text-blue-500 hover:underline">ashukumar73268@gmail.com</a>.
        </p>
        <p className="text-gray-600">
          I'm also available on LinkedIn: <a href="https://www.linkedin.com" className="text-blue-500 hover:underline">A.K Developer</a>
        </p>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;
