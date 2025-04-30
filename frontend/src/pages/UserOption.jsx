import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LogOutIcon,
  ShoppingCartIcon,
  PencilIcon,
  LockIcon,
  LayoutDashboardIcon,
  User2Icon,
  MailIcon,
  CalendarIcon,
} from "lucide-react";
import { logoutUser } from "../store/actions/userAction";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Profile Header */}
      <h2 className="text-3xl font-bold text-center text-[#1378bd] mb-8">
        👤 Hello,{user?.fullName} Ji
      </h2>

      {/* Profile Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-gray-800">
        <div className="flex items-center gap-3">
          <User2Icon className="text-[#1378bd]" />
          <span className="font-medium">{user?.username}</span>
        </div>
        <div className="flex items-center gap-3">
          <MailIcon className="text-[#1378bd]" />
          <span className="font-medium">{user?.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-[#1378bd]" />
          <span className="font-medium">
            {new Date(user?.createdAt).toDateString()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionButton
          icon={<ShoppingCartIcon className="text-white" size={18} />}
          text="My Orders"
          onClick={() => navigate("/orders")}
          bg="bg-[#1378bd]"
        />
        <ActionButton
          icon={<PencilIcon className="text-white" size={18} />}
          text="Edit Profile"
          onClick={() => navigate("/update")}
          bg="bg-[#1378bd]"
        />
        <ActionButton
          icon={<LockIcon className="text-white" size={18} />}
          text="Change Password"
          onClick={() => navigate("/change-password")}
          bg="bg-[#1378bd]"
        />
        {user?.role === "admin" && (
          <ActionButton
            icon={<LayoutDashboardIcon className="text-white" size={18} />}
            text="Admin Dashboard"
            onClick={() => navigate("/admin/dashboard")}
            bg="bg-gray-800"
          />
        )}
        <ActionButton
          icon={<LogOutIcon className="text-white" size={18} />}
          text="Logout"
          onClick={logoutHandler}
          bg="bg-red-500"
        />
      </div>
    </div>
  );
}

function ActionButton({ icon, text, onClick, bg }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 justify-center px-4 py-3 rounded-lg shadow-md text-white font-medium ${bg} hover:opacity-90 transition duration-200`}
    >
      {icon}
      {text}
    </button>
  );
}

export default UserProfile;
