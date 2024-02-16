import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ScanProjectPage from "./ScanProjectPage";
import NewProjectPage from "./NewProjectPage";
import Header from "./Header";
import "../tailwind.css";
import grabby from "../images/grabbyOcto.png";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-[#0D0D0D]">
      <Header
        title="BuildWise"
      />
      <div className="flex-grow flex flex-col items-center justify-center text-center text-white relative">
        {/* Container for BuildWise and Image */}
        <div className="relative inline-block">
          {" "}
          {/* Use inline-block for minimal width */}
          <h1 className="text-7xl font-bold mb-4">BuildWise</h1>
          <img
            src={grabby}
            alt="Description"
            className="absolute top-15 right-0 w-[45vh] -translate-y-full translate-x-1/2" // Tailwind CSS for positioning
            style={{ zIndex: 10 }} // Inline style for z-index
          />
        </div>
        <p className="text-2xl mb-6">Your Automated Architecture Visualizer</p>
        <p className="mb-8">Please select one of the following options</p>
        <div className="flex justify-center gap-4">
          <Link to="/scan-project">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-5 rounded cursor-pointer w-40">
              Scan Project
            </button>
          </Link>
          <Link to="/new-project">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-5 rounded cursor-pointer w-40">
              New Project
            </button>
          </Link>
        </div>
      </div>
      {/* Footer could go here */}
     
    </div>
  );
};

export default HomePage;
