import React from "react";
import { Truck, CheckCircle, CreditCard } from "lucide-react";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  const activeColor = "#1378bd";
  const inactiveColor = "#d1d5db";

  return (
    <div className="flex justify-center items-center space-x-8 my-6">
      {/* Shipping Step */}
      <div className="flex flex-col items-center text-sm">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2`}
          style={{
            borderColor: shipping ? activeColor : inactiveColor,
            color: shipping ? activeColor : inactiveColor,
          }}
        >
          <Truck size={24} />
        </div>
        <span
          style={{ color: shipping ? activeColor : inactiveColor }}
          className="mt-1 font-semibold"
        >
          Shipping
        </span>
      </div>

      {/* Line */}
      <div className="w-10 h-0.5" style={{ backgroundColor: "#d1d5db" }}></div>

      {/* Confirm Step */}
      <div className="flex flex-col items-center text-sm">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2`}
          style={{
            borderColor: confirmOrder ? activeColor : inactiveColor,
            color: confirmOrder ? activeColor : inactiveColor,
          }}
        >
          <CheckCircle size={24} />
        </div>
        <span
          style={{ color: confirmOrder ? activeColor : inactiveColor }}
          className="mt-1 font-semibold"
        >
          Confirm
        </span>
      </div>

      {/* Line */}
      <div className="w-10 h-0.5" style={{ backgroundColor: "#d1d5db" }}></div>

      {/* Payment Step */}
      <div className="flex flex-col items-center text-sm">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2`}
          style={{
            borderColor: payment ? activeColor : inactiveColor,
            color: payment ? activeColor : inactiveColor,
          }}
        >
          <CreditCard size={24} />
        </div>
        <span
          style={{ color: payment ? activeColor : inactiveColor }}
          className="mt-1 font-semibold"
        >
          Payment
        </span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
