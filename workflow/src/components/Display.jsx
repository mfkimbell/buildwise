import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import { initialNodes, initialEdges } from "./nodes-edges.js";
import "reactflow/dist/style.css";

const elk = new ELK();

const useLayoutedElements = ({ config }) => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80,
    "elk.direction": "DOWN",
  };

  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  });

  return { getLayoutedElements };
};

const LayoutFlow = ({ config }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements(config);

 
  
  console.log(config, "config");

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-right">
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "DOWN",
            })
          }
        >
          vertical layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "RIGHT",
            })
          }
        >
          horizontal layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.radial",
            })
          }
        >
          radial layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.force",
            })
          }
        >
          force layout
        </button>
      </Panel>
    </ReactFlow>
  );
};

function Display({ config }) {
  
  return (
    <ReactFlowProvider>
      <LayoutFlow config={config} />
    </ReactFlowProvider>
  );
}

export default Display;
