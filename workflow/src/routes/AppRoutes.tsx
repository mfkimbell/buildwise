import React from "react";
import { Route, Routes } from "react-router-dom"; // Note "Routes" instead of "Switch"
import HomePage from "../components/HomePage";
import ScanProjectPage from "../components/ScanProjectPage";
import NewProjectPage from "../components/NewProjectPage";
import SendPrompt from "../components/SendPromp";
import ScanPrompt from "../components/ScanPrompt";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan-project" element={<ScanProjectPage />} />
      <Route path="/new-project" element={<NewProjectPage />} />
      <Route path="/send-prompt" element={<SendPrompt></SendPrompt>} />
      <Route path="/scan-prompt" element={<ScanPrompt></ScanPrompt>} />
    </Routes>
  );
};

export default AppRoutes;
