import React, { useState, useCallback, useEffect, useRef } from "react";
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

try {
  const postData = { data: "give me some names for cats" };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData), // Correctly stringify the JSON object
  };

  const response = await fetch("http://localhost:8000/api/testgpt", options);
  console.log("here");
  console.log("response", response);

  if (response.ok) {
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const json = await response.json();
      console.log("json", json);
    } else {
      console.error("Response was not JSON.");
    }
  } else {
    console.error("Response was not ok.", response);
  }
} catch (error) {
  console.error(`Error occurred: ${error}`);
}

function Display({ layoutOptions, handleEdgeClick }) {
  return (
    <ReactFlowProvider>
      <LayoutFlow
        layoutOptions={layoutOptions}
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

const LayoutFlow = ({ layoutOptions, handleEdgeClick }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);

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
