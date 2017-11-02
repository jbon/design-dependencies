function draw_the_path(){

	if (sourceId==undefined) {

		alert("No source node selected");

	}else {

		if(targetIDs.length == 0  && confirm("do you want to draw the path without target node ?") == true){
			draw_in_all_canvas();
		}
		else if(targetIDs.length>=1){
			draw_with_target();
		}

	}

}


  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx reset parameters i.e. shape and color of the nodes FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


  function reset_parameters()
  { 
  	var updateArray=[];
  	for(var nodeId in allNodes)
  	{
  		allNodes[nodeId].shape="ellipse";
  		allNodes[nodeId].color='rgba(60,60,60,0.6)';

  		if(allNodes[nodeId].font != "#ffffff"){
  			allNodes[nodeId].font={
  				color:"#ffffff"
  			};
  		}

  		if (allNodes[nodeId].hiddenLabel !== undefined) {
  			// console.log(nodeId);
  			allNodes[nodeId].label=allNodes[nodeId].hiddenLabel;
  			allNodes[nodeId].hiddenLabel = undefined;
  		}else if(draw_in_all_canvas_active==1 && nodeId != sourceId){
  			allNodes[nodeId].label=allNodes[nodeId].label.substring(0,allNodes[nodeId].label.length-4);
  		}

  	}
  	for (var edgeId in allEdges){
  		allEdges[edgeId].color='rgba(60,60,60,0.6)';
  	}

  	sourceId=undefined;
  	targetIDs=[] ;
  	result_path=[""];
  	source_movement=0;
  	target_decrease=[];
  	target_increase=[];
  	active=0;
  	draw_in_all_canvas_active=0;

  	if(tagFilterActive == true){
  		console.log(temp_nodesDataset);
		nodesDataset = temp_nodesDataset;
  		console.log(nodesDataset);

		edgesDataset = temp_edgesDataset;
		redrawAll();
		tagFilterActive=false;
  	}

  	var updateArray = [];
  	for (var edgeId in allEdges) {
  		updateArray.push(allEdges[edgeId]);
  	}
  	edgesDataset.update(updateArray);

  	var updateArray = [];
  	for (nodeId in allNodes) {
  		if (allNodes.hasOwnProperty(nodeId)) {
  			updateArray.push(allNodes[nodeId]);
  		}
  	}
  	nodesDataset.update(updateArray);

  }


  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Algorithm that allows us to find the path beetween 2 nodes FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  function save_changes(){
// function save(text, filename){
	var a = document.createElement('a');
	var nodes_arr = [];
	var edges_arr = [];
	for (var i in allNodes)
		nodes_arr.push(allNodes[i]);
	for (var i in allEdges)
		edges_arr.push(allEdges[i]);
	a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify({nodes:nodes_arr, edges:edges_arr})));
	a.setAttribute('download', "data.json");
	document.body.appendChild(a);
	a.click();
	document.body.appendChild(a);

// }
}
// var obj = {a: "Hello", b: "World");




// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Autocomplete JQUERY  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


function updateLeftPane() {


	console.log(nodesDataset);

	var availableTags = nodesDataset.map(function(obj) { 
		return obj.label; 
	});

	$( "#tags" ).autocomplete({  
		source: availableTags,
		minLength:3,

		select: function (event, ui) {
			var label = ui.item.label;
			var value = ui.item.value;
			var nodesLabels = nodesDataset.map(function(obj) { 
				return [obj.id, obj.label != undefined ? obj.label : obj.hiddenLabel]; 
			});
			var id = nodesLabels.filter(o => o[1] == label)[0][0];
      // console.log(id);

      neighbourhoodHighlight({nodes:[id]});
      openAttributePane({nodes:[id]});
      focusNode(id);
  }
});
}


$(function () {
	updateLeftPane();
});



// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TAGGGG xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

var tabTag=[];

function saveTag(){

	for (var nodeId in allNodes)
	{
		for (var i=0; i<(allNodes[nodeId].tags).length;i++)
		{
			var tag = allNodes[nodeId].tags[i];
			if(tabTag.includes(tag)==true)
			{
				console.log("je passe");
			}else{
				tabTag.push(tag);
			}
		} 
	}
	console.log(tabTag);
}

var check_ifPresent_list=[];


function createButtons(){

	for(var i=0; i<tabTag.length;i++)
	{ 
		if(check_ifPresent_list.includes(tabTag[i])==false){
			var tagList = document.getElementById("tagSelectBox");
			var option = document.createElement("option");
			option.text = tabTag[i];
			tagList.add(option);
			check_ifPresent_list.push(tabTag[i]);
		}

		$(document).ready(function() {
			$('#tagSelectBox').select2({
				placeholder: "Select a Tag",
				allowClear: true
			});
		});
	}
}

function filterByTag(){
	var selectedTag=($('#tagSelectBox').val());
	var nodeArray=[];
	var edgeArray=[];
	var nodeId_Array=[];

	tagFilterActive=true;

	for(var currentTag in selectedTag){
		for(var nodeId in allNodes){
			if(allNodes[nodeId].tags.includes(selectedTag[currentTag]) == true && nodeArray.includes(allNodes[nodeId])==false){
				nodeArray.push(allNodes[nodeId]);
				nodeId_Array.push(parseInt(nodeId));
			}
		}
	}
	console.log(nodeId_Array);

	var influenced_nodes=[];
	for(var edgeId in allEdges){
		if(nodeId_Array.includes(allEdges[edgeId].from) == true){
			edgeArray.push(allEdges[edgeId]);
			if(nodeId_Array.includes(allEdges[edgeId].to) == false && influenced_nodes.includes(allEdges[edgeId].to) == false ){

				var id_to_push=String(allEdges[edgeId].to);

				influenced_nodes.push(parseInt(id_to_push));

				nodeArray.push(allNodes[id_to_push]);
			}
		}
	}

	temp_nodesDataset=nodesDataset;
 	temp_edgesDataset=edgesDataset;

	nodesDataset = new vis.DataSet(nodeArray);
	edgesDataset = new vis.DataSet(edgeArray);

	redrawAll();

	console.log(temp_edgesDataset);
	console.log(temp_nodesDataset);


}

var temp_nodesDataset=[];
var temp_edgesDataset=[];
var tagFilterActive=false;
