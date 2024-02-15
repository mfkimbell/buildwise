// HomePage.tsx
import React from "react";
import Header from "./Header"; // Adjust the import path as necessary

const Test: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#171717" }} className="w-full h-screen">
      <Header
        title="Workflow"
        subtitle="Explore our site to learn more about what we offer. We're glad you're here."
      />
      {/* Add more content or components here as needed */}
    </div>
  );
};

export default Test;
