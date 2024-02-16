import React from "react";
import { Handle, Position } from "react-flow-renderer";

interface CircleNodeData {
  label: string; // Assuming 'data' includes at least a 'label'
}

interface CircleNodeProps {
  data: CircleNodeData;
  id: string;
}

const CircleNode: React.FC<CircleNodeProps> = ({ data, id }) => {
  return (
    <div className="circleNode">
      {/* Optional: Display the label if needed */}
      <div>{data.label}</div>

      {/* Always render these handles for a CircleNode */}
      <Handle type="target" position={Position.Top} id={`${id}.top`} />
      <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />
    </div>
  );
};

export default CircleNode;
