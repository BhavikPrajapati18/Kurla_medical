import { Container } from "../components";
import mainImage from "../assets/material/main.png";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section with Image */}
      <div className="relative w-full h-screen max-h-[800px] min-h-[400px]">
        <img
          src={mainImage}
          alt="Main Image"
          className="w-full h-full object-cover"
        />

        {/* Overlay with improved gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/90"></div>

        {/* Responsive Container for Content */}
        <Container>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Responsive Typography */}
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight"
                style={{
                  textShadow:
                    "2px 2px 6px rgba(0, 0, 0, 0.9), -2px -2px 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                Kurla Medical
              </h1>

              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 sm:mb-10"
                style={{
                  textShadow:
                    "2px 2px 6px rgba(0, 0, 0, 0.9), -2px -2px 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                Your Trusted Partner for Health & Wellness
              </p>

              {/* Conditionally render button based on auth status */}
              {authStatus && (
                <button
                  onClick={() => navigate("/store")}
                  className="inline-flex items-center px-6 py-3 text-base sm:text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Shop Now
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
