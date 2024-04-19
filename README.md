<h1>Functionality Overview</h1>
This React application is designed to perform two main functions: menu extraction from text and visualization using ReactFlow.

<h2>Menu Extraction</h2>
The application provides users with a text area where they can paste text containing potential menu structures. Upon clicking the "Extract" button, the application uses regular expressions to identify menu items formatted as `\<number\>. \<Menu Text\>` . It then processes the input text, extracts valid menu items, and displays them in a structured format in the left panel. If no valid menu items are found, a message stating "No valid menu items found" is displayed.

<h2>ReactFlow Visualization</h2>
The extracted menu items are visualized using ReactFlow in the center panel of the application. Each menu item is represented as a node on the canvas. Users can interact with these nodes by performing various actions:

### Adding Nodes
Users can click the "**Add Node**" button to add a new node to the canvas at a random position.

### Deleting Nodes
By selecting a node and clicking the "**Delete Node**" button, users can remove the selected node from the canvas.

### Duplicating Nodes
Users can duplicate a selected node by clicking the "**Duplicate Node**" button, creating a copy of the selected node positioned next to it.

### Updating Node Properties
The application provides controls to update node properties such as name and background color. Users can input a new name for the node and select a background color from a color picker.

