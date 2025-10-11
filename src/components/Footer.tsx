import React from "react";
import github from "../assets/github.png";
import linkedinLogo from "../assets/linkedin.png";
import logo from "../assets/logo.png";
import tsxLogo from "../assets/ytChannelLogo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 border-t border-gray-700 mt-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo Section */}
          <div className="flex items-center mb-6 md:mb-0">
            <img src={logo} alt="Logo" className="h-32 mr-4" />
            <span className="text-2xl font-bold"></span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8 text-lg cursor-pointer">
            <p>About</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Social Media & Info Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://www.linkedin.com/in/teodora-angelova-4a637b181/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <img src={linkedinLogo} alt="YouTube" className="h-8 w-8" />
            </a>
            <a
              href="https://github.com/tedyAA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <img src={github} alt="GitHub" className="h-8 w-8" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-center text-gray-400">
            <p>Have questions? Email us at:</p>
            <a
              className="font-medium text-white"
              href="mailto:tangelova81@gmail.com"
            >
              tangelova81@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col  text-sm text-gray-500">
          <p className="mt-8  ">
            {new Date().getFullYear()} Movies. All rights reserved ©
          </p>
          <p> Created by Teodora Angelova</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
