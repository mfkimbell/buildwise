import React, { useState } from "react";
import Header from "./Header";
import "../tailwind.css";
import grabby from "../images/grabbyOcto.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";

const SendPrompt: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchData = async () => {
    try {
      const postData = { data: inputValue };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };

      const response = await fetch(
        "http://localhost:8000/api/testgpt",
        options
      );
      if (response.ok) {
        const json = await response.json();
        // Navigate with state
        navigate("/new-project", { state: { graphData: json } });
      } else {
        console.error("Response was not ok.", response);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData(); // Call the async function and navigate upon completion
    console.log(inputValue);
    setInputValue(""); // Optionally reset input value
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#0D0D0D]">
      <Header title="BuildWise" />
      <div className="flex-grow flex flex-col items-center justify-center text-center text-white relative">
        <div className="relative inline-block">
          <h1 className="text-7xl font-bold mb-4">BuildWise</h1>
          <img
            src={grabby}
            alt="Description"
            className="absolute top-15 right-0 w-[45vh] -translate-y-full translate-x-1/2"
            style={{ zIndex: 10 }}
          />
        </div>
        <p className="text-2xl mb-6">Your Automated Architecture Visualizer</p>
        <p className="mb-8">Enter your project details below</p>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-black w-80 p-2 rounded"
            placeholder="Enter project details..."
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-5 rounded cursor-pointer w-40"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Footer could go here */}
    </div>
  );
};

export default SendPrompt;
