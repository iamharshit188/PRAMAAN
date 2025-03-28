import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-2xl font-bold text-white">
              Praman
            </Link>
            <p className="text-sm text-blue-100">AI-Powered Financial Insights</p>
          </div>
          
          <nav className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                ? 'text-white font-medium border-b-2 border-white pb-1' 
                : 'text-blue-100 hover:text-white hover:border-b-2 hover:border-blue-100 pb-1 transition-all'
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive 
                ? 'text-white font-medium border-b-2 border-white pb-1' 
                : 'text-blue-100 hover:text-white hover:border-b-2 hover:border-blue-100 pb-1 transition-all'
              }
            >
              About Me
            </NavLink>
            <a 
              href="https://github.com/iamharshit188/PRAMAAN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-white hover:border-b-2 hover:border-blue-100 pb-1 transition-all"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 