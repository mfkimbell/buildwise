import ELK from "elkjs";
import { initialNodes, initialEdges } from "./nodes-edges";
const elk = new ELK();
const elkLayout = () => {
  const nodesForElk = initialNodes.map((node) => {
    return {
      id: node.id,
      width: node.type === "rectangleNode" ? 70 : 50,
      height: node.type === "rhombusNode" ? 70 : 50,
    };
  });
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "nodePlacement.strategy": "SIMPLE",
    },
    children: nodesForElk,
    edges: initialEdges,
  };
  return elk.layout(graph);
};
export default elkLayout;
