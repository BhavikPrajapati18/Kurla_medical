import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Home, MapPin, Mail, Globe } from "lucide-react";
import { saveShippingInfo } from "../store/actions/cartAction.js";
import CheckoutSteps from "../components/CheckOutSteps.jsx";

function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    area: "",
    postalCode: "",
    phone: "",
    country: "India",
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
    dispatch(saveShippingInfo(shippingInfo));
    console.log("Shipping Information Saved:", shippingInfo);
    navigate("/confirm");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <CheckoutSteps shipping={true} confirmOrder={false} payment={false} />

        <div className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Shipping Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white rounded-xl shadow-md p-8"
            >
              {/* Name */}
              <div className="flex items-center gap-2">
                <User size={20} className="text-gray-500" />
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium mb-2 text-gray-700"
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

              {/* Address */}
              <div className="flex items-center gap-2">
                <Home size={20} className="text-gray-500" />
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium mb-2 text-gray-700"
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

              {/* Area */}
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-500" />
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="area"
                    className="text-sm font-medium mb-2 text-gray-700"
                  >
                    Area (only in Nehru Nagar, Kurla)
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={shippingInfo.area}
                    onChange={handleInputChange}
                    placeholder="Ex: Sector 1, Qureshi Nagar"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Country (readonly) */}
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-gray-500" />
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium mb-2 text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-gray-500" />
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium mb-2 text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-gray-500" />
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="postalCode"
                    className="text-sm font-medium mb-2 text-gray-700"
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium"
              >
                Save & Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
