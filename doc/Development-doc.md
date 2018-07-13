# Development documentation

Table of contents:
* [Software architecture](#software-architecture)
* [Data model](#data-model)
* [File format](#file-format)
* [Functions](#functions)

## Software architecture

#### Custom source files
- HTML Files (in root dir ./)
  - `Design-dependencies.html`
  - `Open-graph.html`
- CSS Files (in ./dist)
  - `css_general.css`
  - `css_buttons_right.css`
  - `css_left_pane.css`
  - `css_pop_up.css`
  - `css_right_pane.css`
  - `css_onconetxt_menu.css`
- JS Files (in ./dist)
  - `main_configuration.js`
  - `left_pane.js`
  - `propagation.js`
  - `oncontext_menu_function.js`
  - `event_onclick.js`
  - `layout.js`
  - `graph.js`
  - `standardmodel.js`

### Used libraries

- Vis.js (in ./dist)
  - `vis.js`
  - `vis-network.min.css`
  - `vis-network.min.js`
- Jquery (in ./jquery)
  - `jquery-ui.min.css`
  - `jquery-1.12.4.js`
  - `jquery-ui.js`
- Dagre (in ./dagre-master/dist)
  - `dagre.js`
- Select2 (in ./select2)
  - `select2.min.css`
  - `select2.min.js`
- Highcharts (in ./highcharts)
  - `highcharts.js`
- Font awesome (in ./fontawesome)
  - `fontawesome-all.min.css`
  - `fontawesome-all.min.js`

##Data model
On start and by default, the script `main_configuation.js` loads the data contained in `./dist/standardmodel.js`. It contains two variables `nodes` and `edges`. `nodes` contains the set of nodes and each node has an id, a description, a label, and possibly one or more tags. `edges` contains the set of edges and each edge has an id, the id of the node “to” and the id of the node “from”, and a label (+ or -).

```
var nodes= [
	{ id:0, description: "Effort which needs to be applied in order to seperate two cpmponents in disassembly", shape: "ellipse", color: "rgba(60,60,60,0.6)", tags: [ ], font: {color:"#ffffff"}, label: "Disassembly effort" },
	{ id:1, description: "Force which needs to be applied in order to seperate two components", shape: "ellipse", color: "rgba(60,60,60,0.6)", tags: [ ], font:{color:"#ffffff"}, label: "Required force/energy" },
…
];

var edges = [
	{ id: 0, to: 0, from: 3, label: "+", color: "rgba(60,60,60,0.6)" },
	{ id: 1, to: 0, from: 2, label: "-", color: "rgba(60,60,60,0.6)" },
…
];
```
Proper loading of this data requires nodes ids being ordered like natural numbers [0,1,2,...]. That is, ids are integers and start at 0. It is the same for the edges id. When a node or an edge is deleted in the application, all ids are changed automatically. This is done in the `deleteNode()` and `deleteEdge()` functions (file `main_configuation.js`).

This data is loaded into the global variables `nodesDataset` and `edgesDataset`. Then, the function `redrawAll()` defines the variable data that groups nodesDataset and edgesDataset. The network is then created using the vis.js library as follows:

```
network = new vis.Network(container[0], data, options);
```

A view of `nodesDataset` and `edgesDataset` is then created into variables `allNodes` and `allEdges` which will be used for data manipulation.

```
allNodes=nodesDataset.get({returnType:"Object"});
```
> Object { _options: {}, _data: Object(126), length: 126, _fieldId: "id", _type: {}, _subscribers: {…} }

```
allEdges=edgesDataset.get({returnType:"Object"});
```
> Object(126) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]

Consequently, when modifying `nodesDataset` or `allNodes`, it is necessary to make an update to have the same data in the two variables. Same for `edgesDataset` and `allEdges`:

```
var updateArray = [];
for (var nodeId in allNodes) {
   if (allNodes.hasOwnProperty(nodeId)) {
   	updateArray.push(allNodes[nodeId]);
   }
}
nodesDataset.update(updateArray);

```
##File format
The application can load and save files in JSON format formated as follows:
```
{
	"nodes": [{
                "id": 0,
                "label": "short string",
                "description": "long string",
                "shape": "ellipse",
                "color": "rgba(80,80,80,0.6)",
                "tags": ["tag 1", "tag 2"]
            }, {
            ...
            }
        ]
	"edges": [{
                "id": 1,
                "from": 0,
                "to": 1,
                "label": "-"
            }, {
            ...
            }
        ]
```
## Functions

In `main_configuation.js`

| name | how it works |
|--------|--------|
|redrawAll() | Configuration function for the physical layout. In the options, definition of the node style, edges style, interaction, configure, physics, manipulation. See vis.js documentation for the options : http://visjs.org/docs/network/index.html?keywords=options#options. In manipulation, redefinition of the addNode, addEdge, editNode, editEdge, deleteNode and deleteEdge functions. Creation of the network. Calls listener() function.|
|listener()|on click on a node, in model analysis mode : calls the functions: neighbourhoodHighlight(params), openAttributePane(params), focusNode(params.nodes[0]). On doubleclick on the network: calls the function: addNodefunction(). On right click on a node or an edge: displays oncontext menu, different depending on the mode and whether it is a node or an edge. On esc key pressed: hides the pop up if some are open, and we reset the parameters. On delete key pressed, calls the function remove().|
|saveDrawingSurface(), restoreDrawingSurface(), selectNodesFromHighlight(), getStartToEnd(start, theLen)|Functions uses for the multiselection of nodes. All the selected nodes are in the nodesIdInDrawing variable. These functions use the ctx object to draw a rectangle in the canvas.|

In `left_pane.js`

| name | how it works |
|--------|--------|
|updateLeftPane()|This function is created for the research feature of the tool. It’s called everytime the dataset is modified. |
|edit_graph()|We set the edit_graph_active variable to true, we change the style of the buttons “edit graph” and “model analysis”, and we display the buttons “add node” and “add edge”.|
|model_analysis()|We set the model_analysis_active variable to true, we change the style of the buttons “edit graph” and “model analysis”, and we hide the buttons “add node” and “add edge”.|
|hideButton()|This function allows you to hide the buttons "add node" and "add edge" at the bottom left.|
|add_tag()|Allows you to update tags in the left pane when modifying or adding a node with new tags.|
|filterByTag()|This function will take the value of the selected tag(s) in the left pane and place them in the selectedTag variable. The tagFilterActive variable is set to true. We store the dataset in a temp variable. We store all the nodes that contain the tag in the nodeArray variable, then the nodes connected to them. We then modify the id of all the nodes present in nodeArray so that the ids follow each other. Same in edgeArray. Then we put the contents of nodeArray in nodesDataset and the content of edgeArray in edgesDataset. Finally we retrace the graph to see the graph filtered.|
|createTab()|This function creates an array of data that will allow you to draw the scatter plot graph when you click on "identify key parameters". Creating a first tab array that contains one row for each node. A line contains the label of the node, the number of nodes influenced and the number of nodes that influence it. Creation of a second array tab2 which groups on the same line all the labels of the nodes which are influenced and which influence the same number of nodes.|
|LocalStorage()|This function calls the createTab() function and uses sessionStorage to access tab2 in Open-graph.html.|
|reset_parameters()|This function is called when the reset button is pressed or when the esc key is pressed. It cancels the targets, the source and the propagation, closes the right panel. All nodes are visible.|

In `propagation.js`

| name | how it works |
|--------|--------|
|propagation(sourceId, targetId)|This function is recursive. The goal is to find all the path starting from a source node in the graph. If one or more target exist, it finds the path between the source node and the target. The result is in the “result_path” variable. This variable is an array, see example: ["6;16;27;28;29;63;22;59","6;16;27;28;29;129;124;59","6;16;27;32;34;63;22;59", ";"] In this case there are 3 path. the last “;” couldn´t be avoid with the method we used so in the “for” iteration we stop at length-1 because it’s always at the end.|
|draw_in_all_canvas()|This function is called by source_increase() or source_decrease() in oncontext_menu_function.js and draw the propagation in the all graph i.e. when there are no targets. It adds (+), (-) or (?) depending on the evolution of the previous node and the previous edge. You can also assume the value of a node and the function is called another time with the value fixed for the node selected by the assume value. |
|draw_with_target()|This function is called if there is at least a target and a source node. It colors the target in green (same evolution), red (opposite evolution) or yellow (undefined).|
|propagation_starting_target(sourceId)|This propagation is the same than above but it’s adapted for the propagation when there is only one target. The propagation for this mode shows all the nodes with edges pointing on the target. this function return all the paths in “result_path”|
|target_propagation()|Use the paths of the previous function to show all the nodes included in this path.|

In `oncontext_menu_function.js`

| name | how it works |
|--------|--------|
|set_as_source()|Set the selected node as a source and make the set as source possible if the selected node is already set as a target.|
|target_storage()|Store the targets id and call the appropriate function depending on the what is in target_increase and target_decrease.|
|set_as_target()|Change the shape of the node if the node is a target and put it as a star and reset the shape of the node if it’s already a star.|
|increase()|Import the good image of the source or the target if it’s selected as increase.|
|decrease()|Same than previous function but when decrease is selected.|
|check_if_sign_in_label()|Reset the (-), (+) and (?) if it exists in the label.|
|source_increase()|Call all the functions necessary when the node is selected as an increasing source.|
|source_decrease()|Call all the functions necessary when the node is selected as an decreasing source.|
|increase_target()|Call all the functions necessary when the node is selected as an increasing target.|
|decrease_target()|Call all the functions necessary when the node is selected as an decreasing target.|
|increase_assume()|Store the assume value in the node label and call the propagation function.|
|decrease_assume()|Store the assume value in the node label and call the propagation function.|
|unset_selected()|Reset the source or the target variable and put the shape back to ellipse.|
|editNode()|This function allows you to edit a node.|
|remove()|This function gets the selected nodes ids on the network with getSelectedNodes(). If there are more than one selected node, we sort the ids of the selected nodes, from the largest to the smallest. For each id we call the remove2() function. We first delete the node with the largest id in order to avoid problems with the ids shift. If there is just one selected node, we call the remove2() function.|
|remove2()|This function allows you to delete a node.|
|editEdge()|This function allows you to edit an edge.|
|removeEdge()|This function gets the selected edges ids on the network with getSelectedEdges(). If there are more than one selected edge, we sort the ids of the selected edges, from the largest to the smallest. For each id we call the remove2Edge() function. We first delete the edge with the largest id in order to avoid problems with the ids shift. If there is just one selected edge, we call the remove2() function.|
|removeEdge2()|This function allows you to delete an edge.|

In `event_onclick.js`

| name | how it works |
|--------|--------|
|openAttributePane(params)|nction that is called when you click on a node in the analysis mode. Display of div `id = "attributepane"` (in design-dependencies.html), the right pane. Modify the id of the buttons that are at the top right to move them on the left (see in css-buttons-right.css). Display the label of the selected node, the tags and the description of the selected node. Search in edgesDataset if there are nodes that influence or are influenced by the selected node. If there is a node that influences or is influenced, creation of a new div. Add an onclick function to this div that call the functions : neighborhoodHighlight({nodes:[this.id]}), openAttributePane({nodes: [this.id]}) and focusNode(this.id).|
|closeAttributePane()|Function that closes the right panel, hides the div `id = "attributepane"`. Modify the id of the buttons on the top right to have their initial positions.|
|focusNode(nodeId)|Function that will allow to center and zoom on the selected node.Uses the focus function of the vis.js library.|
|neighbourhoodHighlight(params)|Allows you to color selected nodes and connected nodes in three shades of gray. If a node is selected (params.nodes.length> 0), we create the variable "connectedNodes"containing the nodes connected to the selected node thanks to the getConnectedNodes function of the vis.js library. We also create the variable allConnectedNodes which contains the nodes connected to the second degree. At first, we hide the label of all the nodes by placing the label in hiddenlabel. Then we color all the nodes present in allConnectedNodes with the lightest shade of gray rgba(170,170,170,0.6), and we redefined the label. Then all the nodes in connectedNodes with the color rgba(120,120,120,0.6). Finally, the selected node with the darkest shade of gray rgba(60,60,60,0.6). If no node is selected, all labels are defined and all nodes have the color rgba(60,60,60,0.6). At the end, we update the nodesDataset with allNodes.|
|save_changes()|This function allows you to save json data file. It downloads a new “data” file in the “download” folder. Check for local storage.|
|reset_dataset()|This function is called when you click on the "new graph" button at the top right. The function deletes all data in nodesDataset and edgesDataset.|
|questionMark_click()|Function that is called when you click on the question mark button (bottom right). Display of div `id = "questionMark-popUp"` (in design-dependencies.html). Closing the div when you press esc.|
|close_questionmark_popup()|Function that closes the div "questionMark-popUp" .|
|show_consequences()|Function called when we click on "Show consequences of an increase / decrease of a source parameter". Display a text to help the user with the different possibilities. It closes the div "questionMark-popUp" . Display text at the bottom of the screen "Right click on a parameter for exploring the consequences of a change in this parameter". The setInterval() method will continue calling the function until clearInterval() is called. So when the user right click on a node, the global variable show_menu will take the value 1 and the text will change. Then the user select a source and the global variable sourceId will be defined and the text is changing again.|
|show_compliance()|Function called when we click on "Show compliance of an increase/decrease of a source parameter with predefined target parameters". Display a text to help the user with the different possibilities. It closes the div "questionMark-popUp" . Display text at the bottom of the screen "Right click on a parameter you want to set as target". The setInterval() method will continue calling the function until clearInterval() is called. The text will be modified according to the values of the global variables show_menu, targetIDs and sourceId.|
|graph_navigate()|Function called when we click on "Navigate through the causal relationships between parameters". Display a text to help the user with the different possibilities. It closes the div "questionMark-popUp" . Display text at the bottom of the screen "Left click on a parameter to display the parameters it influences and those it is influenced by".|
|addNodefunction()|Function that allows the addition of a node with the double click. This is possible when the analysis mode is on and when it's not a filtered graph (tag). Same function in main_configuration.js.|

In `layout.js`

| name | how it works |
|--------|--------|
|layout_physical()|We change the style of the buttons “physical” and “hierarchical”. Then, if we are not already on the physical layout, we call the function redrawAll().|
|layout_hierarchical()|We change the style of the buttons “physical” and “hierarchical”. For the hierarchical layout, we use the dagre.js library because the hierarchical layout proposed in the vis.js library contained bugs. See the documentation: https://github.com/dagrejs/dagre/wiki. We choose the options of the directed dagre graph. Then after the line dagre.layout(g), we will be able to access the positions x and y of each node in g.node (). These values are placed in allNodes[].x and allNodes[].y. We then retrace the graph with the new positions.|

In `graph.js1

| name | how it works |
|--------|--------|
|Storage()|This function uses sessionStorage to access the data to plot the graph (tab2). The highcharts library is used to draw the scatter graph. See the documentation for the different options: https://api.highcharts.com/highcharts/plotOptions.scatter|
