import React, { useState, useEffect } from "react";
import { Input, Button, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { clearErrors, login } from "../store/actions/userAction.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const { error, loading, isAuthentication } = useSelector(
    (state) => state.user
  );

  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
  };

  useEffect(() => {
    if (isAuthentication) {
      navigate("/");
    }

    if (error) {
      setErrorMessage(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthentication, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mb-2 flex justify-center">
            <Link to="/">
              <Logo className="inline-block w-full" />
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signin"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                {errorMessage && (
                  <p className="text-center text-red-500 mb-4">
                    {errorMessage}
                  </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />

                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    label={loading ? "Logging in..." : "Login"}
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                  </Button>
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
