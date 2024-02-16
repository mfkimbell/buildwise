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
            {!isSidePanelCollapsed && <div>"Etymology

Goat-herding in Spain.

Goats in Ağrı Mountain, Turkey.
The Modern English word goat comes from Old English gāt "she-goat, goat in general", which in turn derives from Proto-Germanic *gaitaz (cf. Dutch/Frisian/Icelandic/Norwegian geit, German Geiß, and Gothic gaits), ultimately from Proto-Indo-European *ǵʰaidos meaning "young goat" (cf. Latin haedus "kid").[5] To refer to the male goat, Old English used bucca (cf. Dutch/Frisian bok and giving modern buck) until ousted by hegote, hegoote in the late 12th century. Nanny goat (females) originated in the 18th century, and billy goat (for males) originated in the 19th century.[citation needed]

Female goats are referred to as does or nannies, intact males are called bucks or billies, and juvenile goats of both sexes are called kids. Castrated males are called wethers. While the words hircine and caprine both refer to anything having a goat-like quality, hircine is used most often to emphasize the distinct smell of domestic goats.

History
Main article: Evolution of domestic goats

Horn cores from the Neolithic village of Atlit Yam
Goats are among the earliest animals domesticated by humans.[6] The most recent genetic analysis[7] confirms the archaeological evidence that the wild bezoar ibex of the Zagros Mountains is the likely original ancestor of probably all domestic goats today.[6]


Skeleton (Capra hircus)
Neolithic farmers began to herd wild goats primarily for easy access to milk and meat, as well as to their dung, which was used as fuel; and their bones, hair, and sinew were used for clothing, building, and tools.[1] The earliest remnants of domesticated goats dating 10,000 years Before Present are found in Ganj Dareh in Iran.[8] Goat remains have been found at archaeological sites in Jericho, Choga Mami,[9] Djeitun, and Çayönü, dating the domestication of goats in Western Asia at between 8,000 and 9,000 years ago.[6]

Studies of DNA evidence suggests 10,000 years ago as the domestication date.[7]

Historically, goat hide has been used for water and wine bottles in both traveling and transporting wine for sale. It has also been used to produce parchment.[citation needed]"</div>}
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
