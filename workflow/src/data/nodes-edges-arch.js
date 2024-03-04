export const initialNodes = [
  {
    id: "react",
    type: "custom",
    data: { label: "React", imgKey: "react" },
    position: { x: 250, y: 5 },
    isConnectable: true,
  },
  {
    id: "mongodb",
    type: "custom",
    data: { label: "MongoDB", imgKey: "mongodb" },
    position: { x: 100, y: 100 },
    isConnectable: true,
  },
  {
    id: "docker",
    type: "custom",
    data: { label: "Docker", imgKey: "docker" },
    position: { x: 400, y: 100 },
    isConnectable: true,
  },
  {
    id: "docker2",
    type: "custom",
    data: { label: "Docker", imgKey: "docker" },
    position: { x: 400, y: 200 },
    isConnectable: true,
  },
  {
    id: "openai",
    type: "custom",
    data: { label: "OpenAI", imgKey: "openai" },
    position: { x: 400, y: 200 },
    isConnectable: true,
  },
  {
    id: "fastapi",
    type: "custom",
    data: { label: "FastAPI", imgKey: "fastapi" },
    position: { x: 400, y: 200 },
    isConnectable: true,
  },
  {
    id: "docker3",
    type: "custom",
    data: { label: "Docker", imgKey: "docker" },
    position: { x: 400, y: 200 },
    isConnectable: true,
  },
];

export const initialEdges = [
  // {
  //   id: "e1-2",
  //   source: "react",
  //   target: "react",
  //   type: "customEdge",
  //   animated: true,
  //   data: {
  //     connection: "<description about how AWS connects to React>",
  //   },
  // },
  {
    id: "e1-3",
    source: "react",
    target: "docker",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how AWS connects to Kubernetes>",
    },
  },
  {
    id: "e1-4",
    source: "mongodb",
    target: "docker2",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how Kubernetes connects to Docker>",
    },
  },
  {
    id: "e1-5",
    source: "mongodb",
    target: "openai",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how Kubernetes connects to Docker>",
    },
  },
  {
    id: "e1-6",
    source: "react",
    target: "mongodb",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how Kubernetes connects to Docker>",
    },
  },
  {
    id: "e1-7",
    source: "react",
    target: "fastapi",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how Kubernetes connects to Docker>",
    },
  },
  {
    id: "e1-8",
    source: "fastapi",
    target: "docker3",
    type: "customEdge",
    animated: true,
    data: {
      connection: "<description about how Kubernetes connects to Docker>",
    },
  },
];
