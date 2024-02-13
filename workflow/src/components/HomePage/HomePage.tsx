// HomePage.tsx
import React from "react";
import Header from "../Header/Header"; // Adjust the import path as necessary
import SignIn from "../SignIn/SignIn"
const HomePage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#171717" }} className="w-full h-screen">
      <Header
        title="Workflow"
        subtitle="Explore our site to learn more about what we offer. We're glad you're here."
		  />
		  <SignIn></SignIn>
		  
      {/* Add more content or components here as needed */}
    </div>
  );
};

export default HomePage;
