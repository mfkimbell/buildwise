export const initialNodes = [
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

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how AWS connects to React>",
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how AWS connects to Kubernetes>",
    },
  },
  {
    id: "e1-4",
    source: "3",
    target: "4",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how Kubernetes connects to Docker>",
    },
  },
];
