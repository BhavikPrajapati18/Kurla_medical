import React from "react";

function Contact() {
  return (
    <div className="bg-[#f9fafb] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1C7690] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700">
            Have questions? We’re here to help. Send us a message or visit us at
            our store.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#1C7690] mb-6">
              Get in Touch
            </h2>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Address
                </h3>
                <p className="text-gray-600">
                  JagrutiNagar, Kurla Medical
                  <br />
                  Kurla East, Mumbai
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Contact Numbers
                </h3>
                <p className="text-gray-600">
                  Phone: (555) 123-4567
                  <br />
                  Emergency: (555) 987-6543
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600">info@kurlamedical.com</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Business Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 9:00 PM
                  <br />
                  Saturday: 10:00 AM - 6:00 PM
                  <br />
                  Sunday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#1C7690] mb-6">
              Send us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1C7690] focus:border-[#1C7690]"
                  placeholder="Bhavik Prajapati"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1C7690] focus:border-[#1C7690]"
                  placeholder="kurla@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1C7690] focus:border-[#1C7690]"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1C7690] focus:border-[#1C7690]"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C7690] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#165d75] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-12">
          <div className="bg-[#e6f2f5] w-full h-64 rounded-lg">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map will be integrated here
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Contact;
