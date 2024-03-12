import React, { useEffect, useCallback, useRef } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import "reactflow/dist/style.css";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  updateEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import { initialNodes, initialEdges } from "../data/nodes-edges-arch";

import { useGlobal } from "../data/global-state"; 



function Display({ layoutOptions, graphData, handleEdgeClick }) {


 

  return (
    <ReactFlowProvider>
      <LayoutFlow
        layoutOptions={layoutOptions}
        graphData={graphData}
        handleEdgeClick={handleEdgeClick}
      />
    </ReactFlowProvider>
  );
}

const edgeTypes = {
  customEdge: CustomEdge,
};

const nodeTypes = {
  custom: CustomNode,
};

const elk = new ELK();

const augmentEdgesWithClickHandler = (edges, handleClick) => {
  console.log("edges", edges);
  return edges.map((edge) => ({
    ...edge,
    data: {
      ...edge.data,
      handleEdgeClick: handleClick,
    },
  }));
};

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80,
    "elk.direction": "DOWN",
  };

  const getLayoutedElements = useCallback(
    (options) => {
      const layoutOptions = { ...defaultOptions, ...options };
      const graph = {
        id: "root",
        layoutOptions,
        children: getNodes(),
        edges: getEdges(),
      };

      elk.layout(graph).then(({ children }) => {
        children.forEach((node) => {
          node.position = { x: node.x, y: node.y };
        });

        setNodes(children);
        window.requestAnimationFrame(() => {
          fitView();
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getNodes, getEdges, setNodes, fitView]
  );

  return { getLayoutedElements };
};

const LayoutFlow = ({ layoutOptions, graphData, handleEdgeClick }) => {
  const { globalState, setGlobalState } = useGlobal();
  const { nodes: initialNodes, edges: initialEdges } = globalState;

  if (graphData && typeof graphData.text === "object") {
    // console.log("ContentAAA:", graphData.text.content);
  }

  let initialNodes2;
  let initialEdges2;

  // Log the entire object to check its structure
  // console.log("graphData.text:", graphData.text);

  if (
    graphData &&
    graphData.text &&
    typeof graphData.text.content === "string"
  ) {
    // Log the content to see if it's a proper JSON string
    // console.log("Content string:", graphData.text.content);

    try {
      // Parse the JSON string in the content property
      const contentObject = JSON.parse(graphData.text.content);
      initialNodes2 = contentObject.initialNodes;
      initialEdges2 = contentObject.initialEdges;

      // Log the extracted values
      // console.log("Extracted Initial Nodes:", initialNodes2);
      // console.log("Extracted Initial Edges:", initialEdges2);
    } catch (e) {
      console.error("Parsing error:", e);
      // If parsing fails, it might be due to incorrect string format.
      // You might need to preprocess the string to remove line breaks and extra quotes.
    }
  }
  // console.log("initialNodes: ", initialNodes);
  // console.log("initialNodes2: ", initialNodes2);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);

  // console.log("initialNodes: ", initialEdges);
  // console.log("initialNodes2: ", initialEdges2);

  // Augment initial edges with the handleEdgeClick function
  const augmentedEdges = augmentEdgesWithClickHandler(
    initialEdges,
    handleEdgeClick
  );

  // Initialize edges state with augmented edges
  const [edges, setEdges, onEdgesChange] = useEdgesState(augmentedEdges);
  const { getLayoutedElements } = useLayoutedElements();
  const edgeUpdateSuccessful = useRef(true);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, type: "customEdge" }, eds)
      ),
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  useEffect(() => {
    getLayoutedElements(layoutOptions);
  }, [layoutOptions, getLayoutedElements]);

  return (
    <div className="bg-black w-full h-full border border-b border-white/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="top-right"
      />
    </div>
  );
};

export default Display;
