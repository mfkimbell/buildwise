import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt: React.MouseEvent) => {
    evt.stopPropagation(); // Prevents the event from bubbling up
    // Custom action when the edge is clicked
    console.log("event", data);
    console.log("edge clicked");
    console.log("fn", data.handleEdgeClick);
    data.handleEdgeClick(data);
    // Here you can add any custom logic you want to execute when the edge is clicked
  };

  return (
    <g onClick={onEdgeClick}>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {/* You can include other SVG elements here if needed, such as custom labels or markers */}
    </g>
  );
}
