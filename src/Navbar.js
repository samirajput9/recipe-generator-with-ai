import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-primary shadow-lg fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <i className="fas fa-utensils text-2xl text-orange-500 mr-2"></i>
            <span className="text-xl font-bold text-gray-800">RecipeGen</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
            <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/promgen"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition duration-300"
              >
                genrate using pormpt
              </Link>
              <Link
                to="/picgen"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition duration-300"
              >
                generate using pic 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
