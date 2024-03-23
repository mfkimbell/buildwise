# buildwise


Buildwise
An AI automated devops architecture visualizer. It's a React webapp that either accepts a Github repository link or a manual description of a project. It then prompts OpenAI API to create a graph in the format required by custom edges and nodes from ReactFlow. The graph is then visualized and can be edited as well as interacted with to learn more about how to project connects.

## Tools Used
* `OpenAI` For automatic generation of graphs based on user input
* `Docker` Containerization of the backend and frontend
* `TailwindCSS` Inline CSS tool
* `TypeScript` Typesafety for javascript
* `ReactFlow` Creation and display of the custom nodes and edges
* `ReactRouter` Rendering various pages
* `FASTapi` Creating an api
* `Uvicorn` Hosting the webserver that runs the API
* `Dotenv` Secret managment (openAI and github token)
* `ElkJS` Reoganizing the graph/nodes

## Homepage
<img width="1515" alt="Screenshot 2024-03-23 at 1 07 53 PM" src="https://github.com/mfkimbell/buildwise/assets/107063397/d67b9924-3ab3-4948-b41e-4ec3c9b637da">

## AI graph generation
Users can write a description of their project and a call to OpenAI will attempt to create a template close to the current projected project
<img width="732" alt="Screenshot 2024-03-23 at 1 08 04 PM" src="https://github.com/mfkimbell/buildwise/assets/107063397/ebd29acb-5ea5-4cd4-8138-6601c8e48cee">

## Flexibility
Even if the project isn't perfectly mapped, users can easily adjust the graph in a UI friendly way. 

https://github.com/mfkimbell/buildwise/assets/107063397/b3dc6108-d802-4a35-83ed-25ec93eb75ec

## Reorganization
Users can map their graph based on 4 different mapping strategies

https://github.com/mfkimbell/buildwise/assets/107063397/9d171e01-ce74-4698-b50a-2e09f0f03ac8

## Connections
ChatGPT will also autopopulate the connections between nodes for clarification. Connections can be seen in the sidebar by clicking on them. 

https://github.com/mfkimbell/buildwise/assets/107063397/5d4aa72c-a528-400f-9c71-6fb5548b5846

## Existing project option
Currently, if you plug an existing project with the github url, it will build a map based on the project dependencies. However, I might change how this works in the future. 
<img width="1515" alt="Screenshot 2024-03-23 at 1 20 20 PM" src="https://github.com/mfkimbell/buildwise/assets/107063397/7e046114-e925-4f86-a152-29a655b5a214">



