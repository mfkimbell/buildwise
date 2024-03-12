import React, { useState } from "react";
import "reactflow/dist/style.css";
import Header from "./Header";
import Button from "@mui/material/Button";
import Display from "./Display";
import { useGlobal } from "../data/global-state";

const NewProjectPage: React.FC = () => {
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false);
  const [layoutOptions, setLayoutOptions] = useState({});
  const [content, setContent] = useState("");
  const { globalState, setGlobalState } = useGlobal();
  const updateState = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      exampleField: "New Value",
    }));
  };

  console.log("global-state", globalState);

  const handleEdgeClick = (content: any) => {
    console.log("Content: ", content.connection);
    setContent(content.connection);
  };

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
  const applyRadialLayout = () => {
    setLayoutOptions({
      "elk.algorithm": "org.eclipse.elk.radial",
    });
  };

  const applyForceLayout = () => {
    setLayoutOptions({
      "elk.algorithm": "org.eclipse.elk.force",
    });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#0D0D0D]">
      <Header title="BuildWise" />
      <div className="flex flex-1 overflow-hidden">
        <div
          id="side-panel"
          className={`relative flex text-white bg-[#171717] p-4 transition-width duration-300 ${
            isSidePanelCollapsed ? "w-5" : "w-1/4"
          }`}
          style={{ height: "calc(100vh - 3.3rem)" }}
        >
          <div
            className={`flex-grow transition-opacity duration-300 ${
              isSidePanelCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            {!isSidePanelCollapsed && (
              <>
                <div className="w-full flex flex-col">
                  <div
                    className="border border-white/20"
                    style={{
                      maxHeight: "calc(50vh - 4rem)",
                      overflowY: "auto",
                    }}
                  >
                    <h2 className="text-lg font-semibold mb-2 ml-2">
                      Layout Options
                    </h2>
                    <div className="flex flex-col space-y-2 ml-2 mr-2 mb-2">
                      <button
                        onClick={applyVerticalLayout}
                        className="text-sm bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Vertical
                      </button>
                      <button
                        onClick={applyHorizontalLayout}
                        className="text-sm bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Horizontal
                      </button>
                      <button
                        className="text-sm bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                        onClick={applyRadialLayout}
                      >
                        Radial
                      </button>
                      <button
                        className="text-sm bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
                        onClick={applyForceLayout}
                      >
                        Force
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col pt-4">
                  <div
                    className="border border-white/20 "
                    style={{
                      maxHeight: "calc(50vh - 4rem)",
                      overflowY: "auto",
                    }}
                  >
                    <h2 className="text-lg font-semibold mb-2 ml-2 ">
                      Connection
                    </h2>
                    <div>
                      Current State: {globalState.exampleField}
                      <button onClick={updateState}>Update State</button>
                    </div>
                    <div
                      id="content"
                      className="flex flex-col space-y-2 ml-2 mr-2 mb-2"
                      style={{
                        overflowWrap: "break-word",
                      }}
                    >
                      {content}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            variant="contained"
            onClick={toggleSidePanel}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              width: "16px",
              minWidth: "16px",
              height: "32px",
              padding: "0",
              opacity: 0.7,
              backgroundColor: "grey",
              "&:hover": {
                backgroundColor: "darkgrey",
                opacity: 1,
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
          <Display
            layoutOptions={layoutOptions}
            graphData=""
            handleEdgeClick={handleEdgeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
