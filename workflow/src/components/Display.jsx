import React, { useState, useCallback, useEffect, useRef } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import "reactflow/dist/style.css";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  updateEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";

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

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "AWS", imgKey: "aws" },
    position: { x: 250, y: 5 },
    isConnectable: true,
  },
  {
    id: "2",
    type: "custom",
    data: { label: "React", imgKey: "react" },
    position: { x: 100, y: 100 },
    isConnectable: true,
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Kubernetes", imgKey: "kubernetes" },
    position: { x: 400, y: 100 },
    isConnectable: true,
  },
  {
    id: "4",
    type: "custom",
    data: { label: "Docker", imgKey: "docker" },
    position: { x: 400, y: 200 },
    isConnectable: true,
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "customEdge",
    animated: true,
    data: {
      connection: "AWS connects to Docker",
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "customEdge",
    animated: true,
    data: {
      connection: "AWS connects to Kubernetes",
    },
  },
  {
    id: "e1-4",
    source: "3",
    target: "4",
    type: "customEdge",
    animated: true,
    data: {
      connection: "AWS connects to Third",
    },
  },
];

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
    [getNodes, setNodes, getEdges, fitView]
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

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

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
