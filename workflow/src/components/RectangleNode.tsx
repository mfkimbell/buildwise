import React from "react";
import { Handle, Position } from "react-flow-renderer";

interface RectangleNodeData {
  label: string; // Assuming 'data' includes at least a 'label'
}

interface RectangleNodeProps {
  data: RectangleNodeData;
  id: string;
}

const RectangleNode: React.FC<RectangleNodeProps> = ({ data, id }) => {
  return (
    <div className="rectangleNode">
      {/* Optional: Display the label if needed */}
      <div>{data.label}</div>

      {/* Always render these handles for a RectangleNode */}
      <Handle type="target" position={Position.Top} id={`${id}.top`} />
      <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />
    </div>
  );
};

export default RectangleNode;
