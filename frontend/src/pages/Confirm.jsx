import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShippingFast, FaCheckCircle, FaCreditCard } from "react-icons/fa";

const Confirm = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 500 ? 0 : 50;
  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.area}, ${shippingInfo.country}, ${shippingInfo.postalCode}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center text-[#1378bd]">
          <FaShippingFast size={24} />
          <span className="text-sm mt-1">Shipping</span>
        </div>
        <div className="w-1/3 h-1 bg-[#1378bd]"></div>
        <div className="flex flex-col items-center text-[#1378bd] font-bold">
          <FaCheckCircle size={24} />
          <span className="text-sm mt-1">Confirm</span>
        </div>
        <div className="w-1/3 h-1 bg-gray-300"></div>
        <div className="flex flex-col items-center text-gray-400">
          <FaCreditCard size={24} />
          <span className="text-sm mt-1">Payment</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white shadow rounded-xl p-4 mb-4 border border-[#1378bd]">
        <h2 className="text-lg font-bold text-[#1378bd] mb-2">Shipping Info</h2>
        <p>
          <strong>Name:</strong> {shippingInfo.name}
        </p>
        <p>
          <strong>Phone:</strong> {shippingInfo.phone}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
      </div>

      {/* Cart Items */}
      <div className="bg-white shadow rounded-xl p-4 border border-[#1378bd]">
        <h2 className="text-lg font-bold text-[#1378bd] mb-2">Your Cart</h2>
        {cartItems.map((item) => (
          <div
            key={item.product}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-contain"
              />
              <span className="font-medium">{item.name}</span>
            </div>
            <div>
              {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="mt-4 text-right">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p className="font-bold text-lg">Total: ₹{totalPrice}</p>
        <button
          onClick={proceedToPayment}
          className="mt-3 px-6 py-2 bg-[#1378bd] text-white rounded hover:bg-[#0f6aad] transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Confirm;
