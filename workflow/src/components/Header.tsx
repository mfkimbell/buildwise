import React from "react";
import logo from "../images/logo.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header
      style={{ minHeight: "3.2em", backgroundColor: "#171717" }}
      className="flex items-center justify-between border-b border-white/20 pl-3"
    >
      <div className="flex items-center justify-start">
        <img src={logo} alt="Logo" className="w-auto h-10 mr-3" />
        <h1 className="text-1xl font-bold text-white">{title}</h1>
      </div>
      <Link to="/">
        <button className="text-sm mr-3 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded">
          Home
        </button>
      </Link>
    </header>
  );
};

export default Header;
