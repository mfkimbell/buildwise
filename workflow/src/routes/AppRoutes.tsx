import React from "react";
import { Route, Routes } from "react-router-dom"; // Note "Routes" instead of "Switch"
import HomePage from "../components/HomePage";
import ScanProjectPage from "../components/ScanProjectPage";
import NewProjectPage from "../components/NewProjectPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
  
      <Route path="/" element={<HomePage />} />
      {/* Use "element" prop with JSX */}
      <Route path="/scan-project" element={<ScanProjectPage />} />
      <Route path="/new-project" element={<NewProjectPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
