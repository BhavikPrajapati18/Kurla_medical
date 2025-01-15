import { Container } from '../components';
import mainImage from '../assets/material/main.png';
import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  if ( authStatus ){
    return (
      <div className="w-full">
      {/* Hero Section with Image */}
      <div className="relative w-full">
        <img
          src={mainImage}
          alt="Main Image"
          className="w-full h-auto object-cover block"
          style={{ marginBottom: "-4px" }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
        {/* Centered Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg" style={{
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9), -2px -2px 6px rgba(255, 255, 255, 0.5)",
          }}>
            Kurla Medical
          </h1>
          <p className="text-lg md:text-2xl text-white mt-4 drop-shadow-md"style={{
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9), -2px -2px 6px rgba(255, 255, 255, 0.5)",
          }}>
            Your Trusted Partner for Health & Wellness
          </p>
          {/* Button */}
          
          < button onClick={()=> navigate('/store')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg shadow-lg transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <div className="relative w-full">
        <img
          src={mainImage}
          alt="Main Image"
          className="w-full h-auto object-cover block"
          style={{ marginBottom: "-4px" }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
        {/* Centered Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg" style={{
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9), -2px -2px 6px rgba(255, 255, 255, 0.5)",
          }}>
            Kurla Medical
          </h1>
          <p className="text-lg md:text-2xl text-white mt-4 drop-shadow-md"style={{
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9), -2px -2px 6px rgba(255, 255, 255, 0.5)",
          }}>
            Your Trusted Partner for Health & Wellness
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
