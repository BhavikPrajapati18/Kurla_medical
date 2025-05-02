import React, { useState } from "react";
import { User, Home, MapPin, Mail, Globe } from "lucide-react";

function Shipping() {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    area: "", // For the specific area name
    postalCode: "",
    country: "India", // Pre-selecting India as the country
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping Information:", shippingInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping Information
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-xl shadow-md p-8"
        >
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-500" />
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Home size={20} className="text-gray-500" />
            <div className="flex flex-col w-full">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-gray-500" />
            <div className="flex flex-col w-full">
              <label
                htmlFor="area"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Area Name (Kurla Nehru Nagar)
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={shippingInfo.area}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your area (e.g., Kurla West, Nehru Nagar)"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe size={20} className="text-gray-500" />
            <div className="flex flex-col w-full">
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingInfo.country}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={20} className="text-gray-500" />
            <div className="flex flex-col w-full">
              <label
                htmlFor="postalCode"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium"
          >
            Save Shipping Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
