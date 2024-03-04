import React, { useEffect, useRef } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface ImageMap {
  [key: string]: string;
}

const techNames = [
  "docker",
  "kubernetes",
  "aws",
  "react",
  "mongodb",
  "openai",
  "fastapi",
];

const imageMap: ImageMap = techNames.reduce((acc, name) => {
  acc[name] = `${process.env.PUBLIC_URL}/tech_images/${name}.png`;
  return acc;
}, {} as ImageMap);

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  const imagePath =
    data.imgKey in imageMap ? imageMap[data.imgKey as keyof ImageMap] : "";

  useEffect(() => {
    const adjustFontSize = () => {
      const textElement = textRef.current;
      if (!textElement) return;

      // Constants for font size adjustments
      const maxFontSize = 14; // Maximum font size in pixels
      const minFontSize = 10; // Minimum font size in pixels
      const scalingFactor = 0.1; // Adjust this to control how aggressive the scaling is

      let fontSize = maxFontSize;
      textElement.style.fontSize = `${fontSize}px`;

      // Adjust the font size based on the text length and parent width, with limits
      const parentWidth = textElement.parentElement?.offsetWidth ?? 0;
      const textWidth = textElement.scrollWidth;
      if (textWidth > parentWidth) {
        // Calculate new font size if text overflows
        fontSize = Math.max(
          minFontSize,
          parentWidth / (textWidth * scalingFactor)
        );
      } else {
        // Use a scaled font size for short texts, not exceeding the max font size
        fontSize = Math.min(maxFontSize, fontSize);
      }

      // Apply the calculated font size, ensuring it's within the min-max range
      fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize));
      textElement.style.fontSize = `${fontSize}px`;
    };

    adjustFontSize();
    // Re-run adjustment when the window resizes or the label changes
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [data.label]); // Dependency on label to adjust for content changes

  return (
    <div
      className="bg-[#171717] text-white border border-white/20 rounded flex flex-col items-center justify-center p-1"
      style={{ width: "100px", height: "100px" }} // Set a specific size or keep it flexible
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
        ref={textRef}
        className="text-center"
        style={{
          marginTop: "0.5em",
          width: "90%", // Leave some margin
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
