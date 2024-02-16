import React, { useState, useCallback } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";
import Header from "./Header";
import CustomNode from "./CustomNode";
import Button from "@mui/material/Button"; // Import MUI Button component

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  {
    id: "4",
    type: "custom",
    data: { label: "Custom Node" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];

const nodeTypes = {
  custom: CustomNode,
};

const ScanProjectPage: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const toggleSidePanel = () => {
    setIsSidePanelCollapsed(!isSidePanelCollapsed);
  };

  // Button dimensions
  const buttonWidth = "40px"; // Width of the button in pixels
  const buttonHeight = "40px"; // Height of the button in pixels

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
              <div>
                "Etymology Goat-herding in Spain. Goats in Ağrı Mountain,
                Turkey. The Modern English word goat comes from Old English gāt
                "she-goat, goat in general", which in turn derives from
                Proto-Germanic *gaitaz (cf. Dutch/Frisian/Icelandic/Norwegian
                geit, German Geiß, and Gothic gaits), ultimately from
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
          className="flex-grow border border-white/20"
          style={{ height: "calc(100vh - 3.3rem)" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="w-full h-full"
          >
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default ScanProjectPage;
