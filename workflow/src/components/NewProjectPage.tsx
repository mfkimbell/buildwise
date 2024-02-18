import React, { useState } from "react";
import "reactflow/dist/style.css";
import Header from "./Header";
import CustomNode from "./CustomNode";
import Button from "@mui/material/Button";
import Display from "./Display";

const NewProjectPage: React.FC = () => {
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false);
  const [layoutOptions, setLayoutOptions] = useState({});

  const toggleSidePanel = () => {
    setIsSidePanelCollapsed(!isSidePanelCollapsed);
  };

  const applyVerticalLayout = () => {
    setLayoutOptions({
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
    });
  };

  const applyHorizontalLayout = () => {
    setLayoutOptions({
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
    });
  };

  // Button dimensions
  const buttonWidth = "40px"; // Width of the button in pixels

  return (
    <div className="w-full h-screen flex flex-col bg-[#0D0D0D]">
      <Header title="BuildWise" />
      <div className="flex flex-1 overflow-hidden">
        <div
          id="side-panel"
          className={`relative flex text-white bg-[#171717] p-4 transition-width duration-300 ${
            isSidePanelCollapsed ? `w-[${buttonWidth}]` : "w-1/4"
          }`}
          style={{ height: "calc(100vh - 3.3rem)" }}
        >
          <div
            className={`flex-grow transition-opacity duration-300 ${
              isSidePanelCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            {!isSidePanelCollapsed && (
              <div className="w-full flex flex-col">
                <div className="border border-white/20">
                  <h2 className="text-lg font-semibold mb-2 ml-2">
                    Restructure
                  </h2>
                  <div className="flex flex-col space-y-2 ml-2 mr-2 mb-2">
                    <button onClick={applyVerticalLayout}>Vertical</button>
                    <button onClick={applyHorizontalLayout}>Horizontal</button>
                    <button
                      className="text-sm bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                      onClick={toggleSidePanel}
                    >
                      Radial
                    </button>
                    <button
                      className="text-sm bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                      onClick={toggleSidePanel}
                    >
                      Force
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MUI Button positioned absolutely to be centered and unaffected by panel content */}
          <Button
            variant="contained"
            onClick={toggleSidePanel}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              maxWidth: "0.5em",
              minWidth: "0.5em",
              opacity: 0.7, // Adjust for desired opacity
              backgroundColor: "grey",
              "&:hover": {
                backgroundColor: "darkgrey",
                opacity: 1, // Full opacity on hover
              },
            }}
          >
            {isSidePanelCollapsed ? ">" : "<"}
          </Button>
        </div>

        <div
          id="flow-render"
          className="flex-grow"
          style={{ height: "calc(100vh - 3.3rem)" }}
        >
          <Display layoutOptions={layoutOptions} />
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
