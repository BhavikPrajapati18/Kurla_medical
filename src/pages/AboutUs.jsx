import React from 'react';
import aboutImage from '../assets/material/about.jpg'; // Update with your image path

function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="lg:w-1/2">
            <img
              className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
              src={aboutImage}
              alt="Kurla Medical Store"
            />
          </div>

          {/* Text */}
          <div className="lg:w-1/2 text-white">
            <h1 className="text-5xl font-extrabold mb-6">About <span className="text-yellow-300">Kurla Medical</span></h1>
            <p className="text-lg leading-relaxed">
              Welcome to Kurla Medical, your trusted neighborhood pharmacy and medical supply store. We take pride in providing high-quality healthcare products and exceptional customer service tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature */}
            {["Quality Products", "Expert Guidance", "24/7 Service", "Quick Delivery"].map((title, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600">
                  {index === 0 && "We stock only the highest quality medical supplies and equipment from trusted manufacturers."}
                  {index === 1 && "Our knowledgeable staff provides expert advice on product selection and usage."}
                  {index === 2 && "Available round the clock for emergency medical supply needs."}
                  {index === 3 && "Fast and reliable delivery service to your doorstep."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To provide accessible, high-quality medical supplies and exceptional customer service that improves the health and well-being of our community.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
