import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

// Define the type for the image map to ensure type safety
interface ImageMap {
  [key: string]: string;
}

// Array of technology names
const techNames = ["docker", "kubernetes", "aws", "react"];

// Dynamically build the image map from the techNames array
const imageMap: ImageMap = techNames.reduce((acc, name) => {
  acc[name] = `${process.env.PUBLIC_URL}tech_images/${name}.png`;
  return acc;
}, {} as ImageMap);

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  // Safely access the image path based on data.imgKey, falling back to an empty string if not found
  const imagePath =
    data.imgKey in imageMap ? imageMap[data.imgKey as keyof ImageMap] : "";

  return (
    <div
      className="bg-[#171717] text-white border border-white/20 rounded flex flex-col items-center justify-center p-1"
      style={{ width: "5em", height: "5em" }}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      {imagePath && (
        <img
          src={imagePath}
          alt={data.imgKey}
          style={{ maxWidth: "70%", maxHeight: "70%" }}
        />
      )}
      <div
        className="text-center overflow-hidden"
        style={{
          fontSize: "clamp(0.5rem, 1vw, 0.7rem)",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          marginTop: "0.5em",
        }}
      >
        {data?.label}
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default React.memo(CustomNode);
