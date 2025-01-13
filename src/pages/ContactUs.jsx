import React from 'react'
import { Container, Input, Button } from "../components";
import { useForm } from 'react-hook-form';

function ContactUs() {

  const [register , handleSubmit] = useForm();
  return (
    <div class="mx-auto max-w-xs">
      <Container>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            type="name"
            name="name"
            placeholder="Enter your Name"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            {...register("name", {
              required: true,
              minLength: {
                value: 6,
                message: "Enter Your Full Name",
              },
            })}
          />
          <Input
            type="name"
            name="name"
            placeholder="Problem ?"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            {...register("name", {
              required: true,
              minLength: {
                value: 10,
                message: "!!",
              },
            })}
          />

          <Button
            label={"Submit"}
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
      </Container>
    </div>
  );
}

export default ContactUs
