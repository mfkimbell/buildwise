import React from "react";
import { Handle, Position } from "react-flow-renderer";

interface RhombusNodeData {
  label: string; // Assuming 'data' includes at least a 'label'
}

interface RhombusNodeProps {
  data: RhombusNodeData;
  id: string;
}

const RhombusNode: React.FC<RhombusNodeProps> = ({ data, id }) => {
  return (
    <div className="rhombusNode">
      {/* Optional: Display the label if needed */}
      <div>{data.label}</div>

      {/* Always render these handles for a RhombusNode */}
      <Handle type="target" position={Position.Top} id={`${id}.top`} />
      <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />
    </div>
  );
};

export default RhombusNode;
