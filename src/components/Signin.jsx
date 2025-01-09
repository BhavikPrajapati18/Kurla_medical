import React, { useState } from "react";
import { Logo, Input, Button } from "./index";
import authService from "../appwriteService/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const Signin = async (data) => {
    console.log(data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.userAcitve();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Link to="/">
              <Logo className="w-mx-auto" />
            </Link>
          </div>

          <div class="mt-12 flex flex-col items-center">
            <div class="w-full flex-1 mt-8">
              <div class="mx-auto max-w-xs">
                {error && <p className="text-red-500 text-sm mt-2"> {error} </p>}
                <form onSubmit={handleSubmit(Signin)}>
                  <div>
                  <Input
                      type="name"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      {...register("name", {
                        required: true,
                      })}
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      {...register("email", {
                        required: true,
                        validate: {
                          matchPatern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              value
                            ) || "Email address must be a valid address",
                        },
                      })}
                    />

                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 6,
                          message: "Password must have at least 6 characters",
                        },
                      })}
                    />

                    <Button
                      label={"SignIn"}
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                    </Button>
                  </div>
                </form>

                <p class="mt-6 text-xs text-gray-600 text-center">
                  <a href="#" class="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>
                  and
                  <a href="#" class="border-b border-gray-500 border-dotted">
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

export default Signin;
