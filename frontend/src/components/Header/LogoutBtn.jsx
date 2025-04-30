import React from "react";
import { useDispatch } from "react-redux";

function LoginBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {};

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LoginBtn;
