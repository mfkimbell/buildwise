import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import CustomNode from "./CustomNode";

// import { initialNodes, initialEdges } from "./nodes-edges.js";
import "reactflow/dist/style.css";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "AWS", imgKey: "aws" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "React", imgKey: "react" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Kubernetes", imgKey: "kubernetes" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    type: "custom",
    data: { label: "Docker", imgKey: "docker" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e1-4", source: "3", target: "4", animated: true },
];

const elk = new ELK();

const useLayoutedElements = () => {
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

const LayoutFlow = ({ layoutOptions }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements();

  useEffect(() => {
    // Call the function to apply the layout with the current layoutOptions
    getLayoutedElements(layoutOptions);
  }, [layoutOptions]);

  return (
    <div className="bg-black w-full h-full border border-b border-white/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
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
    </div>
  );
};

function Display({ layoutOptions }) {
  return (
    <ReactFlowProvider>
      <LayoutFlow layoutOptions={layoutOptions} />
    </ReactFlowProvider>
  );
}

export default Display;
