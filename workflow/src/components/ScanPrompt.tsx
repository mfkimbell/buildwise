// import React, { useState } from "react";
// import Header from "./Header";
// import "../tailwind.css";
// import grabby from "../images/grabbyOcto.png";
// import { useNavigate } from "react-router-dom";
// import { useGlobal } from "../data/global-state";

// const ScanPrompt: React.FC = () => {
//   const { globalState, setGlobalState } = useGlobal();
//   const [inputValue, setInputValue] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   const fetchData = async () => {
//     const input = inputValue;
//     const options = {
//       method: "GET", // or 'POST', 'PUT', etc.
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // body: JSON.stringify(data), // Uncomment and add data if you need to send a body with the request
//     };

//     const response = await fetch(
//       `http://localhost:8000/repo-dependencies/${input}`,
//       options
//     );
//     console.log("RESPONSE", response);

//     // navigate("/scan-project");
//   };

//   // const fetchData = async () => {
//   //   try {
//   //     const input = inputValue;
//   //     const options = {
//   //       method: "GET", // or 'POST', 'PUT', etc.
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       // body: JSON.stringify(data), // Uncomment and add data if you need to send a body with the request
//   //     };
//   //     console.log("before fetch");
//   //     const response = await fetch(
//   //       `http://localhost:8000/repo-dependencies/${input}`,
//   //       options
//   //     );
//   //     console.log("after fetch");
//   //     console.log("response???", response);

//   //     if (response.ok) {
//   //       const json = await response.json();

//   //       let graphData = json;
//   //       console.log("graphData: ", graphData);
//   //       let nodes: any;
//   //       let edges: any;
//   //       if (
//   //         graphData &&
//   //         graphData.text &&
//   //         typeof graphData.text.content === "string"
//   //       ) {
//   //         // Log the content to see if it's a proper JSON string
//   //         console.log("Content string:", graphData.text.content);

//   //         try {
//   //           // Parse the JSON string in the content property
//   //           const contentObject = JSON.parse(graphData.text.content);
//   //           nodes = contentObject.initialNodes;
//   //           edges = contentObject.initialEdges;
//   //           setGlobalState((prevState) => ({
//   //             ...prevState,
//   //             nodes: nodes,
//   //             edges: edges,
//   //           }));

//   //           // Log the extracted values
//   //           console.log("Reported nodes prompt:", nodes);
//   //           console.log("Reported edges prompt:", edges);
//   //         } catch (e) {
//   //           console.error("Parsing error:", e);
//   //           // If parsing fails, it might be due to incorrect string format.
//   //           // You might need to preprocess the string to remove line breaks and extra quotes.
//   //         }
//   //       }

//   //       // Navigate with state
//   //       // navigate("/new-project");
//   //     } else {
//   //       console.error("Response was not ok.", response);
//   //     }
//   //   } catch (error) {
//   //     console.error(`Error occurred: ${error}`);
//   //   }
//   // };

//   // const handleSubmit = (event: React.FormEvent) => {
//   //   // event.preventDefault();
//   //   // fetchData(); // Call the async function and navigate upon completion
//   //   // console.log(inputValue);
//   //   // setInputValue(""); // Optionally reset input value
//   //   console.log("eventually, this will scan a github project");
//   // };

//   return (
//     <div className="w-full h-screen flex flex-col bg-[#0D0D0D]">
//       <Header title="BuildWise" />
//       <div className="flex-grow flex flex-col items-center justify-center text-center text-white relative">
//         <div className="relative inline-block">
//           <h1 className="text-7xl font-bold mb-4">BuildWise</h1>
//           <img
//             src={grabby}
//             alt="Description"
//             className="absolute top-15 right-0 w-[45vh] -translate-y-full translate-x-1/2"
//             style={{ zIndex: 10 }}
//           />
//         </div>
//         <p className="text-2xl mb-6">Your Automated Architecture Visualizer</p>
//         <p className="mb-8">Paste your github repository link</p>
//         <form className="flex flex-col items-center gap-4" onSubmit={fetchData}>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="text-black w-80 p-2 rounded"
//             placeholder="Enter project details..."
//           />
//           <button
//             type="submit"
//             className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-5 rounded cursor-pointer w-40"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       {/* Footer could go here */}
//     </div>
//   );
// };

// export default ScanPrompt;

import React, { useState } from "react";
import Header from "./Header";
import "../tailwind.css";
import grabby from "../images/grabbyOcto.png";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../data/global-state";

const ScanPrompt: React.FC = () => {
  const { globalState, setGlobalState } = useGlobal();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchData = async () => {
    try {
      const input = inputValue;
      const options = {
        method: "GET", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data), // Uncomment and add data if you need to send a body with the request
      };

      const response = await fetch(
        `http://localhost:8000/repo-dependencies/${input}`,
        options
      );
      console.log("RESPONSE", response);
      if (response.ok) {
        const json = await response.json();

        let graphData = json;
        console.log("graphData: ", graphData);
        let nodes: any;
        let edges: any;
        if (graphData) {
          // Log the content to see if it's a proper JSON string
          console.log("nodes", graphData.initialNodes);
          console.log("edges", graphData.initialEdges);
          nodes = graphData.initialNodes;
          edges = graphData.initialEdges;

          setGlobalState((prevState) => ({
            ...prevState,
            nodes: nodes,
            edges: edges,
          }));

          // Log the extracted values
          console.log("Reported nodes prompt:", nodes);
          console.log("Reported edges prompt:", edges);
        }

        // Navigate with state
        navigate("/new-project");
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

export default ScanPrompt;
